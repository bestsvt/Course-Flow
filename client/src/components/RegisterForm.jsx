import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/authentication";

export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm();

  const { registration } = useAuth();

  function onSubmit(values) {
    registration(values)
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
    } else if (value.length < 12) {
      error = 'Password must be at least 12 characters long';
    } 
    // กรณีที่ต้องการให้มีตัวพิมพ์ใหญ่กับตัวเลข อย่างน้อย 1 ตัว
    // else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
    //   error = 'Password must include at least one uppercase letter, one lowercase letter, and one number';
    // }
    return error;
  }
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-[38%] py-[10%] flex flex-col gap-10"
    >
      <h1 className="text-headline2 text-[#22269E] font-headline2">
        Register to start learning!
      </h1>

      {/* ——————————————————— Name Input ——————————————————— */}
      <FormControl isInvalid={errors.name} isRequired>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          variant="normal"
          id="name"
          placeholder="Enter Name and Lastname"
          {...register('name', { validate: validateName })}
          onBlur={() => {
            trigger('name');
          }}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      {/* ——————————————————— Date Input ——————————————————— */}
      <FormControl isInvalid={errors.date} isRequired>
        <FormLabel htmlFor="date">Date of Birth</FormLabel>
        <Input
          variant="normal"
          type="date"
          id="date"
          placeholder="MM/DD/YY"
          {...register("date", {
            required: "Date of Birth is required",
          })}
          onBlur={() => {
            trigger('date');
          }}
          max={new Date().toISOString().slice(0, 10)}
        />
        <FormErrorMessage>
          {errors.date && errors.date.message}
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
      <FormControl isInvalid={errors.email} isRequired>
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
        <a href="" className="text-blue-500 font-bold">
          {" "}
          Log in
        </a>
      </span>
    </form>
  );
}
