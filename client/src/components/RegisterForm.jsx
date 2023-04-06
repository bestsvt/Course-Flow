import { useForm } from "react-hook-form";
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

export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 1000);
    });
  }

  //  toggle show password
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-[38%] py-[10%] flex flex-col gap-10"
    >
      <h1 className="text-headline2 text-[#22269E] font-headline2">
        Register to start learning!
      </h1>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          variant="normal"
          id="name"
          placeholder="Enter Name and Lastname"
          {...register("name", {
            required: "This is required",
            minLength: { value: 10, message: "Minimum length should be 10" },
          })}
          required
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.date}>
        <FormLabel htmlFor="date">Date of Birth</FormLabel>
        <Input
          variant="normal"
          type="date"
          id="date"
          placeholder="MM/DD/YY"
          {...register("date", {
            required: "This is required",
          })}
          required
          max={new Date().toISOString().slice(0, 10)}
        />
        <FormErrorMessage>
          {errors.date && errors.date.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.education}>
        <FormLabel htmlFor="education">Educational Background</FormLabel>
        <Input
          variant="normal"
          id="education"
          placeholder="Enter Educational Background"
          {...register("education", {
            required: "This is required",
          })}
          required
        />
        <FormErrorMessage>
          {errors.education && errors.education.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          variant="normal"
          type="email"
          id="email"
          placeholder="Enter Email"
          {...register("email", {
            required: "This is required",
          })}
          required
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            variant="normal"
            id="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "This is required",
              minLength: { value: 12, message: "Minimum length should be 12" },
            })}
            type={show ? "text" : "password"}
            required
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
