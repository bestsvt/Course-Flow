import React, { useState } from 'react'
import SidebarAdmin from '../../components/SidebarAdmin';
import { 
Input,
Button,   
FormErrorMessage,
FormLabel,
FormControl,
Textarea,
Table,
Thead,
Tbody,
Tr,
Th,
Td,
TableContainer,
useToast } from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/admin';

const AddCoursePage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm();
  const navigate = useNavigate();
  const toast = useToast()
  const { adminCourse , setAdminCourse } = useAdmin()
  const [errorUploadCoverImageMessage, setErrorUploadCoverImageMessage] = useState('');
  const [errorUploadVideoMessage, setErrorUploadVideoMessage] = useState('');

  function handleFileChange (event) {
    const imageFile = event.target.files[0];
    const allowedTypes = /(\.jpeg|\.png|\.jpg)$/i;
    const maxFileSize = 5 * 1024 * 1024;
    if (!allowedTypes.test(imageFile.name)) {
      setErrorUploadCoverImageMessage("Invalid file type. Please select a valid image file.");
      toast({
        title: "Invalid file type. Please select a valid image file.",
        isClosable: true,
        position: 'top',
        status: 'error',
        duration: 5000
      })
    } else if (imageFile.size > maxFileSize) {
      setErrorUploadCoverImageMessage("File size too large. Choose an image under 5MB.");
      toast({
        title: "File size too large. Choose an image under 5MB.",
        isClosable: true,
        position: 'top',
        status: 'error',
        duration: 5000
      })
    } else {
      setAdminCourse({...adminCourse, cover_image_file: imageFile})
      setAdminCourse({...adminCourse, cover_image: URL.createObjectURL(imageFile)})
    }
  };

  const handleRemoveImage = () => {
	  setAdminCourse({...adminCourse, cover_image_file: null})
    setAdminCourse({...adminCourse, cover_image: null})
    setErrorUploadCoverImageMessage()
	};

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

  return (
    <div className='flex'>
      {/* ————————————— Left Section ————————————— */}
      <SidebarAdmin/>
      {/* ————————————— Right Section ————————————— */}
      <div className='w-full'>
        {/* ————————————— Navbar Section ————————————— */}
        <nav className='h-[100px] border-gray-400 border-b bg-white flex justify-between px-10 py-4 items-center'>
            <h1 className='text-headline3 font-headline3 text-black'>Add Course</h1>
            <div className='flex gap-4'>
              <Button variant='secondary' onClick={()=>{navigate('/admin')}}>Cancel</Button>
              <Button variant='primary'>Create</Button>
            </div>
        </nav>
        {/* ————————————— Content Section ————————————— */}
        <div className='bg-gray-100 p-10 flex flex-col gap-10'>
          {/* ————————————— Input Section ————————————— */}
          <div className='w-full bg-white border-gray-400 border rounded-2xl px-24 py-10 flex flex-col gap-10'>
            {/* ————————————— Course Name Input ————————————— */}
            <FormControl isInvalid={errors.course_name} isRequired>
              <FormLabel htmlFor="course_name" color='black'>Course Name</FormLabel>
              <Input
                variant="normal"
                id="course_name"
                placeholder="Enter ..."
                onChange={(event)=>{setAdminCourse({...adminCourse , course_name: event.target.value})}}
                value={adminCourse.course_name}
                onBlur={() => {
                  trigger('course_name');
                }}
              />
              <FormErrorMessage>
                {errors.course_name && errors.course_name.message}
              </FormErrorMessage>
            </FormControl>
            <div className='flex gap-[2%]'>
              {/* ————————————— Price Input ————————————— */}
              <FormControl isInvalid={errors.price} isRequired >
                <FormLabel htmlFor="price" color='black'>Price</FormLabel>
                <Input
                  variant="normal"
                  id="price"
                  placeholder="Enter ..."
                  onChange={(event)=>{setAdminCourse({...adminCourse , price: event.target.value})}}
                  value={adminCourse.price}
                  onBlur={() => {
                    trigger('price');
                  }}
                />
                <FormErrorMessage>
                  {errors.price && errors.price.message}
                </FormErrorMessage>
              </FormControl>

              {/* ————————————— Total learning time Input ————————————— */}
              <FormControl isInvalid={errors.total_learning_time} isRequired >
                <FormLabel htmlFor="total_learning_time" color='black'>Total learning time</FormLabel>
                <Input
                  variant="normal"
                  id="total_learning_time"
                  placeholder="Enter ..."
                  onChange={(event)=>{setAdminCourse({...adminCourse , learning_time: event.target.value})}}
                  value={adminCourse.learning_time}
                  onBlur={() => {
                    trigger('total_learning_time');
                  }}
                />
                <FormErrorMessage>
                  {errors.total_learning_time && errors.total_learning_time.message}
                </FormErrorMessage>
              </FormControl>

              {/* ————————————— Category Input ————————————— */}
              <FormControl isInvalid={errors.category} isRequired >
                <FormLabel htmlFor="category" color='black'>Category</FormLabel>
                <Input
                  variant="normal"
                  id="category"
                  placeholder="Enter ..."
                  onChange={(event)=>{setAdminCourse({...adminCourse , category: event.target.value})}}
                  value={adminCourse.category}
                  onBlur={() => {
                    trigger('category');
                  }}
                />
                <FormErrorMessage>
                  {errors.category && errors.category.message}
                </FormErrorMessage>
              </FormControl>
            </div>

            {/* ————————————— Course summary Input ————————————— */}
            <FormControl isInvalid={errors.course_summary} isRequired >
              <FormLabel htmlFor="course_summary" color='black'>Course summary</FormLabel>
              <Input
                variant="normal"
                id="course_summary"
                placeholder="Enter ..."
                onChange={(event)=>{setAdminCourse({...adminCourse , summary: event.target.value})}}
                value={adminCourse.summary}
                onBlur={() => {
                  trigger('course_summary');
                }}
              />
              <FormErrorMessage>
                {errors.course_summary && errors.course_summary.message}
              </FormErrorMessage>
            </FormControl>

            {/* ————————————— Course detail Input ————————————— */}
            <FormControl isInvalid={errors.course_detail} isRequired >
              <FormLabel htmlFor="course_detail" color='black'>Course detail</FormLabel>
              <Textarea
                type="text"
                w="100%"
                h="192px"
                id="course_detail"
                placeholder="Enter ..."
                resize='none'
                className='hide-scroll'
                variant='normal'
                onChange={(event)=>{setAdminCourse({...adminCourse , course_detail: event.target.value})}}
                value={adminCourse.course_detail}
                onBlur={() => {
                  trigger('course_detail');
                }}
              />
              <FormErrorMessage>
                {errors.course_detail && errors.course_detail.message}
              </FormErrorMessage>
            </FormControl>

            {/* ————————————— Cover image Input ————————————— */}
            <div className='flex flex-col gap-2'>
              <h1 className='text-body2 font-headline3 text-black'>
              Cover image <span className='text-red-500'>*</span>
              </h1>
              <div className="relative flex justify-start w-[320px] h-[320px] px-0">
                {adminCourse.cover_image ?
                <>
                <img
                  alt="cover-image-preview"
                  className="rounded-2xl w-full h-full shadow-shadow2 object-cover"
                  src={adminCourse.cover_image}
                />
                <img
                  src="/image/icon/delete.png"
                  alt="delete-button"
                  className="absolute w-[32px] h-[32px] cursor-pointer hover:opacity-90 top-2 right-2"
                  onClick={handleRemoveImage}
                />
                </>
                :
                <FormControl isInvalid={errorUploadCoverImageMessage}>
                <FormLabel htmlFor="cover_image" className='cursor-pointer'>
                <Input 
                type="file" 
                hidden
                id="cover_image"
                onChange={handleFileChange}
                />
                <div className="bg-gray-100 w-[320px] h-[320px] rounded-2xl flex flex-col justify-center text-center text-blue-400 shadow-shadow2 hover:opacity-50">
                  <h1 className="text-[60px]">+</h1>
                  <h1 className="text-[30px]">Upload Image</h1>
                </div>
                </FormLabel>
                <FormErrorMessage>
                  {errorUploadCoverImageMessage}
                </FormErrorMessage>
                </FormControl>
                }
              </div>
            </div>

            {/* ————————————— Video Trailer Input ————————————— */}
            <div className='flex flex-col gap-2'>
              <h1 className='text-body2 font-headline3 text-black'>
              Video Trailer <span className='text-red-500'>*</span>
              </h1>
              <div className="relative flex justify-start w-[320px] h-[320px] px-0">
                {adminCourse.video ?
                <>
                <video
                    className="rounded-2xl shadow-shadow2"
                    src={adminCourse.video}
                    controls
                  />
                <img
                  src="/image/icon/delete.png"
                  alt="delete-button"
                  className="absolute w-[32px] h-[32px] cursor-pointer hover:opacity-90 top-2 right-2"
                  onClick={handleRemoveVideo}
                />
                </>
                :
                <FormControl isInvalid={errorUploadVideoMessage}>
                <FormLabel htmlFor="video_trailer" className='cursor-pointer'>
                <Input 
                type="file" 
                hidden
                id="video_trailer"
                onChange={handleVideoChange}
                />
                <div className="bg-gray-100 w-[320px] h-[320px] rounded-2xl flex flex-col justify-center text-center text-blue-400 shadow-shadow2 hover:opacity-50">
                  <h1 className="text-[60px]">+</h1>
                  <h1 className="text-[30px]">Upload Video</h1>
                </div>
                </FormLabel>
                <FormErrorMessage>
                  {errorUploadVideoMessage}
                </FormErrorMessage>
                </FormControl>
                }
              </div>
            </div>

          </div>
          {/* Lesson Section */}
          <div className='flex justify-between items-center'>
            <h1 className='text-headline3 font-headline3 text-black'>Lesson</h1>
            <Button variant='primary' onClick={()=>{navigate('/admin/addlesson')}}>
              + Add Lesson
            </Button>
          </div>
          {/* Lesson Table Section */}
          <TableContainer borderRadius={10}>
            <Table>
              <Thead >
                <Tr bg='#E4E6ED'>
                  <Th width='5%'></Th>
                  <Th width='55%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Lesson Name</Th>
                  <Th width='33%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Sub-lesson</Th>
                  <Th width='7%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Action</Th>                  
                </Tr>
              </Thead>
              <Tbody bg='white' color='black'>
                {/* Wating Map Data */}
                <Tr>
                  <Td>1</Td>
                  <Td>Introduction</Td>
                  <Td>10</Td>
                  <Td>
                    <div className='flex gap-4 justify-center'>
                      <img src="/image/icon/bin.png" alt="bin-icon" className='h-[25px]'/>
                      <img src="/image/icon/edit.png" alt="edit-icon" className='h-[25px]'/>
                    </div>
                  </Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>Service Design Theories and Principles</Td>
                  <Td>10</Td>
                  <Td>
                    <div className='flex gap-4 justify-center'>
                      <img src="/image/icon/bin.png" alt="bin-icon" className='h-[25px]'/>
                      <img src="/image/icon/edit.png" alt="edit-icon" className='h-[25px]'/>
                    </div>
                  </Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>Understanding Users and Finding Opportunities</Td>
                  <Td>10</Td>
                  <Td>
                    <div className='flex gap-4 justify-center'>
                      <img src="/image/icon/bin.png" alt="bin-icon" className='h-[25px]'/>
                      <img src="/image/icon/edit.png" alt="edit-icon" className='h-[25px]'/>
                    </div>
                  </Td>
                </Tr>
                <Tr>
                  <Td>4</Td>
                  <Td>Identifying and Validating Opportunities for Design</Td>
                  <Td>10</Td>
                  <Td>
                    <div className='flex gap-4 justify-center'>
                      <img src="/image/icon/bin.png" alt="bin-icon" className='h-[25px]'/>
                      <img src="/image/icon/edit.png" alt="edit-icon" className='h-[25px]'/>
                    </div>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

        
        </div>
      </div>
    </div>
  )
}

export default AddCoursePage