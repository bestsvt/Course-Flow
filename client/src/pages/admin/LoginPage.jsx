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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAuth } from "../../contexts/authentication";


const LoginPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const { handleSubmit, trigger, formState: { errors, isSubmitting } } = useForm();
  const { loginAdmin } = useAuth();


  async function onSubmit(values) {
    const result = await loginAdmin(values);
    console.log(result.data.message);

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
        <FormControl isRequired mb={10}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            variant="normal"
            type="text"
            id="username"
            placeholder="Enter Username"
            onBlur={() => {
              trigger("username");
            }}
          />
          {/* <FormErrorMessage>
                {errors.username && errors.username.message}
                {errorUsernameMessage}
              </FormErrorMessage> */}
        </FormControl>

        {/* ——————————————————— Password Input ——————————————————— */}
        <FormControl isRequired mb={10}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              variant="normal"
              id="password"
              placeholder="Enter Password"

              onBlur={() => {
                trigger("password");
              }}
              type={show ? "text" : "password"}
            />
            <InputRightElement width="4.5rem" margin="4px 4px 0 0">
              <Button size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {/* <FormErrorMessage>
                {errors.password && errors.password.message}
                {errorPasswordMessage}
              </FormErrorMessage> */}
        </FormControl>
        <Button variant="primary" isLoading={isSubmitting} type="submit" width="full" /*onClick={()=>navigate('/admin/courselist')}*/ >
          Log in
        </Button>


      </form>
    </div>
  )
}

export default LoginPage