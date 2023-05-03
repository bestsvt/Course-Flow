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
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAdmin } from "../../contexts/admin";


const EditCoursePage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm();
  const { 
    isOpen: isOpenDelete, 
    onClose: onCloseDelete, 
    onOpen: onOpenDelete} = useDisclosure()
  const cancelRef = React.useRef()
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast()
  const { adminCourse , setAdminCourse , adminLesson, setAdminLesson , adminLessonField, setAdminLessonFiled} = useAdmin()
  const [errorUploadCoverImageMessage, setErrorUploadCoverImageMessage] = useState('');
  const [errorUploadVideoMessage, setErrorUploadVideoMessage] = useState('');
  const [submitLoading , setSubmitLoading] = useState(false)
  
  async function getCoursesByIdAdmin() {
    try { 
      const results = await axios.get(`http://localhost:4000/admin/courses/${params.courseId}`);
      let adminCourseData = {
        category: results.data.data[0].category,
        course_detail: results.data.data[0].course_detail,
        course_name: results.data.data[0].name,
        cover_image: results.data.data[0].image_cover.url,
        learning_time: results.data.data[0].total_learning_time,
        lesson: results.data.data[0].lessons,
        price: results.data.data[0].price,
        summary: results.data.data[0].course_summary,
        video: results.data.data[0].video_trailer.url,
      }
      setAdminCourse(adminCourseData)
      setAdminLesson(results.data.data[0].lessons)
    } catch (error) {
      console.log("Get course by id admin error:", error);
    }
  }

  useEffect(() => {
    if (adminLesson.length == 0) {
      getCoursesByIdAdmin()
    }
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
	  setAdminCourse({...adminCourse, cover_image_file: null, cover_image: null})
    setErrorUploadCoverImageMessage()
  };

  function handleVideoChange(event) {
    const videoFile = event.target.files[0];
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

  async function deleteCourse() {
    try {
      const results = await axios.delete(
        `http://localhost:4000/admin/courses/${params.courseId}`
      );
      toast({
        title: results.data.message,
        isClosable: true,
        position: 'top',
        status: 'success',
        colorScheme: "blue",
        duration: 5000
      })
      navigate(-1)
    } catch (error) {
      console.log("Delete courses Admin error:", error);
    }
    onCloseDelete()
  }

  async function onSubmit() {
    setSubmitLoading(true)
    console.log(adminCourse);

    const formData = new FormData();
    // loop for append all key in object
    for (let key in adminCourse) {
      // cover_image and video just show preview
      if (key !== 'cover_image' && key !== 'video' && key !== 'lesson') {
        formData.append(key, adminCourse[key]);
      }
    }

    // ————————————————— ต้องเพิ่มเติมเรื่อง lesson —————————————————
    // ต้องดูว่า เปลี่ยนอะไรใน lesson บ้างรึป่าว อาจจะใส่ action เพิ่มถ้าเปลี่ยน
    // Action > Change -- เปลี่ยนชื่อ lesson / เพิ่ม sub-lesson
    // Action > Delete -- ลบ lesson ออก

    // เช็คต่อว่า Sub lesson เปลี่ยนแปลงอะไรบ้าง
    // Action > Change -- เปลี่ยน video / เปลี่ยนชื่อ
    // Action > Delete -- ลบ sub-lesson ออก

    // const lessons = adminCourse.lesson
    // for (let i = 0; i < lessons?.length; i++) {
    //   const lesson = lessons[i];
    //   const lessonKey = `lesson[${i}]`;
    //   // Append lesson name
    //   formData.append(`${lessonKey}[lesson_name]`, lesson.name);
    //   // Append sublesson data
    //   for (let j = 0; j < lesson.sub_lessons.length; j++) {
    //     const subLesson = lesson.sub_lessons[j];
    //     const subLessonKey = `${lessonKey}[sub_lesson][${j}]`;
    //     formData.append(`${subLessonKey}[sub_lesson_name]`, subLesson.sub_lesson_name);
    //     formData.append('sub_lesson_videos', subLesson.video, subLesson.sub_lesson_name);
    //   }
    // }

    const results = await axios.put(`http://localhost:4000/admin/courses/${params.courseId}`, formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setSubmitLoading(false)
    if (results.data.message && results.data.message.includes('successfully')) {
      toast({
        title: results.data.message,
        isClosable: true,
        position: 'top',
        status: 'success',
        colorScheme: "blue",
        duration: 5000
      })
      navigate('/admin')
    } else {
      toast({
        title: "Sorry, there was a problem with the server. Course creation failed. Please try again later.",
        isClosable: true,
        position: 'top',
        status: 'error',
        duration: 5000
      })
    }
  }


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
              Course <span className="text-black">‘{adminCourse.course_name}’</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => { navigate('/admin') }}>Cancel</Button>
            <Button variant="primary" onClick={onSubmit} isLoading={submitLoading}>Edit</Button>
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
                onChange={(event) => {setAdminCourse({ ...adminCourse, course_name: event.target.value })}}
                value={adminCourse.course_name}
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
                  onChange={(event) => {setAdminCourse({ ...adminCourse, price: event.target.value })}}
                  value={adminCourse.price}
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
                  onChange={(event) => {setAdminCourse({ ...adminCourse, learning_time: event.target.value })}}
                  value={adminCourse.learning_time}
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
                  onChange={(event) => {setAdminCourse({ ...adminCourse, category: event.target.value })}}
                  value={adminCourse.category}
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
                onChange={(event) => {setAdminCourse({ ...adminCourse, summary: event.target.value })}}
                value={adminCourse.summary}
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
                onChange={(event) => {setAdminCourse({ ...adminCourse, course_detail: event.target.value })}}
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
                  <FormControl  isInvalid={errorUploadCoverImageMessage}>
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
                {adminLesson.map((lesson, index) => {
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
            <Link onClick={()=>{onOpenDelete()}}>Delete Course</Link>
          </div>
          {/* ——————————————————— Confirmation Delete ——————————————————— */}
          <AlertDialog
               motionPreset='slideInBottom'
               leastDestructiveRef={cancelRef}
               onClose={onCloseDelete}
               isOpen={isOpenDelete}
               isCentered
           >
              <AlertDialogOverlay/>
              <AlertDialogContent borderRadius={24}  >
                  <AlertDialogHeader className="text-body1 font-body1 text-black" >
                  Confirmation
                  </AlertDialogHeader>
                  <hr className="h-[1px] bg-gray-300 mb-3" />
                  <AlertDialogCloseButton/>
                  <AlertDialogBody className="text-body2 font-body2 text-gray-700">
                  Are you sure you want to delete this course?
                  </AlertDialogBody>
                  <AlertDialogFooter gap={3}>
                      <Button variant="secondary" ref={cancelRef} onClick={onCloseDelete}>
                      Cancel
                      </Button>
                      <Button variant="primary" onClick={deleteCourse}>
                      Delete
                      </Button>
                  </AlertDialogFooter>
              </AlertDialogContent>
           </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;
