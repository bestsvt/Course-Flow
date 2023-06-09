import Navbar from "../components/Navbar"
import SubFooter from "../components/SubFooter"
import Footer from "../components/Footer"
import CourseCard from "../components/CourseCard"
import { FiSearch } from "react-icons/fi"
import {
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Collapse,
  useDisclosure
} from "@chakra-ui/react";
import { useAuth } from "../contexts/authentication"
import { useEffect, useState } from "react"
import useCourses from "../hooks/useCourses"
import { Pagination } from 'antd';

function OurCoursePage() {
  const { isAuthenticated } = useAuth();
  const { courses, getCourses, isLoading, getCoursesSuggest, suggest, totalCourses} = useCourses();
  const [ keyword, setKeyword] = useState("");
  const [ suggestWord, setSuggestWord] = useState("");
  const [ currentPage, setCurrentPage] = useState(1);
  const { isOpen, onClose , onOpen} = useDisclosure()

  useEffect(() => {
    getCourses(keyword, currentPage);
  }, [keyword, currentPage]);

  useEffect(() => {
    getCoursesSuggest(suggestWord);
  }, [suggestWord]);

  function pagination(pageNumber) {
    setCurrentPage(pageNumber)  
  }

    return (
        <>
        <Navbar/>
        <div className="px-[10%] py-24 bg-imag-userpage">
            <div className="flex flex-col gap-10 items-center">
                <div className="text-headline2 font-headline2 text-black mb-5">Our Courses</div>
                <div className="w-[30%] relative">
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
                          setCurrentPage(1)
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
                        onClick={()=>{setSuggestWord(item.name);setKeyword(item.name);setCurrentPage(1)}}
                        key={index}>
                          {item.name}
                        </div>
                      )
                    })}
                  </div>
                  </Collapse> 
                  : null}
                </div>
                  {
                  isLoading ? 
                  <Spinner
                    thickness='5px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  /> 
                  :
                  (courses?.length > 3) ?
                  // courses between 4 and 9
                  <div className="flex flex-wrap gap-x-[5%] mt-[60px] mb-[40px]">
                  {courses.map((course,index) => {
                    return (
                      <div className="w-[30%] mb-[60px]" key={index}>
                        <CourseCard 
                        name={course.name}
                        summary={course.course_summary}
                        image={course.image_cover.url}
                        time={course.total_learning_time}
                        id={course.course_id}
                        lessonCount={course.lessons_count}
                        />
                      </div>
                    )
                  })
                  }
                  </div>
                  :
                  (courses?.length >= 1) ?
                  // courses between 1 and 3
                  <div className="flex items-start gap-[5%] mt-[60px] mb-[40px] w-full">
                  {courses.map((course,index) => {
                    return (
                      <div className="w-[30%] mb-[60px] " key={index}>
                        <CourseCard 
                        name={course.name}
                        summary={course.course_summary}
                        image={course.image_cover.url}
                        time={course.total_learning_time}
                        id={course.course_id}
                        lessonCount={course.lessons_count}
                        />
                      </div>
                    )
                  })
                  }
                  </div>
                  :
                  // courses = 0
                  <h1 className="text-gray-600 text-[50px] mt-[40px]">
                    Course Not Found
                  </h1>
                  }
                  {isLoading ? null : 
                  <Pagination
                    total={totalCourses}
                    current={currentPage}
                    pageSize={9}
                    onChange={pagination}
                    hideOnSinglePage={totalCourses < 9 ? true : false}
                  />}
                </div>        
        </div>
        {isAuthenticated ? null : <SubFooter/>}
        <Footer/>
        </>
    )
}

export default OurCoursePage