import React, { useState } from 'react'
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack ,Button, Toast, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setloading] = useState(false)
  const navigate = useNavigate();

  const toast = useToast();

  // function for submission of image


  const submitHandler = async() => {
    setloading(true);
    if(!email || !password){
        toast({
            title: "Please Fill All the Fields",
            status:'warning',
            durataion: 5000,
            isClosable: true,
            position:"top"
        });
        setloading(false);
        return;
    }

    try{
        const config = {
            headers:{
                "Content-Type":"application/json"
            },
        };
        const {data} = await axios.post("/api/user/login", {email, password}, config);

        toast({
            title: "Login Successful",
            status:'success',
            duration:5000,
            isClosable:true,
            position:'top'
        })

        localStorage.setItem("userInfo", JSON.stringify(data));
        setloading(false);
        navigate('/chats');
    }catch(err){
        toast({
            title: "Invalid Credentials",
            status:'error',
            duration:5000,
            isClosable:true,
            position:'top'
        });
        setloading(false);
    }


  }

  const handleClick = () => {
      setShow(!show)
  }


  return (
      <VStack spacing={'5px'}>

          {/* - ---------------------------- Email ---------------------------- */}

          <FormControl id='email' isRequired>
              <FormLabel >Email</FormLabel>
              <Input
                  placeholder='Enter Your Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              >
              </Input>
          </FormControl>

          {/* ----------------------- Password -------------------------*/}

          <FormControl id='password' isRequired>
              <FormLabel >Password</FormLabel>
              <InputGroup >
                  <Input

                      type={show ? "text" : "password"}
                      placeholder='Enter Your Password'
                      value={password}
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
                               
          <Button
              colorScheme='blue'
              width={'100%'}
              style={{ marginTop:15 }}
              onClick={submitHandler}
              isLoading={loading}
          >Login</Button>

        <Button
              variant='solid'
              colorScheme='red'
              width={'100%'}
              style={{ marginTop:15 }}
              onClick={ () => {
                setEmail('test@example.com');
                setPassword('12345678');
                }
              }
              isLoading={loading}
          >Test Application</Button>
        


      </VStack>
  )
}

export default Login
