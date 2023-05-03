import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import { ArrowBackIcon } from "@chakra-ui/icons";
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
  Link,
  useToast
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";


const EditCoursePage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast()
  const [courseIdAdmin, setCourseIdAdmin] = useState()
  const [errorUploadCoverImageMessage, setErrorUploadCoverImageMessage] = useState('');
  const [errorUploadVideoMessage, setErrorUploadVideoMessage] = useState('');
  const [imageCover, setImageCover] = useState()
  

  async function getCoursesByIdAdmin() {
    try { 
      const results = await axios.get(`http://localhost:4000/admin/courses/${params.courseId}`);
      setCourseIdAdmin(results?.data.data[0])
      setImageCover(courseIdAdmin?.image_cover.url)

    } catch (error) {
      console.log("Get sub-lesson by id error:", error);
    }
  }

  console.log(courseIdAdmin);
  console.log(imageCover);

  useEffect(() => {
    getCoursesByIdAdmin()
  }, []);
  

  function handleFileChange(event) {
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
      setAdminCourse({ ...adminCourse, cover_image_file: imageFile, cover_image: URL.createObjectURL(imageFile) })
    }
  };

  function handleRemoveImage() {
    setImageCover()

  };

  function handleVideoChange(event) {
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
      setAdminCourse({ ...adminCourse, video_file: videoFile, video: URL.createObjectURL(videoFile) })
    }
  };

  function handleRemoveVideo() {
    setAdminCourse({ ...adminCourse, video_file: null, video: null })
    setErrorUploadVideoMessage()
  };


  return (
    <div className="flex">
      {/* ————————————— Left Section ————————————— */}
      <SidebarAdmin />
      {/* ————————————— Right Section ————————————— */}
      <div className="w-full">
        {/* ————————————— Navbar Section ————————————— */}
        <nav className="h-[100px] border-gray-400 border-b bg-white flex justify-between px-10 py-4 items-center">
          <div className="flex items-center gap-4">
            <ArrowBackIcon boxSize={7} color="#9AA1B9" />
            <h1 className="text-headline3 font-headline3 text-gray-600">
              Course <span className="text-black">‘{courseIdAdmin?.name}’</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => { navigate('/admin') }}>Cancel</Button>
            <Button variant="primary">Edit</Button>
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
                onChange={(event) => { setCourseIdAdmin({ ...courseIdAdmin, name: event.target.value }) }}
                value={courseIdAdmin?.name}
                placeholder="Enter ..."
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
                  onChange={(event) => { setCourseIdAdmin({ ...courseIdAdmin, price: event.target.value }) }}
                  value={courseIdAdmin?.price}
                  placeholder="Enter ..."
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
                  onChange={(event) => { setCourseIdAdmin({ ...courseIdAdmin, total_learning_time: event.target.value }) }}
                  value={courseIdAdmin?.total_learning_time}
                  placeholder="Enter ..."
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
                  onChange={(event) => { setCourseIdAdmin({ ...courseIdAdmin, category: event.target.value }) }}
                  value={courseIdAdmin?.category}
                  placeholder="Enter ..."
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
                onChange={(event) => { setCourseIdAdmin({ ...courseIdAdmin, course_summary: event.target.value }) }}
                value={courseIdAdmin?.course_summary}

                placeholder="Enter ..."
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
                onChange={(event) => { setCourseIdAdmin({ ...courseIdAdmin, course_detail: event.target.value }) }}
                value={courseIdAdmin?.course_detail}
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
                {imageCover ?
                  <>
                    <img
                      alt="cover-image-preview"
                      className="rounded-2xl w-full h-full shadow-shadow2 object-cover"
                      src={imageCover}
                    />
                    <img
                      src="/image/icon/delete.png"
                      alt="delete-button"
                      className="absolute w-[32px] h-[32px] cursor-pointer hover:opacity-90 top-2 right-2"
                      onClick={handleRemoveImage}
                    />
                  </>
                  :
                  <FormControl>
                    <FormLabel htmlFor="cover_image" className='cursor-pointer'>
                      <Input
                        type="file"
                        hidden
                        id="cover_image"
                      // onChange={handleFileChange}
                      />
                      <div className="bg-gray-100 w-[320px] h-[320px] rounded-2xl flex flex-col justify-center text-center text-blue-400 shadow-shadow2 hover:opacity-50">
                        <h1 className="text-[60px]">+</h1>
                        <h1 className="text-[30px]">Upload Image</h1>
                      </div>
                    </FormLabel>
                    <FormErrorMessage>
                      {'Error Message'}
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
                {courseIdAdmin?.video_trailer ?
                  <>
                    <video
                      className="rounded-2xl shadow-shadow2"
                      src={courseIdAdmin?.video_trailer.url}
                      controls
                    />
                    <img
                      src="/image/icon/delete.png"
                      alt="delete-button"
                      className="absolute w-[32px] h-[32px] cursor-pointer hover:opacity-90 top-2 right-2"
                    />
                  </>
                  :
                  <FormControl>
                    <FormLabel htmlFor="video_trailer" className='cursor-pointer'>
                      <Input
                        type="file"
                        hidden
                        id="video_trailer"
                      // onChange={handleFileChange}
                      />
                      <div className="bg-gray-100 w-[320px] h-[320px] rounded-2xl flex flex-col justify-center text-center text-blue-400 shadow-shadow2 hover:opacity-50">
                        <h1 className="text-[60px]">+</h1>
                        <h1 className="text-[30px]">Upload Video</h1>
                      </div>
                    </FormLabel>
                    <FormErrorMessage>
                      {'Error Message'}
                    </FormErrorMessage>
                  </FormControl>
                }
              </div>
            </div>

          </div>
          {/* Lesson Section */}
          <div className='flex justify-between items-center'>
            <h1 className='text-headline3 font-headline3 text-black'>Lesson</h1>
            <Button variant='primary'>
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
                {courseIdAdmin?.lessons.map((lesson, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{(index + 1)}</Td>
                      <Td>{lesson.name}</Td>
                      <Td>{lesson.sub_lessons.length}</Td>
                      <Td>
                        <div className='flex gap-4 justify-center'>
                          <img src="/image/icon/bin.png" alt="bin-icon" className='h-[25px]' />
                          <img src="/image/icon/edit.png" alt="edit-icon" className='h-[25px]' />
                        </div>
                      </Td>
                    </Tr>

                  )
                })}

              </Tbody>
            </Table>
          </TableContainer>

          {/* Delete Course Section */}
          <div className="flex justify-end my-8">
            <Link>Delete Course</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;
