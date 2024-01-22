import { ViewIcon } from '@chakra-ui/icons';
import {

    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    useToast,
    Box,
    FormControl,
    Input,
    Spinner,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain , fetchMessages}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const toast = useToast();
    // const { user , selectedChat, setSelectedChat , chats,setChats } = ChatState();
    const { user, userToken,  selectedChat, setSelectedChat } = ChatState();
    // console.log(user);

    const handleAddUser = async(user1) => {
        console.log(user);
        if(selectedChat.users.find((u) => u._id === user1._id)){
            toast({
                title: "User already in the group",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            return;
        }
        // console.log(selectedChat.groupAdmin._id , user.result._id)
        if(selectedChat.groupAdmin._id !== user._id){
            toast({
                title: "Only Admins can add someone",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const {data} = await axios.put(`/api/chat/groupadd`,{
                chatId: selectedChat._id,
                userId: user1._id,
            },config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false)
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: error?.response?.data?.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
        }
    }
    
    const handleRemove = async(user1) => {
        
        if(selectedChat.groupAdmin._id !== user?._id  && user1._id !== user?._id){
            toast({
                title: "Only Admins can remove someone",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            return;
        }

        try{
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const {data} = await axios.put(`/api/chat/groupremove`,{
                chatId: selectedChat._id,
                userId: user1._id,
            },config);

            user1._id === user?._id ? setSelectedChat() : setSelectedChat(data) ;
            setFetchAgain(!fetchAgain);
            setLoading(false)

        }catch(error){
            toast({
                title: "User not Removed Something went wrong",
                description: error?.response?.data?.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
        }
    }
    const handleRename = async () => {
        if(!groupChatName){
            return;
        }
        try {
            setRenameLoading(true);

            const config = {
                headers:{
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const {data} = await axios.put(`/api/chat/rename`,
            {
                chatId: selectedChat._id,
                chatName: groupChatName,
            },config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            setRenameLoading(false);
        }
        setGroupChatName("");
    }

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            }
            const { data } = await axios.get(`/api/user?search=${query}`, config);
            console.log(data);
            setLoading(false);
            setSearchResults(data);
        } catch (error) {
            console.log(error?.message);
            toast({
                title: "Something went wrong",
                description: 'failed to load the search result',
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
            setLoading(false);
        }
    }

    

    return (
        <>
            <IconButton onClick={onOpen} display={{ base: 'flex' }} icon={<ViewIcon />} >  Open Modal  </IconButton>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                     fontSize='35px'
                     fontFamily='Work sans'
                     display='flex'
                     justifyContent='center'
                    >  {selectedChat.chatName}  </ModalHeader>
                    <ModalCloseButton />
                    
                    <ModalBody  display="flex" flexDir="column" alignItems="center">

                        <Box
                            w='100%'
                            display="flex"
                            flexWrap="wrap"  
                            pb={3}
                        >
                            {selectedChat?.users?.map((user) => (
                                <UserBadgeItem key={user?._id}
                                    user={user}                             // (u)
                                    handleFunction={() => handleRemove(user)}     // handleDelete(u)
                                />
                            ))}
                        </Box>
                            <FormControl display='flex'>
                                <Input
                                    placeholder='Chat Name'
                                    mb={3}
                                    value={groupChatName}
                                    onChange={(e) => setGroupChatName(e.target.value)}
                                />
                                <Button 
                                    variant='solid'
                                    colorScheme='blue'
                                    ml={1}
                                    isLoading={renameLoading}
                                    onClick={handleRename}
                                >
                                    Update
                                </Button>
                            </FormControl>
                            <FormControl>
                                <Input
                                    placeholder='Add Users to group'
                                    mb={1}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />

                            </FormControl>
                                
                        { loading ?( <Spinner size={'lg'} />) : (
                            searchResults?.map((user) => (
                                <UserListItem 
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleAddUser(user)}
                                />
                            ))
                        )}
                    
                    
                    </ModalBody>




                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={() => handleRemove(user)}>
                            Leave Group
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>

        </>
    )
}

export default UpdateGroupChatModal
