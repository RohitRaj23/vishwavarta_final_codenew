import React from 'react'
import { Box , Text } from '@chakra-ui/react'
import { ChatState } from '../Context/ChatProvider.js';
import SingleChats from './SingleChats.js';


const ChatBox = ({fetchAgain,setFetchAgain}) => {

  // const { user , selectedChat, setSelectedChat , chats,setChats } = ChatState();
  const { selectedChat } = ChatState();

  
  return (
    <Box
      display={{base: selectedChat ?  "flex" : "none" , md:"flex"}}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{base:"100%",md:"68%"}}
      borderRadius="md"
      borderWidth="1px"
      >
      <SingleChats

        fetchAgain = {fetchAgain}
        setFetchAgain = {setFetchAgain}
      />
    </Box>
  )
}

export default ChatBox
