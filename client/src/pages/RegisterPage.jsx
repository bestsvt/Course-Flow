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

function RegisterPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm();
  const [errorEmailMessage, setErrorEmailMessage] = useState('');
  const { registration } = useAuth();
  const navigate = useNavigate();
  const toast = useToast()

  async function onSubmit(values) {
    try {
      const result = await registration(values);
      if (result.data.message.includes('success')) {
        toast({
          title: result.data.message,
          isClosable: true,
          position: 'top',
          status: 'success',
          colorScheme: "blue",
          duration: 5000
        })
        navigate("/login");
      } else {
        setErrorEmailMessage(result.data.message)
        toast({
          title: result.data.message,
          isClosable: true,
          position: 'top',
          status: 'error',
          duration: 5000
        })
      }
    } catch (error) {
      console.log("Submit Error ", error);
    }
  }

  //  toggle show password
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  function validateName(value) {
    let error;
    if (!value) {
      error = 'Name is required';
    } else if (!/^[a-zA-Z\s'\-]+$/.test(value)) {
      error = "Invalid characters in name";
    }
    return error;
  }

  function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(value)) {
      error = 'Invalid email format. Please enter an email address in the format: example@example.com';
    }
    return error;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = 'Password is required';
    } else if (value.length < 2) {
      error = 'Password must be at least 12 characters long';
    } 
    // กรณีที่ต้องการให้มีตัวพิมพ์ใหญ่กับตัวเลข อย่างน้อย 1 ตัว
    // else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
    //   error = 'Password must include at least one uppercase letter, one lowercase letter, and one number';
    // }
    return error;
  }

    return (
      <>
      <Navbar/>
      <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-[38%] py-[10%] flex flex-col gap-10 bg-[#FCFCFE] bg-imag-register"
    >
      <h1 className="text-headline2 text-[#22269E] font-headline2">
        Register to start learning!
      </h1>

      {/* ——————————————————— Name Input ——————————————————— */}
      <FormControl isInvalid={errors.full_name} isRequired>
        <FormLabel htmlFor="full_name">Name</FormLabel>
        <Input
          variant="normal"
          id="full_name"
          placeholder="Enter Name and Lastname"
          {...register('full_name', { validate: validateName })}
          onBlur={() => {
            trigger('full_name');
          }}
        />
        <FormErrorMessage>
          {errors.full_name && errors.full_name.message}
        </FormErrorMessage>
      </FormControl>

      {/* ——————————————————— Date Input ——————————————————— */}
      <FormControl isInvalid={errors.birth_date} isRequired>
        <FormLabel htmlFor="birth_date">Date of Birth</FormLabel>
        <Input
          variant="normal"
          type="date"
          id="birth_date"
          placeholder="MM/DD/YY"
          {...register("birth_date", {
            required: "Date of Birth is required",
          })}
          onBlur={() => {
            trigger('birth_date');
          }}
          max={new Date().toISOString().slice(0, 10)}
        />
        <FormErrorMessage>
          {errors.birth_date && errors.birth_date.message}
        </FormErrorMessage>
      </FormControl>

      {/* ——————————————————— Education Input ——————————————————— */}
      <FormControl isInvalid={errors.education} isRequired>
        <FormLabel htmlFor="education">Educational Background</FormLabel>
        <Input
          variant="normal"
          id="education"
          placeholder="Enter Educational Background"
          {...register("education", {
            required: "Educational Background is required",
          })}
          onBlur={() => {
            trigger('education');
          }}
        />
        <FormErrorMessage>
          {errors.education && errors.education.message}
        </FormErrorMessage>
      </FormControl>

      {/* ——————————————————— Email Input ——————————————————— */}      
      <FormControl isInvalid={errors.email || errorEmailMessage} isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          variant="normal"
          type="email"
          id="email"
          placeholder="Enter Email"
          {...register('email', { validate: validateEmail })}
          onBlur={() => {
            trigger('email');
          }}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
          {errorEmailMessage}
        </FormErrorMessage>
      </FormControl>

      {/* ——————————————————— Password Input ——————————————————— */}   
      <FormControl isInvalid={errors.password} isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            variant="normal"
            id="password"
            placeholder="Enter Password"
            {...register('password', { validate: validatePassword })}
          onBlur={() => {
            trigger('password');
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
        </FormErrorMessage>
      </FormControl>

      <Button variant="primary" isLoading={isSubmitting} type="submit">
        Register
      </Button>
      <span className="text-body2 font-body2">
        Already have an account?
        <Link onClick={() => {navigate("/login")}}> Log in</Link>
      </span>
    </form>
      </>
    );
}

export default RegisterPage;