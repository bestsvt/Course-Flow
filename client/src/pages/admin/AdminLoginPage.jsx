import React, { useState } from 'react'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Select,
  useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAuth } from "../../contexts/authentication";
import jwtDecode from 'jwt-decode';


const AdminLoginPage = () => {
  const [show, setShow] = useState(false);
  const [errorUsernameMessage, setErrorUsernameMessage] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm();
  const { loginAdmin , setAdminAuthState , adminAuthState} = useAuth();
  const toast = useToast()

  async function onSubmit(values) {
    console.log(values);
    setErrorUsernameMessage('')
    setErrorPasswordMessage('')
    const result = await loginAdmin(values);
    let message = result.data.message
    if (/\bsuccessfully\b/i.test(message)) {
      const tokenAdmin = result.data.tokenAdmin;
      localStorage.setItem("tokenAdmin", tokenAdmin);
      const adminDataFromToken = jwtDecode(tokenAdmin);
      setAdminAuthState({ ...adminAuthState, user: adminDataFromToken })
      toast({
        title: message,
        isClosable: true,
        position: 'top',
        status: 'success',
        colorScheme: "blue",
        duration: 5000
      })
      navigate("/admin");
    } else if (/\bUsername\b/i.test(message)) {
      setErrorUsernameMessage(message)
      toast({
        title: message,
        isClosable: true,
        position: 'top',
        status: 'error',
        duration: 5000
      })
    } else if (/\bPassword\b/i.test(message)) {
      setErrorPasswordMessage(message)
      toast({
        title: message,
        isClosable: true,
        position: 'top',
        status: 'error',
        duration: 5000
      })
    } 
  }

  return (
    <div className='flex flex-col bg-gradient-to-l from-linear2-1 to-linear2-2 h-screen justify-center items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col bg-white w-[566px] h-[568px] justify-center items-center px-16 pt-16 pb-20 rounded-lg'>
        <img
          src="/image/logo/CourseFlow.png"
          alt="logo"
          className="w-[315px] h-[36px] mb-6"
        />
        <h1 className="mb-11 text-[#646D89] text-[24px] font-bold font-nunito">Admin Panel Control</h1>

        {/* ——————————————————— Username Input ——————————————————— */}
        <FormControl isRequired mb={10} isInvalid={errors.username || errorUsernameMessage}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            variant="normal"
            type="text"
            id="username"
            placeholder="Enter Username"
            {...register("username")}
            onBlur={() => {
              trigger("username");
            }}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
            {errorUsernameMessage}
          </FormErrorMessage>
        </FormControl>

        {/* ——————————————————— Password Input ——————————————————— */}
        <FormControl isRequired mb={10} isInvalid={errors.password || errorPasswordMessage}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              variant="normal"
              id="password"
              placeholder="Enter Password"
              {...register("password")}
              onBlur={() => {
                trigger("password");
              }}
              type={show ? "text" : "password"}
            />
            <InputRightElement width="4.5rem" margin="4px 4px 0 0">
              <Button size="sm" onClick={()=>{setShow(!show)}}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
          {errors.password && errors.password.message}
            {errorPasswordMessage}
          </FormErrorMessage>
        </FormControl>
        <Button variant="primary" isLoading={isSubmitting} type="submit" width="full">
          Log in
        </Button>


      </form>
    </div>
  )
}

export default AdminLoginPage