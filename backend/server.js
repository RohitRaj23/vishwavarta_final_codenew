import express from 'express'
import cors from 'cors'     // for non blocking requests 
import dotenv from 'dotenv'
import { chats } from './data/data.js'
import ConnectDB from './config/db.js'
import userRoutes from './Routes/UserRoutes.js'
import chatRoutes from './Routes/chatRoutes.js'
import messageRoutes from './Routes/messageRoutes.js'
import { Server } from 'socket.io';

import {notFound , errorHandler} from './Middleware/errorMiddleware.js'
// const path = require('path');
import path from 'path'

const app = express();

app.use(cors());
// const __dirname1 = path.resolve();
// const x = path.join(__dirname1, "../frontend/build")
// console.log(x)

// for parsing the data or To accept Json data in server
app.use(express.json())

dotenv.config('env');
ConnectDB();



app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/messages',messageRoutes)

// ----------------------------deployment--------------------------------------

//     // console.log(__dirname1)
const __dirname1 = path.resolve();


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, "../frontend/build")));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
    });
} else {
    app.get('/',(req,res) => {
    res.send("on 5000 port ")
})
}

// ----------------------------deployment--------------------------------------




                // -------- ------ Error Handling ----------------------------
app.use(notFound)
app.use(errorHandler)

// app.get('/api/chat',(req,res)=>{
//     res.send(chats)
// })

// app.get('/api/chat/:id',(req,res) => {
//     // console.log(req.params.id)
//     const singleChat = chats.find((c)=> c._id === req.params.id);
//     res.send(singleChat);

// })

const PORT = process.env.PORT ||  5000
const server = app.listen(PORT , console.log(`App started on Port : ${PORT}`))
const io = new Server(server, {
    pingTimeOut: 60000,   // 60 sec
    cors:{
        origin:'http://localhost:3000'
    }
})

io.on('connection', (socket) => {
    console.log('connected to socket.io')

    socket.on('setup',(userData) => {
        socket.join(userData?._id)
        // console.log('user joined : ',userData._id)
        socket.emit('connected');
    })

    socket.on('join chat',(room) => {
        socket.join(room);
        console.log('joined room : ',room)
    })

    socket.on('typing',(room) => {
        socket.in(room).emit('typing')
    })

    socket.on('stop typing',(room) => {
        socket.in(room).emit('stop typing')
    })

    socket.on('new message', (newMessageRecieved)=> {
        var chat = newMessageRecieved.chat;

        if(!chat.users)
            return console.log('chat.users not defined');
        
        chat.users.forEach(user => {
            if(user?._id == newMessageRecieved.sender?._id)
                return;
            socket.in(user?._id).emit('message recieved',newMessageRecieved)
        })

    })

    socket.off('setup',() => {
        console.log('disconnected from socket.io')
        socket.leave(userData?._id)
    })  
})