import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import CourseCard from "../components/CourseCard"
import { Card, Divider } from "@chakra-ui/react"
import { CiSearch} from "react-icons/ci"
import {  HiOutlineBookOpen,HiOutlineClock } from 'react-icons/hi'


function OurCoursePage() {
    return (
        <>
        <Navbar/>
        <div className="px-[10%]">
            {/* Start Coding Here */}
            <div className="flex flex-col gap-10 items-center ">
                <div className="text-headline2 text-black">Our Courses</div>
                <div className="flex justify-center items-center p-2 gap-2 bg-white rounded-lg border border-solid border-gray-300  mb-10">
                <CiSearch/>
                <input 
                className="w-[360px] h-[25px]"
                type="text" 
                placeholder="Search..."/>
                </div>
                {/* Flex ใหญ่ที่มี Card ด้านใน */}
                <div className="flex gap-8 flex-wrap bg-red-600"> 
                    {/* Card */}

                    <div className="flex flex-col h-[450px] w-[30%] bg-white rounded-lg shadow-shadow1">
                        <img className="rounded-t-lg" src="https://cdn.discordapp.com/attachments/1064852887823458386/1094902855053349004/image_1.png" 
                        />
                        <div className="  pt-6" >
                            <div  className=" px-3 ">
                              <div className="text-orange-500 font-body3">Course</div>
                              <div className="text-headline3 text-black font-body3">Service Design Essentials</div>
                              <div className="mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                            </div>
                            <hr className="h-[1px] bg-gray-300 "/>
                    
                            <div className=" flex items-center px-3 gap-5  h-[70px] ">
                              <div className="flex gap-2 items-center" > <HiOutlineBookOpen className="text-blue-400 text-[20px]"/>6 Lesson</div>
                              <div className="flex gap-2 items-center" >  <HiOutlineClock className="text-blue-400 text-[20px]"/>6 Hours</div>
                            </div>

                        </div>
                    </div> 

                    <div className="flex flex-col h-[450px] w-[30%] bg-white rounded-lg shadow-shadow1">
                        <img className="rounded-t-lg" src="https://cdn.discordapp.com/attachments/1064852887823458386/1094902855053349004/image_1.png" 
                        />
                        <div className="  pt-6" >
                            <div  className=" px-3 ">
                              <div className="text-orange-500 font-body3">Course</div>
                              <div className="text-headline3 text-black font-body3">Service Design Essentials</div>
                              <div className="mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                            </div>
                            <hr className="h-[1px] bg-gray-300 "/>
                    
                            <div className=" flex items-center px-3 gap-5  h-[70px] ">
                              <div className="flex gap-2 items-center" > <HiOutlineBookOpen className="text-blue-400 text-[20px]"/>6 Lesson</div>
                              <div className="flex gap-2 items-center" >  <HiOutlineClock className="text-blue-400 text-[20px]"/>6 Hours</div>
                            </div>

                        </div>
                    </div> 

                    <div className="flex flex-col h-[450px] w-[30%] bg-white rounded-lg shadow-shadow1">
                        <img className="rounded-t-lg" src="https://cdn.discordapp.com/attachments/1064852887823458386/1094902855053349004/image_1.png" 
                        />
                        <div className="  pt-6" >
                            <div  className=" px-3 ">
                              <div className="text-orange-500 font-body3">Course</div>
                              <div className="text-headline3 text-black font-body3">Service Design Essentials</div>
                              <div className="mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                            </div>
                            <hr className="h-[1px] bg-gray-300 "/>
                    
                            <div className=" flex items-center px-3 gap-5  h-[70px] ">
                              <div className="flex gap-2 items-center" > <HiOutlineBookOpen className="text-blue-400 text-[20px]"/>6 Lesson</div>
                              <div className="flex gap-2 items-center" >  <HiOutlineClock className="text-blue-400 text-[20px]"/>6 Hours</div>
                            </div>

                        </div>
                    </div> 

                    <div className="flex flex-col h-[450px] w-[30%] bg-white rounded-lg shadow-shadow1">
                        <img className="rounded-t-lg" src="https://cdn.discordapp.com/attachments/1064852887823458386/1094902855053349004/image_1.png" 
                        />
                        <div className="  pt-6" >
                            <div  className=" px-3 ">
                              <div className="text-orange-500 font-body3">Course</div>
                              <div className="text-headline3 text-black font-body3">Service Design Essentials</div>
                              <div className="mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                            </div>
                            <hr className="h-[1px] bg-gray-300 "/>
                    
                            <div className=" flex items-center px-3 gap-5  h-[70px] ">
                              <div className="flex gap-2 items-center" > <HiOutlineBookOpen className="text-blue-400 text-[20px]"/>6 Lesson</div>
                              <div className="flex gap-2 items-center" >  <HiOutlineClock className="text-blue-400 text-[20px]"/>6 Hours</div>
                            </div>

                        </div>
                    </div> 

                    <div className="flex flex-col h-[450px] w-[30%] bg-white rounded-lg shadow-shadow1">
                        <img className="rounded-t-lg" src="https://cdn.discordapp.com/attachments/1064852887823458386/1094902855053349004/image_1.png" 
                        />
                        <div className="  pt-6" >
                            <div  className=" px-3 ">
                              <div className="text-orange-500 font-body3">Course</div>
                              <div className="text-headline3 text-black font-body3">Service Design Essentials</div>
                              <div className="mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                            </div>
                            <hr className="h-[1px] bg-gray-300 "/>
                    
                            <div className=" flex items-center px-3 gap-5  h-[70px] ">
                              <div className="flex gap-2 items-center" > <HiOutlineBookOpen className="text-blue-400 text-[20px]"/>6 Lesson</div>
                              <div className="flex gap-2 items-center" >  <HiOutlineClock className="text-blue-400 text-[20px]"/>6 Hours</div>
                            </div>

                        </div>
                    </div> 



 

                    



            


         



                    
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default OurCoursePage