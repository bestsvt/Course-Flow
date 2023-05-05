import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../../components/SidebarAdmin';
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button,
  Input,
  Divider,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Link,
  useToast } from "@chakra-ui/react";
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../../contexts/admin';
import axios from 'axios';

const EditLessonPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    trigger,
    control,
    watch,
    setValue 
  } = useForm();

  const { fields, append, remove,} = useFieldArray({ control, name: "sub_lesson"});
  const subLessons = watch("sub_lesson");
  const toast = useToast()
  const [errorUploadVideoMessage, setErrorUploadVideoMessage] = useState([]);
  const navigate = useNavigate();
  const { adminCourse , setAdminCourse , adminLesson, setAdminLesson , adminLessonField, setAdminLessonField} = useAdmin()
  const params = useParams()

  function handleVideoChange (event, index) {
    const videoFile = event.target.files[0];
    const allowedTypes = /(\.mp4|\.mov|\.avi)$/i;
    const maxFileSize = 20 * 1024 * 1024;
    if (!allowedTypes.test(videoFile.name)) {
      const newErrors = [...errorUploadVideoMessage];
      newErrors[index] = "Invalid file type. Please select a valid video file.";
      setErrorUploadVideoMessage(newErrors);
      toast({
        title: "Invalid file type. Please select a valid video file.",
        isClosable: true,
        position: 'top',
        status: 'error',
        duration: 5000
      })
    } else if (videoFile.size > maxFileSize) {
      const newErrors = [...errorUploadVideoMessage];
      newErrors[index] = "File size too large. Choose an image under 20MB.";
      setErrorUploadVideoMessage(newErrors);  
      toast({
        title: "File size too large. Choose an image under 20MB.",
        isClosable: true,
        position: 'top',
        status: 'error',
        duration: 5000
      })
    } else {
      const newErrors = [...errorUploadVideoMessage];
      newErrors[index] = null;
      setErrorUploadVideoMessage(newErrors);
      setValue(`sub_lesson.${index}.video`, videoFile);
    }
  };
  
  const handleRemoveVideo = (index) => {
	  setValue(`sub_lesson.${index}.video`, null);
    const newErrors = [...errorUploadVideoMessage];
    newErrors[index] = null;
    setErrorUploadVideoMessage(newErrors);
	};

  function onSubmit(data) {
    // Function Edit Lesson
  }

  useEffect(() => {
      getLessonByIdAdmin()
  }, []);

  async function getLessonByIdAdmin() {
    try { 
      const results = await axios.get(`http://localhost:4000/admin/lessons/${params.lessonId}`);
      setAdminLessonField(results.data.data[0])
      const dataSubLessons = results.data.data[0].sub_lessons
      dataSubLessons.forEach(subLesson => {
        append({
          sub_lesson_name: subLesson.name,
          video: subLesson.video
        });
      });
    } catch (error) {
      console.log("Get lesson by id admin error:", error);
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <section className='flex'>
      {/* ————————————— Left Section ————————————— */}
      <SidebarAdmin/>
      {/* ————————————— Right Section ————————————— */}
      <div className="w-full">
        {/* ————————————— Navbar Section ————————————— */}
        <nav
          className="h-[100px] border-gray-400 border-b bg-white flex justify-between 
        px-20 py-4 items-center"
        >
          <div className="flex items-center gap-4">
            <ArrowBackIcon boxSize={7} color="#9AA1B9"
            onClick={()=>{navigate(-1)}}/>
            <div className="flex flex-col">
              <h1 className="text-body3 font-body3 text-gray-600">
                Course{" "}
                <span className="text-black">
                  ‘{adminCourse.course_name}’
                </span>
              </h1>
              <h1 className='text-headline3 font-headline3 text-gray-600'>Lesson{" "}
                <span className="text-headline3 font-headline3 text-black">
                ‘{adminLessonField.name}’
                </span>
              </h1>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={()=>{navigate(-1)}}>Cancel</Button>
            <Button variant="primary" type="submit" isDisabled>Edit</Button>
          </div>
        </nav>

        {/* ————————————— Content Section ————————————— */}
        <div className='bg-gray-100 p-10 flex flex-col gap-10'>
          <div className="flex flex-col gap-10 bg-white px-24 py-10 rounded-2xl border border-gray-400">

            <FormControl isRequired>
              <FormLabel htmlFor="name" color='black'>Lesson Name</FormLabel>
              <Input
                variant="normal"
                id="name"
                placeholder="Enter ..."
                onChange={(event)=>{setAdminLessonField({...adminLessonField , name: event.target.value})}}
                value={adminLessonField.name}
                onBlur={() => {
                  trigger('name');
                }}
              />
              <FormErrorMessage>
                {errors.lesson_name && errors.lesson_name.message}
              </FormErrorMessage>
            </FormControl>

            <Divider/>

            <h1 className="text-xl font-semibold text-[#646D89]">
              Sub-Lesson
            </h1>
            {/* —————————————————— Sub Lesson box —————————————————— */}
            
            {fields.map((item,index) => {
              return (
            <div className="flex flex-row gap-6 justify-between bg-gray-100 border border-[#E4E6ED] rounded-lg px-6 py-9" key={item.id}>
              <img
                src="/image/icon/drag.png"
                alt="drag-icon"
                className="rounded-lg w-[26px] h-[76px] object-cover"
              />
              <div className="flex flex-col grow gap-6">
                <FormControl isRequired>
                  <FormLabel htmlFor={`sub_lesson_name${index}`} color='black'>Sub-lesson Name</FormLabel>
                  <Input
                    variant="normal"
                    id={`sub_lesson_name${index}`}
                    placeholder="Enter ..."
                    width='70%'
                    {...register(`sub_lesson.${index}.sub_lesson_name`)}
                    onBlur={() => {
                      trigger(`sub_lesson_name${index}`);
                    }}
                  />
                  <FormErrorMessage>
                    {errors.lesson_name && errors.lesson_name.message}
                  </FormErrorMessage>
                </FormControl>

                {/* —————————————————— Video Section —————————————————— */}
                <div className='flex flex-col gap-2'>
                  <h1 className='text-body2 font-headline3 text-black'>
                  Video <span className='text-red-500'>*</span>
                  </h1>
                  <div className="relative flex justify-start w-[160px] h-[160px] px-0">
                    {subLessons[index].video ?
                    <>
                    <video
                        className="rounded-2xl shadow-shadow2"
                        src={item.video.url}
                        controls
                      />
                    <img
                      src="/image/icon/delete.png"
                      alt="delete-button"
                      className="absolute w-[20px] h-[20px] cursor-pointer hover:opacity-90 top-2 right-2"
                      onClick={()=>{handleRemoveVideo(index)}}
                    />
                    </>
                    :
                    <FormControl isInvalid={errorUploadVideoMessage[index]}>
                    <FormLabel htmlFor={`sub_lesson.${index}.video`} className='cursor-pointer'>
                    <Input 
                    type="file" 
                    hidden
                    id={`sub_lesson.${index}.video`}  
                    onChange={(event)=>{handleVideoChange(event, index)}}
                    />
                    <div className="bg-gray-200 w-[160px] h-[160px] rounded-2xl flex flex-col justify-center text-center text-blue-400 hover:opacity-50">
                      <h1 className="text-[30px]">+</h1>
                      <h1 className="text-[15px]">Upload Video</h1>
                    </div>
                    </FormLabel>
                    <FormErrorMessage width='500px'>
                      {errorUploadVideoMessage[index]}
                    </FormErrorMessage>
                    </FormControl>
                    }
                  </div>
                </div>
              </div>
              {fields.length == 1 ? 
              <div className="text-gray-500 font-bold text-base">Delete</div> 
              :
              <Link onClick={() => 
                remove(index)
              }>Delete</Link>
              }
            </div>
              );
            })}
            

            <Button variant="secondary" className="w-[220px] mt-6"
            onClick={() => {
              append({ sub_lesson_name: '', video: null });
            }}>
              + Add Sub-lesson
            </Button>
          </div>
        </div>
       

      </div>
    </section>
    </form>
  )
}

export default EditLessonPage