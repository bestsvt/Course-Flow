import React, { useEffect , useState } from "react";
import Navbar from "../components/Navbar";
import SubFooter from "../components/SubFooter";
import Footer from "../components/Footer";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Link,
    Spinner
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import useCourses from "../hooks/useCourses";
import { useAuth } from "../contexts/authentication";
import PriceCard from "../components/PriceCard";

function CourseDetailPage() {
    const { isAuthenticated , userAuthState} = useAuth();
    const { course , isLoading , getCoursesById} = useCourses();
    const navigate = useNavigate();
    const [ subscribeStatus , setSubscribeStatus ] = useState(false)
    const [ desireStatus , setDesireStatus ] = useState(false)
    
    useEffect(() => {
        async function getCourses() {
          if (isAuthenticated) {
            const result = await getCoursesById(userAuthState.user.id);
            setSubscribeStatus(result.data.subscribeStatus)
            setDesireStatus(result.data.desireStatus)
          } else {
            await getCoursesById();
          }
        }   
        getCourses()
      }, []);
    return (
        <div>
            <Navbar />
            {isLoading ? 
            <div className="flex justify-center p-[20%] mb-[50%]">
                <Spinner
                thickness='5px'
                speed='0.5s'
                emptyColor='gray.200'
                color='blue.500'
                width={100}
                height={100}
                />
            </div> 
            :
            !course ? 
            // กรณีที่ใส่ link เลขอื่นมาที่ไม่มีใน data base
            <div className="flex flex-col p-[15%] gap-20 items-center">
                <h1 className="text-gray-600 text-[100px] text-center">
                    Course Not Found
                </h1>
                <Button variant='primary' padding={10} onClick={()=>{navigate('/courses')}}>Go Back to Our Course</Button>
            </div>
            : 
            <div name="course-detail-page" className="flex justify-between px-[11%]">
                {/* ———————————————————————— Left Section ———————————————————————— */}
                <div className="flex flex-col gap-28 w-[1000px] py-14" >
                    <div >
                        <Link href='/courses' className="flex items-center gap-1 mb-3">
                            <ArrowBackIcon mx='2px'/>Back 
                        </Link>
                        <video
                            src={course.video_trailer.url}
                            controls
                            className="rounded-lg w-[1000px]"
                            // เอาไว้ดูเวลาที่เล่นอยู่ - เวลาทั้งหมดของ Video (หน่วยเป็น sec)
                            onTimeUpdate={(e) => {
                                console.log(e.target.currentTime);
                                console.log(e.target.duration); 
                            }}
                            // เวลาเล่น video จนจบจะทำงาน function onEnded
                            onEnded={ (e) => {
                                // ใส่ if เพราะบางทีเวลากด F5 แล้วมันทำงานแล้ว เราต้องการให้มันจบก่อนแล้วค่อยทำงาน
                                if (e.target.currentTime === e.target.duration) {
                                    console.log("Ended of video")
                            }}}
                        />
                    </div>

                    <div className="flex flex-col gap-4" >
                        <h1 className="text-headline2 font-headline2 text-black">Course Detail</h1>
                        <p className="text-body2 font-body2 text-gray-700">{course.course_detail}
                        </p>
                    </div>

                    <div className="flex flex-col gap-6"  >
                        <h1 className="text-headline2 font-headline2 text-black">Module Samples</h1>
                        <Accordion allowMultiple>
                        {course.lessons.map((lesson,index)=>{
                            return (
                        <AccordionItem borderTop="none" key={index}>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left' padding='16px 0'>
                                    <div className="flex gap-4 text-headline3 font-headline3">
                                        <h1 className="text-gray-700" >0{index+1}</h1>
                                        <h1 className="text-black">{lesson.name}</h1>
                                    </div>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel padding='16px 0' className="w-[600px]">
                                <ul className="text-body2 font-body2 text-gray-700 list-disc px-[10%]">
                                    {lesson.sub_lessons.sort((a, b) => a.sub_lesson_id - b.sub_lesson_id).map((sub_lesson,index)=>{
                                        return (
                                        <li key={index}>{sub_lesson.name}</li>
                                        )
                                    })}
                                </ul>
                            </AccordionPanel>
                        </AccordionItem>
                            )
                        })}
                        </Accordion>
                    </div>
                </div>

                {/* ———————————————————————— Right Section ———————————————————————— */}
                <PriceCard
                name={course.name}
                course_summary={course.course_summary}
                price={course.price.toFixed(2)}
                courseId={course.course_id}
                subscribeStatus={subscribeStatus}
                setSubscribeStatus={setSubscribeStatus}
                desireStatus={desireStatus}
                setDesireStatus={setDesireStatus}
                />
            </div>}
            {isAuthenticated ? null : <SubFooter />}
            <Footer />
        </div>
    )
}

export default CourseDetailPage;