import Message from "../models/messageModel.js";
import User from '../Models/UserModel.js';
import Chat from "../models/chatModels.js";
import { populate } from "dotenv";

export const sendMessage = async(req,res) => {
    const {content,chatId} = req.body;

    if(!content || !chatId){
        return res.status(400).json({message:"Invalid Data passed into the request"})
    }

    var newMessage = {
        sender:req.user._id,
        content:content,
        chat: chatId,
    }
    try{
        var message = await Message.create(newMessage);
        message = await message.populate("sender","name pic");
        message = await message.populate("chat");
        message = await User.populate(message,
            {
                path:"chat.users",
                select:"name pic email"
            }
            );
        
        await Chat.findByIdAndUpdate(req.body.chatId,{latestMessage:message});
        
        res.status(201).json(message);

    }catch(error){
        res.status(400).json({message:error.message})
    }
}

export const allMessages = async(req,res) => {
    try {
        const messages = await Message.find({chat:req.params.chatId}).populate(
            "sender","name pic email"
            )
        .populate("chat");
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json({message:error.message})
    }   
}


// export const sendMessage = async (req, res) => {
//   const { content, chatId } = req.body;

//   if (!content || !chatId) {
//         return res.status(400).json({message:"Invalid Data passed into the request"})
//     }

//   var newMessage = {
//     sender: req.user._id,
//     content: content,
//     chat: chatId,
//   };

//   try {
//     var message = await Message.create(newMessage);

//     message = await message.populate("sender", "name pic")
//     message = await message.populate("chat")
//     message = await User.populate(message, {
//       path: "chat.users",
//       select: "name pic email",
//     });

//     await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

//     res.status(200).json(message);
//   } catch (error) {
//     res.status(400).json({message:error.message});
//   }
// };
