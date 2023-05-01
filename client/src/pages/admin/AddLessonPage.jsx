import React, { useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  Divider,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Link
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useAdmin } from "../../contexts/admin";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

const AddLessonPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    trigger,
    control 
  } = useForm({
    defaultValues: {
      sub_lesson: [{ sub_lesson_name: null, video: null }]
    }
  });
  const {
    fields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    replace
  } = useFieldArray({
    control,
    name: "sub_lesson"
  });

  const [errorUploadVideoMessage, setErrorUploadVideoMessage] = useState('');
  const navigate = useNavigate();
  const { adminCourse , setAdminCourse , adminLesson, setAdminLesson , adminLessonField, setAdminLessonFiled} = useAdmin()

  function handleVideoChange (event) {
    const videoFile = event.target.files[0];
    console.log(videoFile);
    const allowedTypes = /(\.mp4|\.mov|\.avi)$/i;
    const maxFileSize = 20 * 1024 * 1024;
    if (!allowedTypes.test(videoFile.name)) {
      setErrorUploadVideoMessage("Invalid file type. Please select a valid video file.");
      toast({
        title: "Invalid file type. Please select a valid video file.",
        isClosable: true,
        position: 'top',
        status: 'error',
        duration: 5000
      })
    } else if (videoFile.size > maxFileSize) {
      setErrorUploadVideoMessage("File size too large. Choose an image under 20MB.");
      toast({
        title: "File size too large. Choose an image under 20MB.",
        isClosable: true,
        position: 'top',
        status: 'error',
        duration: 5000
      })
    } else {
      setAdminCourse({...adminCourse, video_file: videoFile})
      setAdminCourse({...adminCourse, video: URL.createObjectURL(videoFile)})
    }
  };
  

  const handleRemoveVideo = () => {
	  setAdminCourse({...adminCourse, video_file: null})
    setAdminCourse({...adminCourse, video: null})
    setErrorUploadVideoMessage()
	};

  const onSubmit = (data) => console.log("subLesson", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <section className="flex">
      {/* ————————————— Left Section ————————————— */}
      <SidebarAdmin />
      {/* ————————————— Right Section ————————————— */}
      <div className="w-full">
        {/* ————————————— Navbar Section ————————————— */}
        <nav className="h-[100px] border-gray-400 border-b bg-white flex justify-between px-10 py-4 items-center">
          <div className="flex items-center gap-4">
            <ArrowBackIcon boxSize={7} color="#9AA1B9" onClick={()=>{navigate('/admin/addcourse')}}/>
            <div className="flex flex-col">
              <h1 className="text-body3 font-body3 text-gray-600">
                Course{" "}
                <span className="text-black">
                  ‘{adminCourse.course_name}’
                </span>
              </h1>
              <h1 className="text-headline3 font-headline3 text-black">
                Add Lesson
              </h1>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary" type="submit">Create</Button>
          </div>
        </nav>
        {/* ————————————— Content Section ————————————— */}
        <div className='bg-gray-100 p-10 flex flex-col gap-10'>
          {/* ————————————— Start Coding Here ————————————— */}
          <div className="flex flex-col gap-10 bg-white px-24 py-10 rounded-2xl border border-gray-400">

            <FormControl isRequired>
              <FormLabel htmlFor="course_name" color='black'>Lesson Name</FormLabel>
              <Input
                variant="normal"
                id="lesson_name"
                placeholder="Enter ..."
                onChange={(event)=>{setAdminLessonFiled({...adminLessonField , lesson_name: event.target.value})}}
                value={adminLessonField.lesson_name}
                onBlur={() => {
                  trigger('lesson_name');
                }}
              />
              <FormErrorMessage>
                {/* {errors.lesson_name && errors.lesson_name.message} */}
              </FormErrorMessage>
            </FormControl>

            <Divider/>

            <h1 className="text-xl font-semibold text-[#646D89]">
              Sub-Lesson
            </h1>
            {/* —————————————————— Sub Lesson box —————————————————— */}
            
            {fields.map((item,index) => {
              return (
            <div className="flex flex-row gap-6 justify-between bg-gray-100 border border-[#E4E6ED] rounded-lg p-6" key={item.id}>
              <img
                src="/image/icon/drag.png"
                alt="drag-icon"
                className="rounded-lg w-[26px] h-[76px] object-cover"
              />
              <div className="flex flex-col grow gap-6">
                <FormControl isRequired>
                  <FormLabel htmlFor="sub_lesson_name" color='black'>Sub-lesson Name</FormLabel>
                  <Input
                    variant="normal"
                    id="sub_lesson_name"
                    placeholder="Enter ..."
                    width='70%'
                    {...register(`sub_lesson.${index}.sub_lesson_name`)}
                    // onChange={(event)=>{setAdminCourse({...adminCourse , course_name: event.target.value})}}
                    // value={adminCourse.course_name}
                    onBlur={() => {
                      trigger('sub_lesson_name');
                    }}
                  />
                  <FormErrorMessage>
                    {/* {errors.lesson_name && errors.lesson_name.message} */}
                  </FormErrorMessage>
                </FormControl>

                {/* —————————————————— Video Section —————————————————— */}
                
                <div className='flex flex-col gap-2'>
                  <h1 className='text-body2 font-headline3 text-black'>
                  Video <span className='text-red-500'>*</span>
                  </h1>
                  <div className="relative flex justify-start w-[160px] h-[160px] px-0">
                    {false ?
                    <>
                    <video
                        className="rounded-2xl shadow-shadow2"
                        // src={adminCourse.video}
                        controls
                      />
                    <img
                      src="/image/icon/delete.png"
                      alt="delete-button"
                      className="absolute w-[20px] h-[20px] cursor-pointer hover:opacity-90 top-2 right-2"
                      // onClick={handleRemoveVideo}
                    />
                    </>
                    :
                    <FormControl>
                    <FormLabel htmlFor="video" className='cursor-pointer'>
                    <Input 
                    type="file" 
                    hidden
                    id="video"
                    // onChange={handleVideoChange}
                    {...register(`sub_lesson.${index}.video`)}
                    />
                    <div className="bg-gray-200 w-[160px] h-[160px] rounded-2xl flex flex-col justify-center text-center text-blue-400 hover:opacity-50">
                      <h1 className="text-[30px]">+</h1>
                      <h1 className="text-[15px]">Upload Video</h1>
                    </div>
                    </FormLabel>
                    <FormErrorMessage>
                      {/* {errorUploadVideoMessage} */}
                    </FormErrorMessage>
                    </FormControl>
                    }
                  </div>
                </div>
              </div>
              {fields.length == 1 ? 
              <div className="text-gray-500 font-bold text-base">Delete</div> 
              :
              <Link onClick={() => remove(index)}>Delete</Link>
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
  );
};

export default AddLessonPage;
