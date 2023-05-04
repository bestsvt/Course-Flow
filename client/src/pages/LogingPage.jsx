import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    Link,
    useToast
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useForm } from "react-hook-form";
  import { useAuth } from "../contexts/authentication";
  import Navbar from "../components/Navbar";
  import { useNavigate } from "react-router-dom";
  import jwtDecode from "jwt-decode";

  function RegisterPage() {
    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
      trigger,
    } = useForm();
    const [errorEmailMessage, setErrorEmailMessage] = useState('');
    const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
    const { login,userAuthState, setUserAuthState } = useAuth();
    const navigate = useNavigate();
    const toast = useToast()

    async function onSubmit(values) {
      setErrorEmailMessage('')
      setErrorPasswordMessage('')
      const result = await login(values);
      const message = result.data.message;
      if (/\bstart\b/i.test(message)) {
        const token = result.data.token;
        localStorage.setItem("token", token);
        const userDataFromToken = jwtDecode(token);
        setUserAuthState({ ...userAuthState, user: userDataFromToken });
        toast({
          title: message,
          isClosable: true,
          position: 'top',
          status: 'success',
          colorScheme: "blue",
          duration: 5000
        })
        navigate(-1)
      } else if (/\bemail\b/i.test(message)) {
        setErrorEmailMessage(message)
        toast({
          title: message,
          isClosable: true,
          position: 'top',
          status: 'error',
          duration: 5000
        })
      } else if (/\bpassword\b/i.test(message)) {
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
  
    //  toggle show password
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
  
    function validateEmail(value) {
      let error;
      if (!value) {
        error = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        error =
          "Invalid email format. Please enter an email address in the format: example@example.com";
      }
      return error;
    }
  
    function validatePassword(value) {
      let error;
      if (!value) {
        error = "Password is required";
      } else if (value.length < 12) {
        error = "Password must be at least 12 characters long";
      }
      // กรณีที่ต้องการให้มีตัวพิมพ์ใหญ่กับตัวเลข อย่างน้อย 1 ตัว
      // else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
      //   error = 'Password must include at least one uppercase letter, one lowercase letter, and one number';
      // }
      return error;
    }
  
    return (
      <>
        <Navbar />
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-[38%] py-[10%] flex flex-col gap-10 bg-[#FCFCFE] bg-imag-register"
          >
            <h1 className="text-headline2 text-[#22269E] font-headline2">
              Welcome Back!
            </h1>
  
            {/* ——————————————————— Email Input ——————————————————— */}
            <FormControl isInvalid={errors.email || errorEmailMessage} isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                variant="normal"
                type="email"
                id="email"
                placeholder="Enter Email"
                {...register("email", { validate: validateEmail })}
                onBlur={() => {
                  trigger("email");
                }}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
                {errorEmailMessage}
              </FormErrorMessage>
            </FormControl>
  
            {/* ——————————————————— Password Input ——————————————————— */}
            <FormControl isInvalid={errors.password || errorPasswordMessage} isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  variant="normal"
                  id="password"
                  placeholder="Enter Password"
                  {...register("password", { validate: validatePassword })}
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
              <FormErrorMessage>
                {errors.password && errors.password.message}
                {errorPasswordMessage}
              </FormErrorMessage>
            </FormControl>
  
            <Button variant="primary" isLoading={isSubmitting} type="submit">
              Log in
            </Button>
            <span className="text-body2 font-body2">
              Don’t have an account?
              <Link onClick={() => {navigate("/register")}}> Register</Link>
            </span>
          </form>
        </div>
      </>
    );
  }
  
export default RegisterPage;