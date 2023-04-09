import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/authentication";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import jwtDecode from "jwt-decode";

function UserProfilePage() {
  const { userAuthState , setUserAuthState } = useAuth();
  const [avatar, setAvatar] = useState();
  const [avatarFile, setAvatarFile] = useState();
  const [errorUploadMessage, setErrorUploadMessage] = useState('');
  const [errorEmailMessage, setErrorEmailMessage] = useState('');
  const [statusImage, setStatusImage] = useState();
  const { handleSubmit, register, formState: { errors, isSubmitting }, trigger,} = useForm();
  const userId = userAuthState.user.id;
  const toast = useToast()

  async function onSubmit(values) {
    // Start Coding Here

    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("birth_date", values.birth_date);
    formData.append("education", values.education);
    formData.append("email", values.email);
    formData.append("userId", userId);
    formData.append("profile_image", avatarFile)
    formData.append("statusImage", statusImage)
    try {
    const result = await axios.put(`http://localhost:4000/user/${userId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }})
    if (result.data.message.includes('succes')) {
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setUserAuthState({ ...userAuthState, user: userDataFromToken });
      toast({
        title: result.data.message,
        isClosable: true,
        position: 'top',
        status: 'success',
        colorScheme: "blue",
        duration: 5000
      })
    } else if (result.data.message.includes('email')){
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
      console.log("onSubmit Error", error);
    }
  }

  function handleFileChange (event) {
    const imageFile = event.target.files[0];
    const allowedTypes = /(\.jpeg|\.png|\.jpg)$/i;
    const maxFileSize = 2 * 1024 * 1024;
    if (imageFile) {
      if (!allowedTypes.test(imageFile.name)) {
        setErrorUploadMessage("Invalid file type. Please select a valid image file.");
        toast({
          title: "Invalid file type. Please select a valid image file.",
          isClosable: true,
          position: 'top',
          status: 'error',
          duration: 5000
        })
      } else if (imageFile.size > maxFileSize) {
        setErrorUploadMessage("File size too large. Choose an image under 2MB.");
        toast({
          title: "File size too large. Choose an image under 2MB.",
          isClosable: true,
          position: 'top',
          status: 'error',
          duration: 5000
        })
      } else {
        setAvatarFile(imageFile);
        setAvatar(URL.createObjectURL(imageFile));
        setStatusImage("update");
      }
    }
  };
  

  const handleRemoveImage = () => {
    setErrorUploadMessage("")
	  setAvatar()
    setAvatarFile()
    setStatusImage("delete")
	};

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (!/^[a-zA-Z\s'\-]+$/.test(value)) {
      error = "Invalid characters in name";
    }
    return error;
  }

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

  useEffect(() => {
    if (userAuthState.user.profile_image) {
      setAvatar(userAuthState.user.profile_image.url);
    }
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="flex flex-col py-[100px] gap-[72px] mb-28 bg-imag-userpage">
        <h1 className="text-headline2 font-headline2 text-center text-black">
          Profile
        </h1>
        <div className="flex">
          {/* ——————————————————— Image Input ——————————————————— */}
          <div className="w-[52%] flex justify-end px-28">
            <div className="relative">
              {avatar ? 
              <>
              <img
                alt="image-profile-preview"
                className="rounded-2xl w-[360px] h-[360px] shadow-shadow2 object-cover"
                src={avatar}
              />
              <img
                src="./image/icon/delete.png"
                alt="delete-button"
                className="absolute w-[32px] h-[32px] top-2 right-2 cursor-pointer hover:opacity-90"
                onClick={handleRemoveImage}
              />
              <h1 className="text-body3 mt-3 text-gray-600">To change your profile picture,
              <br/>click the purple 'X' button at the top-right.</h1>
              </>
              :
              <>
              <FormControl isInvalid={errors.upload || errorUploadMessage}>
              <label className="hover:cursor-pointer" htmlFor="upload">
              <Input 
              type="file" 
              hidden
              id="upload"
              onChange={handleFileChange}
              />
              <div className="bg-gray-100 w-[360px] h-[360px] rounded-2xl flex flex-col justify-center text-center text-blue-400 shadow-shadow2">
                <h1 className="text-[60px]">+</h1>
                <h1 className="text-[30px]">Upload Image</h1>
              </div>
              <h1 className="text-body3 mt-3 text-gray-600">Accepted formats: .jpg .jpeg .png
              <br/>Please ensure that your image is under 2MB in size.</h1>
              </label>
              <FormErrorMessage>
                {errorUploadMessage}
              </FormErrorMessage>
              </FormControl>
              </>
              }
              
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[50%] flex flex-col gap-10"
          >
            {/* ——————————————————— Name Input ——————————————————— */}
            <FormControl isInvalid={errors.full_name} width={450}>
              <FormLabel htmlFor="full_name">Name</FormLabel>
              <Input
                variant="normal"
                id="full_name"
                placeholder="Enter Name and Lastname"
                {...register("full_name", { validate: validateName })}
                onBlur={() => {
                  trigger("full_name");
                }}
                defaultValue={userAuthState.user.full_name}
              />
              <FormErrorMessage>
                {errors.full_name && errors.full_name.message}
              </FormErrorMessage>
            </FormControl>

            {/* ——————————————————— Date Input ——————————————————— */}
            <FormControl isInvalid={errors.birth_date} width={450}>
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
                  trigger("birth_date");
                }}
                max={new Date().toISOString().slice(0, 10)}
                defaultValue={userAuthState.user.birth_date}
              />
              <FormErrorMessage>
                {errors.birth_date && errors.birth_date.message}
              </FormErrorMessage>
            </FormControl>

            {/* ——————————————————— Education Input ——————————————————— */}
            <FormControl isInvalid={errors.education} width={450}>
              <FormLabel htmlFor="education">Educational Background</FormLabel>
              <Input
                variant="normal"
                id="education"
                placeholder="Enter Educational Background"
                {...register("education", {
                  required: "Educational Background is required",
                })}
                onBlur={() => {
                  trigger("education");
                }}
                defaultValue={userAuthState.user.education}
              />
              <FormErrorMessage>
                {errors.education && errors.education.message}
              </FormErrorMessage>
            </FormControl>

            {/* ——————————————————— Email Input ——————————————————— */}
            <FormControl isInvalid={errors.email || errorEmailMessage} width={450}>
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
                defaultValue={userAuthState.user.email}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
                {errorEmailMessage}
              </FormErrorMessage>
            </FormControl>

            <Button
              variant="primary"
              isLoading={isSubmitting}
              type="submit"
              width={450}
            >
              Update Profile
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfilePage;