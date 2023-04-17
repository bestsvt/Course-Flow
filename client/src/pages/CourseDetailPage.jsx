import React, { useEffect, useRef, useState } from "react";
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
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Link,
    Spinner
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import useCourses from "../hooks/useCourses";
import { useAuth } from "../contexts/authentication";

function CourseDetailPage() {
    const { isAuthenticated } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
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
                            src="/video/demo1.mp4"
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
                <div className=" w-[420px] h-[450px] bg-white flex flex-col gap-6 p-6 mt-24 rounded-lg shadow-shadow1 sticky top-5">
                    <div className="flex flex-col gap-2">
                        <div className="text-orange-500 font-body3 mb-4">Course</div>
                        <div className="text-headline3 font-headline3 text-black ">{course.name}</div>
                        <div className="text-gray-700 text-body2 mb-4">{course.course_summary}</div>
                        <div className=" text-headline3 font-headline3 text-gray-700 ">THB {course.price.toFixed(2)}</div>
                    </div>
                    <hr className="h-[1px] bg-gray-300 mb-3" />
                    {/* —————————————— wating function subscribe + desire —————————————— */}
                    <div className="flex flex-col items-center gap-4">
                        <Button variant="secondary" className="w-full" >Get in Desire Course</Button>
                        <Button variant="primary" onClick={onOpen} className="w-full" >Subscribe This Course</Button>

                        <AlertDialog
                            motionPreset='slideInBottom'
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                            isOpen={isOpen}
                            isCentered
                        >
                            <AlertDialogOverlay/>
                            <AlertDialogContent borderRadius={24}  >
                                <AlertDialogHeader className="text-body1 font-body1 text-black" >
                                    Confirmation
                                </AlertDialogHeader>
                                <hr className="h-[1px] bg-gray-300 mb-3" />
                                <AlertDialogCloseButton />

                                <AlertDialogBody className="text-body2 font-body2 text-gray-700">
                                Do you sure to subscribe Service Design Essentials Course?
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button variant="secondary" ref={cancelRef} onClick={onClose}>
                                    No, I don’t
                                    </Button>
                                    <Button variant="primary" colorScheme='red' ml={3}>
                                    Yes, I want to subscribe
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>}
            {isAuthenticated ? null : <SubFooter />}
            <Footer />
        </div>
    )
}

export default CourseDetailPage;