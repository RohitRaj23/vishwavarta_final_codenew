import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [userToken,setUserToken] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats,setChats] = useState([]);
    const [notification,setNotification] = useState([]);
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const existingUser = userInfo?.existingUser;
        setUser(existingUser);
        
        const tokenU = userInfo?.token;
        setUserToken(tokenU);


        // console.log(existingUser._id);

        if(!userInfo){
            navigate("/");
        }
    },[navigate])

    return (
        <ChatContext.Provider value={{ user, setUser ,userToken ,selectedChat, setSelectedChat,chats,setChats,notification,setNotification }} >
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;