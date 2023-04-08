import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/authentication";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function UserProfilePage() {
  const { userAuthState } = useAuth();
  const [avatar, setAvatar] = useState();
  const [errorUploadMessage, setErrorUploadMessage] = useState('');
  const [avatarFile, setAvatarFile] = useState();
  const { handleSubmit, register, formState: { errors, isSubmitting }, trigger,} = useForm();
  const userId = userAuthState.user.id;


  function onSubmit(values) {
    // Start Coding Here
  }
  
  function handleFileChange (event) {
    const imageFile = event.target.files[0];
    const allowedTypes = /(\.jpeg|\.png|\.jpg|\.gif)$/i;
    if (imageFile && allowedTypes.test(imageFile.name)) {
      setAvatarFile(imageFile);
      setAvatar(URL.createObjectURL(imageFile));
    } else {
      setErrorUploadMessage("Invalid file type. Please select a valid image file.")
    }
  };

  const handleRemoveImage = () => {
    setErrorUploadMessage("")
	  setAvatar()
    setAvatarFile()
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
              <img
                alt="image-profile"
                className="rounded-2xl w-[360] h-[360] hover:opacity-50 shadow-shadow2"
                src="./image/homepage/navbar/profile-image-default.jpg"
              />
              </label>
              <h1 className="text-body3 mt-3 text-gray-600">Click the image to update your profile pictures.</h1>
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
            <FormControl isInvalid={errors.name} width={450}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                variant="normal"
                id="name"
                placeholder="Enter Name and Lastname"
                {...register("name", { validate: validateName })}
                onBlur={() => {
                  trigger("name");
                }}
                defaultValue={userAuthState.user.name}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            {/* ——————————————————— Date Input ——————————————————— */}
            <FormControl isInvalid={errors.date} width={450}>
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
                  trigger("date");
                }}
                max={new Date().toISOString().slice(0, 10)}
                defaultValue={userAuthState.user.birth_date}
              />
              <FormErrorMessage>
                {errors.date && errors.date.message}
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
            <FormControl isInvalid={errors.email} width={450}>
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
