import Navbar from "../components/Navbar"
import SubFooter from "../components/SubFooter"
import Footer from "../components/Footer"
import CourseCard from "../components/CourseCard"
import { Spinner , Button } from "@chakra-ui/react";
import { useAuth } from "../contexts/authentication"
import { useEffect } from "react"
import useCourses from "../hooks/useCourses"
import { useNavigate } from "react-router-dom";
import { Pagination } from 'antd';
import { useState } from "react";

function DesireCoursePage() {
  const { isAuthenticated , userAuthState } = useAuth();
  const { isLoading, getDesireCourses, desireCourse, totalCourses} = useCourses();
  const [ currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getDesireCourses(userAuthState.user.id, currentPage);
  }, [currentPage]);

  function pagination(pageNumber) {
    setCurrentPage(pageNumber)
  }

    return (
        <>
        <Navbar/>
        <div className="px-[10%] py-24 bg-imag-userpage">
            <div className="flex flex-col gap-10 items-center">
                <div className="text-headline2 font-headline2 text-black mb-5">Desire Course</div>
                <div className="w-[30%] relative">
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
                  (desireCourse?.length > 3) ?
                  // courses between 4 and 9
                  <div className="flex flex-wrap gap-x-[5%] mt-[60px] mb-[40px]">
                  {desireCourse.map((course,index) => {
                    return (
                      <div className="w-[30%] mb-[60px]" key={index}>
                        <CourseCard 
                        name={course.courses.name}
                        summary={course.courses.course_summary}
                        image={course.courses.image_cover.url}
                        time={course.courses.total_learning_time}
                        id={course.courses.course_id}
                        />
                      </div>
                    )
                  })
                  }
                  </div>
                  :
                  (desireCourse?.length >= 1) ?
                  // courses between 1 and 3
                  <div className="flex items-start gap-[5%] mt-[60px] mb-[40px] w-full">
                  {desireCourse.map((course,index) => {
                    return (
                      <div className="w-[30%] mb-[60px] " key={index}>
                        <CourseCard 
                        name={course.courses.name}
                        summary={course.courses.course_summary}
                        image={course.courses.image_cover.url}
                        time={course.courses.total_learning_time}
                        id={course.courses.course_id}
                        />
                      </div>
                    )
                  })
                  }
                  </div>
                  :
                  // courses = 0
                  <>
                    <h1 className="text-gray-600 text-[75px] text-center">
                    No desired courses found yet
                    </h1>
                    <Button variant='primary' padding={10} onClick={()=>{navigate('/courses')}}>Go Back to Our Course</Button>
                  </>
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

export default DesireCoursePage