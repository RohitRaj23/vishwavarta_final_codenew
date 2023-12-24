import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack ,Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'



const SignUp = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [pic, setPic] = useState('')
    const [loading,setLoading] = useState(false)
    const toast = useToast();

    const postDetails = (pic) => {
        setLoading(true)    
        if(pic === undefined){
            console.log("Undefined")
            toast({
                title: "Please Select an Image",
                status:'warning',
                durataion: 5000,
                isClosable: true,
                position:"top"
            })  
            return;
        }
        console.log(pic.type);
        if(pic.type === 'image/jpeg' || pic.type === 'image/png' || pic.type === 'image/gif'){
            console.log('If Block');

            const data = new FormData();
            data.append('file',pic);
            data.append('upload_preset','chatty');          // upload preset 
            data.append('cloud_name','dezifvepx');          // cloud name
            fetch('https://api.cloudinary.com/v1_1/dezifvepx/image/upload',{        // Cross Check the URL /image/upload reh gya shayad
                method:'post',
                body:data

            }).then((res) => res.json()).then((data) => {
                setPic(data.url.toString());
                console.log(data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            })
        }else{
            console.log('Else Block');
            toast({
                title: "Please Select an Image",
                status:'warning',
                durataion: 5000,
                isClosable: true,
                position:"top"
            })
            setLoading(false);
            return;
        }
    }

    const submitHandler = async() => {
        setLoading(true);
        if(!name || !email || !password || !confirmPassword){
            toast({
                title: "Please Fill All the Fields",
                status:'warning',
                durataion: 5000,
                isClosable: true,
                position:"top"
            })
            setLoading(false);
            return;
        }

        if(password !== confirmPassword){
            toast({
                title: "Password and Confirm Password do not Match",
                status:'warning',
                durataion: 5000,
                isClosable: true,
                position:"top"
            });
            return;
        }

        try{
            const config = {
                headers:{
                    "Content-Type":"application/json"   
                },
            }
            const {data} = await axios.post('/api/user/register',{name,email,password,pic},config);
            toast({
                title: "Registered Successfully",
                status:'success',
                durataion: 5000,
                isClosable: true,
                position:"top"
            });

            localStorage.setItem('userInfo',JSON.stringify(data));
            setLoading(false);

            navigate('/chats');

        }catch(err){
            toast({
                title: "Something Went Wrong",
                description: err.response.data.message,
                status:'error',
                durataion: 5000,
                isClosable: true,
                position:"top"
            });
        }

    }

    const handleClick = () => {
        setShow(!show)
    }


    return (
        <VStack spacing={'5px'}>

                {/* -------------------------- Name ---------------------------- */}
            <FormControl id='first-name' isRequired>
                <FormLabel >Name</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    onChange={(e) => setName(e.target.value)}
                >
                </Input>
            </FormControl>

            {/* - ---------------------------- Email ---------------------------- */}

            <FormControl id='email' isRequired>
                <FormLabel >Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Input>
            </FormControl>

            {/* ----------------------- Password -------------------------*/}

            <FormControl id='password' isRequired>
                <FormLabel >Password</FormLabel>
                <InputGroup >
                    <Input
                        type={show ? "password" : "text"}
                        placeholder='Enter Your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Input>
                    <InputRightElement >
                        <Button h='1.75em' size='sm' onClick={handleClick}>
                            {show ? "🙈" : "🙉"}    
                            {/* {show ? "Hide" : "Show"} */}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
                                    {/* --------------- Confirm Password ---------------- */}

            <FormControl id='confirm-password' isRequired>
                <FormLabel > Confirm Password</FormLabel>
                <InputGroup >
                    <Input
                        type={show ? "password" : "text"}
                        placeholder='Enter Your Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Input>
                    <InputRightElement >
                        <Button h='1.75em' size='sm' onClick={handleClick}>
                            {show ? "🙈" : "🙉"}    
                            {/* {show ? "Hide" : "Show"} */}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

                {/* ----------------------- Image ---------------------------- */}

                <FormControl>
                    <FormLabel>Profile Picture</FormLabel>
                    <Input type='file' p={1.5} accept='image/*' onChange={(e) => postDetails(e.target.files[0])} />   
                </FormControl>

            <Button
                width={'100%'}
                color='white'
                style={{ marginTop:15 }}
                onClick={submitHandler}
                isLoading={loading}
            >Submit</Button>
        </VStack>
    )
}

export default SignUp
