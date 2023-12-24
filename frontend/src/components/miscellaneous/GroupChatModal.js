import {
    Button,
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useToast,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({ children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const { user, userToken , chats, setChats } = ChatState();
    

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
            setSearchResult(data);
        } catch (error) {
            console.log(error.message);
            toast({
                title: "Something went wrong",
                description: 'failed to load the search result',
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
        }
    }

    const handleSubmit = async() => {
        if(!groupChatName || !selectedUsers){
            toast({
                title:'Please fill all the fields',
                status:'warning',
                duration:5000,
                isClosable:true,
                position:'top'

            })
            return;
        }
        try{
            // console.log(userToken)
            // console.log(groupChatName);
            console.log(JSON.stringify(selectedUsers.map((u) => u._id)))
            
            const config = {
                headers:{
                    Authorization: `Bearer ${userToken}`,
                },
            };
            const {data} = await axios.post('/api/chat/group',{
                name:groupChatName,
                users:JSON.stringify(selectedUsers.map((u) => u._id))
            },config)

            setChats([data,...chats]);
            onClose();
            toast({
                title:'Group chat created',
                status:'success',
                duration:5000,
                isClosable:true,
                position:'bottom'
            })
        }catch(error){
            console.log(error.message);
            toast({
                title:'Something went wrong',
                description:error.message,
                status:'error',
                duration:5000,
                isClosable:true,
                position:'bottom'
            })
        }
    }
    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter(sel => sel._id !== delUser._id))
    }

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast.error(
                {
                    title: "User already added",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                }
            )
            return;
        }
        setSelectedUsers([...selectedUsers, userToAdd])
    }

    return (
        <>
            <span onClick={onOpen} > {children} </span>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> Creare a group chat </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input
                                placeholder='Chat Name'
                                mb={3}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            >
                            </Input>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder='Add Users eg:Aarav,Aditya'
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            >
                            </Input>
                        </FormControl>

                        {/* selected users */}
                        <Box w="100%" display="flex" flexWrap="wrap">
                            {selectedUsers.map(user => (                    //(u)
                                <UserBadgeItem key={user._id}   
                                    user={user}                             // (u)
                                    handleFunction={() => handleDelete(user)}     // handleDelete(u)
                                />
                            ))}
                        </Box>
                        {/* render Searched Users  */}
                        {loading ? (<p> Loading... </p>) : (
                            searchResult?.slice(0, 4).map((user) => (       
                                <UserListItem
                                    key={user._id}
                                    user={user}                             
                                    handleFunction={() => handleGroup(user)} 
                                ></UserListItem>
                            ))
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal
