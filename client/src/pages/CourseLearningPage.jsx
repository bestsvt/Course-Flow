import React, { useEffect , useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import { Button, 
Link, 
Progress, 
Accordion,
AccordionItem,
AccordionButton,
AccordionPanel,
AccordionIcon,
Box,
Badge } from "@chakra-ui/react";
import useCourses from "../hooks/useCourses";

function CourseLearningPage() {
    const { isAuthenticated , userAuthState} = useAuth();
    const { course , isLoading , getCoursesById} = useCourses();
    const navigate = useNavigate();
    
    useEffect(() => {

        async function getCourses() {
        await getCoursesById(userAuthState.user.id);
        }   
        getCourses()

      }, []);

    return (
        <>
            <Navbar />

            <section className="px-[10%] py-[5%] flex justify-center gap-[2%]">
                {/* ———————— Left Section ———————— */}
                <div className="shadow-shadow1 w-[30%] flex flex-col gap-6 px-6 py-8 overflow-y-scroll hide-scroll h-[1080px] rounded-lg">
                    <div className="text-orange-500 font-body3 mb-4">Course</div>
                        {/* Course Deatil */}
                    <div className="flex flex-col gap-2">
                        <div className="text-headline3 font-headline3 text-black">{course?.name}</div>
                        <div className="text-body2 font-body2 text-gray-700">{course?.course_summary}</div>
                    </div>

                    <div className="flex flex-col gap-2">
                        {/* ———————— Waiting Function % Progress ———————— */}
                        <div className="text-body3 font-body3 text-gray-700">5% Complete</div>
                        <Progress value={5} />
                    </div>
                    
                    <Accordion allowMultiple>
                        {course?.lessons.map((lesson,index)=>{
                        return (
                            <AccordionItem borderTop="none" key={index}>
                                <AccordionButton paddingBottom={0}>
                                    <Box as="span" flex='1' textAlign='left' padding='16px 0'>
                                        <div className="flex gap-4">
                                            <h1 className="text-headline3 font-headline3 text-gray-700" >0{index+1}</h1>
                                            <h1 className="text-headline3 font-headline3 text-black">{lesson.name}</h1>
                                        </div>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel paddingTop='8px'>
                                    <ul className="text-body2 font-body2 text-gray-700">
                                    {lesson.sub_lessons.map((sub_lesson,index)=>{
                                        return (
                                        <li className="flex items-center px-2 py-3 gap-4" key={index}>
                                        <img src="/image/icon/no-watch.png" alt="icon-status" className="w-[18px] h-[18px]"/> 
                                        <p>{sub_lesson.name}</p>
                                        </li>
                                        )
                                    })}
                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>
                            )
                        })}
                    </Accordion>
                </div>

                {/* ———————— Right Section ———————— */}
                <div className="w-[68%] flex flex-col gap-8">
                    {/* ———————— When Click Sub-Lesson This name and video will change (maybe create some state change when onclick) ———————— */}
                    <div className="text-headline2 font-headline2 text-black">Wating Name of Sub-Lesson (change when click left section)</div>
                        {/* ———————— Video Section ———————— */}
                    <video
                            src="/video/demo1.mp4"
                            controls
                            className="rounded-lg w-[100%] mb-[50px]"
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

                    {/* ———————— Assignment Card ———————— */}
                    <div className="bg-blue-100 w-full rounded-lg flex flex-col p-6 gap-[25px]">

                        <div className="flex justify-between">
                            <p className="text-body1 font-body1 text-black">Assignment</p>
                            <Badge colorScheme='yellow' variant='solid' textTransform="capitalize">Pending</Badge>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>What are the 4 elements of service design?</p>
                            <textarea name="answer-assignment" id="answer-assignment" cols="30" rows="10"
                            placeholder="Answer..." className="w-full h-[100px] resize-none hide-scroll p-3 rounded-lg border border-gray-400 outline-none"></textarea>
                        </div>

                        <div className="flex justify-between items-center">
                            <Button variant='primary'>Send Assignment</Button>
                            <p className="text-gray-700">Assign within 2 days</p>
                        </div>

                    </div>

                </div>

            </section>

            {/* ———————— Button (Next - Previous) ———————— */}
            <section className="flex justify-between items-center px-16 py-5 shadow-shadow1">
                <Link>Previous Lesson</Link>
                <Button variant='primary'>Next Lesson</Button>
            </section>
            <Footer />
        </>
    )
}

export default CourseLearningPage;