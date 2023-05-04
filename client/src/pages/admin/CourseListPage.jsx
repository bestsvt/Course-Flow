import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../../components/SidebarAdmin';
import { FiSearch } from "react-icons/fi"
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  TableContainer,
  Collapse,
  useDisclosure,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useToast
} from "@chakra-ui/react";
import { Pagination } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAdmin } from '../../contexts/admin';

const CourseListPage = () => {

  const [ keyword, setKeyword] = useState("");
  const [ suggest, setSuggest] = useState("");
  const [ suggestWord, setSuggestWord] = useState("");
  const [ currentPage, setCurrentPage] = useState(1);
  const [ courses, setCourses] = useState();
  const [ courseId, setCourseId] = useState();
  const [ totalCourses, setTotalCourses] = useState();
  const [ isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose , onOpen} = useDisclosure()
  const cancelRef = React.useRef()
  const navigate = useNavigate();
  const toast = useToast()
  const { setAdminCourse , setAdminLesson } = useAdmin()
  const { 
    isOpen: isOpenDelete, 
    onClose: onCloseDelete, 
    onOpen: onOpenDelete} = useDisclosure()
  const { 
    isOpen: isOpenEdit, 
    onClose: onCloseEdit, 
    onOpen: onOpenEdit} = useDisclosure()

  useEffect(() => {
    getCoursesAdmin(keyword)
  }, [keyword, currentPage]);

  useEffect(() => {
    getCoursesSuggestAdmin(suggestWord)
  }, [suggestWord]);

  function pagination(pageNumber) {
    setCurrentPage(pageNumber)  
  }

  // Function get all course
  async function getCoursesAdmin(searchKeyword) {
    try {
      setIsLoading(true)
      if (!searchKeyword) {
        searchKeyword = "";
      }
      const query = new URLSearchParams();
      query.append("keyword", searchKeyword);
      query.append("currentPage", currentPage);
      const results = await axios.get(
        `http://localhost:4000/admin/courses?${query.toString()}`
      );
      setCourses(results.data.data)
      setTotalCourses(results.data.allCourses.length)
      setIsLoading(false)
    } catch (error) {
      console.log("Get courses Admin error:", error);
      setIsLoading(false)
    }
  }

  // Function get all course for autocomplete search 
  async function getCoursesSuggestAdmin(suggestWord) {
    try {
      const query = new URLSearchParams();
      query.append("keyword", suggestWord);
      const results = await axios.get(
        `http://localhost:4000/courses?${query.toString()}`
      );
      setSuggest(results.data.allCourses);
    } catch (error) {
      console.log("Get courses suggest admin error:", error);
    }
  };

  async function deleteCourse() {
    try {
      setIsLoading(true)
      const results = await axios.delete(
        `http://localhost:4000/admin/courses/${courseId}`
      );
      toast({
        title: results.data.message,
        isClosable: true,
        position: 'top',
        status: 'success',
        colorScheme: "blue",
        duration: 5000
      })
      getCoursesAdmin(keyword)
      setIsLoading(false)
    } catch (error) {
      console.log("Delete courses Admin error:", error);
      setIsLoading(false)
    }
    onCloseDelete()
  }

  // Change format time to MM/DD/YYYY TT:TT(AM)
  function changeFormatTime(time) {
    function formatTime(hours, minutes) {
      const meridiem = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = String(minutes).padStart(2, '0');
      return `${formattedHours}:${formattedMinutes}${meridiem}`;
    }
    const inputDateString = time;
    const inputDate = new Date(inputDateString);
    return `${inputDate.getMonth() + 1}/${inputDate.getDate()}/${inputDate.getFullYear()} ${formatTime(inputDate.getHours(), inputDate.getMinutes())}`;
  }

  return (
    <div className='flex'>
      {/* ————————————— Left Section ————————————— */}
      <SidebarAdmin/>
      {/* ————————————— Right Section ————————————— */}
      <div className='w-full'>
        {/* ————————————— Navbar Section ————————————— */}
        <nav className='h-[100px] border-gray-400 border-b bg-white flex justify-between px-10 py-4 items-center'>
          <h1 className='text-headline3 font-headline3 text-black'>Course</h1>
          <div className='flex items-center gap-4'>
          <div className="relative">
          <InputGroup>
            <Input
              variant="normal"
              id="password"
              placeholder="Search..."
              type="text"
              padding='0 45px'
              onChange={(event)=>{setSuggestWord(event.target.value); onOpen()}}
              value={suggestWord}
              onKeyDown={(event) => {
                if (event.keyCode === 13) { 
                // 13 is the keycode for Enter key
                  setKeyword(event.target.value);
                  onClose()
                }
              }}
            />
            <InputLeftElement margin="4px">
              <FiSearch fontSize={20}/>
            </InputLeftElement>
            </InputGroup>
            {suggest ?
              <Collapse in={isOpen} animateOpacity>
              <div className="absolute w-full flex flex-col shadow-shadow2 z-50 rounded-b-lg">
                {suggest.filter((item) => {
                    const search = suggestWord.toLowerCase();
                    const fullName = item.name.toLowerCase();
                    return (
                      search &&
                      search !== fullName
                    );
                  }).slice(0, 5).map((item,index)=>{
                  return (
                    <div className="py-2 px-4 text-black bg-white  hover:bg-gray-100 hover:cursor-pointer"
                    onClick={()=>{setSuggestWord(item.name);setKeyword(item.name)}}
                    key={index}>
                      {item.name}
                    </div>
                  )
                })}
              </div>
              </Collapse> 
            : null}
            </div>
            <Button variant='primary' onClick={()=>{
            setAdminCourse({
            category: '',
            course_detail: '',
            course_name: '',
            cover_image: '',
            cover_image_file: null,
            learning_time: '',
            lesson: [],
            price: '',
            summary: '',
            video: '',
            video_file: null
            });
            setAdminLesson([]);
            navigate(`/admin/addcourse`)}}>+ Add Course
            </Button>
          </div>
        </nav>
        {/* ————————————— Content Section ————————————— */}
        <div className='h-full p-10 bg-gray-100 flex flex-col items-center gap-10'>

        {isLoading ?
        <div className="w-full flex justify-center items-center p-40">
          <Spinner
            thickness="5px"
            speed="0.5s"
            emptyColor="gray.200"
            color="blue.500"
            width={100}
            height={100}
          />
        </div>
        : 
        <TableContainer borderRadius={10} width='100%'>
          <Table>
            <Thead>
              <Tr bg='#E4E6ED'>
                <Th width='5%' ></Th>
                <Th width='12.5%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Image</Th>
                <Th width='25%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Course name</Th>
                <Th width='10%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Lesson</Th>
                <Th width='10%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Price</Th>
                <Th width='15%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Created date</Th>
                <Th width='15%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Updated date</Th>
                <Th width='7.5%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Action</Th>
              </Tr>
            </Thead>

            <Tbody bg='white' color='black'>
              {courses?.map((course,index)=>{
                return (
                <Tr className="text-body2 font-body2 text-black" key={index}>
                  <Td fontSize="body2" fontWeight="body2" >{index + 1 + ((currentPage - 1) * 8)}</Td>
                  <Td padding='16px' >
                    <Image src={course.image_cover.url} className='h-[75px] w-[80%] object-cover'/>
                  </Td>
                  <Td fontSize="body2" fontWeight="body2" >{course.name}</Td>
                  <Td fontSize="body2" fontWeight="body2" >{course.lessons_count} Lessons</Td>
                  <Td fontSize="body2" fontWeight="body2" >{course.price.toFixed(2)}</Td>
                  <Td fontSize="body2" fontWeight="body2" >{changeFormatTime(course.created_at)}</Td>
                  <Td fontSize="body2" fontWeight="body2" >{changeFormatTime(course.update_at)}</Td>
                  <Td >
                    <div className='flex gap-4 justify-center'>
                      <Image width={25} height={25} src="\image\icon\bin.png" alt="Bin Icon" className='hover:cursor-pointer hover:opacity-75'
                      onClick={()=>{setCourseId(course.course_id);onOpenDelete()}}/>
                      <Image width={25} height={25} src="\image\icon\edit.png" alt="Edit Icon" className='hover:cursor-pointer hover:opacity-75'
                      onClick={()=>{setCourseId(course.course_id);onOpenEdit()}}/>
                    </div>
                  </Td>
                </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
        }
        {isLoading ? null : 
        <Pagination
          total={totalCourses}
          current={currentPage}
          pageSize={8}
          onChange={pagination}
          hideOnSinglePage={totalCourses < 8 ? true : false}
        />}

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

           {/* ——————————————————— Confirmation Edit ——————————————————— */}
          <AlertDialog
               motionPreset='slideInBottom'
               leastDestructiveRef={cancelRef}
               onClose={onCloseEdit}
               isOpen={isOpenEdit}
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
                  Are you sure you want to edit this course?
                  </AlertDialogBody>
                  <AlertDialogFooter gap={3}>
                      <Button variant="secondary" ref={cancelRef} onClick={onCloseEdit}>
                      Cancel
                      </Button>
                      <Button variant="primary" onClick={()=>{navigate(`/admin/editcourse/${courseId}`)}}>
                      Edit
                      </Button>
                  </AlertDialogFooter>
              </AlertDialogContent>
           </AlertDialog>
         

        
        </div>
      </div>
    </div>
  )
}

export default CourseListPage