import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import SubFooter from "../components/SubFooter";
import Footer from "../components/Footer";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
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
    const { isAuthenticated } = useAuth();
    const { course , isLoading , getCoursesById} = useCourses();
    const navigate = useNavigate();
    
    useEffect(() => {
        getCoursesById();
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
                        {/* —————————————— waiting video from data base —————————————— */}
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
                        {/* —————————————— waiting mockup data —————————————— */}
                        <h1 className="text-headline2 font-headline2 text-black">Module Samples</h1>
                        <Accordion allowMultiple>
                            {/* waiting data from database to map */}
                            <AccordionItem borderTop="none" >
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left' padding='16px 0' >
                                            <div className="flex gap-4">
                                                <h1 className="text-headline3 font-headline3 text-gray-700" >01</h1>
                                                <h1 className="text-headline3 font-headline3 text-black">Introduction</h1>
                                            </div>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                <AccordionPanel padding='16px 0' className="w-[600px]">
                                    <ul className="text-body2 font-body2 text-gray-700 list-disc px-[10%]" >
                                        <li>Welcome to the Course</li>
                                        <li>Course Overview</li>
                                        <li>Getting to Know You</li>
                                        <li>What is Service Design ?</li>
                                        <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
                                        <li>4 Levels of Service Design in an Organization</li>
                                        <li>Scope of Service Design</li>
                                        <li>Improving Existing Services - Credit Cards</li>
                                        <li>Improving Existing Services - MK</li>
                                        <li>Levels of Impact</li>
                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>


                            <AccordionItem >
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left' padding='16px 0'>
                                            <div className="flex gap-4">
                                                <h1 className="text-headline3 font-headline3 text-gray-700" >02</h1>
                                                <h1 className="text-headline3 text-black  font-headline3">Service Design Theories and Principles</h1>
                                            </div>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                <AccordionPanel padding='16px 0' className="w-[600px] ">
                                    <ul className="text-body2 font-body2 text-gray-700 list-disc px-[10%]" >
                                        <li >Welcome to the Course</li>
                                        <li>Course Overview</li>
                                        <li>Getting to Know You</li>
                                        <li>What is Service Design ?</li>
                                        <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
                                        <li>4 Levels of Service Design in an Organization</li>
                                        <li>Scope of Service Design</li>
                                        <li>Improving Existing Services - Credit Cards</li>
                                        <li>Improving Existing Services - MK</li>
                                        <li>Levels of Impact</li>

                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>


                            <AccordionItem >
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left' padding='16px 0'>
                                            <div className="flex gap-4">
                                                <h1 className="text-headline3 font-headline3 text-gray-700" >03</h1>
                                                <h1 className="text-headline3 text-black  font-headline3">Understanding Users and Finding Opportunities</h1>
                                            </div>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                <AccordionPanel padding='16px 0' className="w-[600px] ">
                                    <ul className="text-body2 font-body2 text-gray-700 list-disc px-[10%]" >
                                        <li >Welcome to the Course</li>
                                        <li>Course Overview</li>
                                        <li>Getting to Know You</li>
                                        <li>What is Service Design ?</li>
                                        <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
                                        <li>4 Levels of Service Design in an Organization</li>
                                        <li>Scope of Service Design</li>
                                        <li>Improving Existing Services - Credit Cards</li>
                                        <li>Improving Existing Services - MK</li>
                                        <li>Levels of Impact</li>

                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>


                            <AccordionItem >
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left' padding='16px 0'>
                                            <div className="flex gap-4">
                                                <h1 className="text-headline3 font-headline3 text-gray-700" >04</h1>
                                                <h1 className="text-headline3 text-black  font-headline3">Identifying and Validating Opportunities for Design</h1>
                                            </div>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                <AccordionPanel padding='16px 0' className="w-[600px] ">
                                    <ul className="text-body2 font-body2 text-gray-700 list-disc px-[10%]" >
                                        <li >Welcome to the Course</li>
                                        <li>Course Overview</li>
                                        <li>Getting to Know You</li>
                                        <li>What is Service Design ?</li>
                                        <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
                                        <li>4 Levels of Service Design in an Organization</li>
                                        <li>Scope of Service Design</li>
                                        <li>Improving Existing Services - Credit Cards</li>
                                        <li>Improving Existing Services - MK</li>
                                        <li>Levels of Impact</li>

                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>


                            <AccordionItem >
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left' padding='16px 0'>
                                            <div className="flex gap-4">
                                                <h1 className="text-headline3 font-headline3 text-gray-700" >05</h1>
                                                <h1 className="text-headline3 text-black  font-headline3">Prototyping</h1>
                                            </div>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                <AccordionPanel padding='16px 0' className="w-[600px] ">
                                    <ul className="text-body2 font-body2 text-gray-700 list-disc px-[10%]" >
                                        <li >Welcome to the Course</li>
                                        <li>Course Overview</li>
                                        <li>Getting to Know You</li>
                                        <li>What is Service Design ?</li>
                                        <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
                                        <li>4 Levels of Service Design in an Organization</li>
                                        <li>Scope of Service Design</li>
                                        <li>Improving Existing Services - Credit Cards</li>
                                        <li>Improving Existing Services - MK</li>
                                        <li>Levels of Impact</li>

                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>


                            <AccordionItem >
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left' padding='16px 0'>
                                            <div className="flex gap-4">
                                                <h1 className="text-headline3 font-headline3 text-gray-700" >06</h1>
                                                <h1 className="text-headline3 text-black  font-headline3">Course Summary</h1>
                                            </div>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                <AccordionPanel padding='16px 0' className="w-[600px] ">
                                    <ul className="text-body2 font-body2 text-gray-700 list-disc px-[10%]" >
                                        <li >Welcome to the Course</li>
                                        <li>Course Overview</li>
                                        <li>Getting to Know You</li>
                                        <li>What is Service Design ?</li>
                                        <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
                                        <li>4 Levels of Service Design in an Organization</li>
                                        <li>Scope of Service Design</li>
                                        <li>Improving Existing Services - Credit Cards</li>
                                        <li>Improving Existing Services - MK</li>
                                        <li>Levels of Impact</li>

                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>

                        </Accordion>

                    </div>
                </div>

                {/* ———————————————————————— Right Section ———————————————————————— */}
                <PriceCard
                name={course.name}
                course_summary={course.course_summary}
                price={course.price.toFixed(2)}
                courseId={course.course_id}
                />
            </div>}
            {isAuthenticated ? null : <SubFooter />}
            <Footer />
        </div>
    )
}

export default CourseDetailPage;