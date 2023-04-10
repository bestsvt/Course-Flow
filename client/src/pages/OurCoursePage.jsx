import Navbar from "../components/Navbar"
import SubFooter from "../components/SubFooter"
import Footer from "../components/Footer"
import CourseCard from "../components/CourseCard"
import { CiSearch } from "react-icons/ci"
import {
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/authentication"


function OurCoursePage() {
  const { isAuthenticated } = useAuth();
    return (
        <>
        <Navbar/>
        <div className="px-[10%] py-24 bg-imag-userpage">
            <div className="flex flex-col gap-10 items-center">
                <div className="text-headline2 font-headline2 text-black mb-5">Our Courses</div>
                <InputGroup width='30%'>
                  <Input
                    variant="normal"
                    id="password"
                    placeholder="Search..."
                    type="text"
                  />
                  <InputRightElement margin="4px">
                    <CiSearch/>
                  </InputRightElement>
                </InputGroup>
                <div className="flex flex-wrap gap-[5%] mb-[100px]">
                  {/* wait data from Database then using Map fucntion to show course */}
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                </div>
            </div>
        </div>
        {isAuthenticated ? null : <SubFooter/>}
        <Footer/>
        </>
    )
}

export default OurCoursePage