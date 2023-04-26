import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
  Image,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import { useAuth } from "../contexts/authentication";
import { useEffect, useState } from "react";
import axios from "axios";

function MyCoursePage() {
  const { userAuthState } = useAuth();
  const [myCourses, setMyCourses] = useState()
  const [totalInprogress, setTotalInprogress] = useState()
  const [totalComplete, setTotalComplete] = useState()

  useEffect(() => {
    async function getCourses() {
      const result = await axios.get(`http://localhost:4000/user/subscription?user=${userAuthState.user.id}`)
      setMyCourses(result.data.data)
      setTotalInprogress(result.data.data.filter(Course => Course.status == "inProgress").length)
      setTotalComplete(result.data.data.filter(Course => Course.status == "complete").length)
    }
    getCourses()
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center px-[10%] py-[5%] gap-12 bg-imag-userpage">
        <h1 className="mt-5 text-headline2 font-headline2 text-black">My Courses</h1>
        <Tabs position="relative" variant="unstyled" width="100%">
          <TabList justifyContent={"center"} gap={"16px"} border={"0px"}>
            <Tab fontSize="24px" textColor="black">
              All Courses
            </Tab>
            <Tab fontSize="24px" textColor="black" isDisabled={totalInprogress == 0 ? true : false}>
              Inprogress
            </Tab>
            <Tab fontSize="24px" textColor="black" isDisabled={totalComplete == 0 ? true : false}>
              Completed
            </Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="black"
            borderRadius="1px"
          />

          <div className="flex w-[100%] mt-12">
            {/* ————————————————————— Card Profile Section ————————————————————— */}
            <div className="w-[35%] flex flex-col items-center">
              <div className="w-[460px] flex flex-col justify-center items-center shadow-shadow1 rounded-xl gap-6 py-8 px-6 sticky top-5">
                <Image boxSize='140px' borderRadius='full' alt='profile-image' objectFit='cover'
                  src={userAuthState.user.profile_image ? userAuthState.user.profile_image.url : './image/homepage/navbar/profile-image-default.jpg'}
                />
                <h1 className="text-gray-800 text-headline3 font-headline3 w-full text-center">{userAuthState.user.full_name}</h1>
                <div className="flex justify-between w-full">
                  <div className="p-4 bg-gray-200 rounded-lg gap-6 flex flex-col w-[190px]">
                    <h1 className="text-body2 text-gray-700">Course<br />Inprogress</h1>
                    <h1 className="text-headline3 font-headline3 text-black">{totalInprogress}</h1>
                  </div>
                  <div className="p-4 bg-gray-200 rounded-lg gap-6 flex flex-col w-[190px]">
                    <h1 className="text-body2 text-gray-700">Course<br />Complete</h1>
                    <h1 className="text-headline3 font-headline3 text-black">{totalComplete}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[65%]">
              <TabPanels>

                <TabPanel padding={'0 25px'}>
                  {/* ————————————————————— All Course Section ————————————————————— */}
                  {myCourses?.length == 0 ? 
                  <div className="flex justify-center text-[50px] font-headline1 text-gray-700 p-10 mx-10 bg-gray-200 rounded-3xl">
                  You don't have any course.</div>
                  : 
                  <div className="flex justify-between flex-wrap">
                    {myCourses?.map((course, index) => {
                      return (
                        <div className="w-[460px] mb-[60px]" key={index}>
                          <CourseCard
                            name={course.courses.name}
                            summary={course.courses.course_summary}
                            image={course.courses.image_cover.url}
                            time={course.courses.total_learning_time}
                            id={course.courses.course_id}
                          />
                        </div>)})}
                  </div>}
                </TabPanel>
                <TabPanel padding={'0 25px'}>
                  {/* ————————————————————— Inprogress Section ————————————————————— */}
                  <div className="flex justify-between flex-wrap">
                    {myCourses?.filter(Course => Course.status == "inProgress").map((course, index) => {
                      return (
                        <div className="w-[460px] mb-[60px]" key={index}>
                          <CourseCard
                            name={course.courses.name}
                            summary={course.courses.course_summary}
                            image={course.courses.image_cover.url}
                            time={course.courses.total_learning_time}
                            id={course.courses.course_id}
                          />
                        </div>
                      )
                    })}
                  </div>
                </TabPanel>
                <TabPanel padding={'0 25px'}>
                  {/* ————————————————————— Completed Section ————————————————————— */}
                  <div className="flex justify-between flex-wrap">
                    {myCourses?.filter(Course => Course.status == "complete").map((course, index) => {
                      return (
                        <div className="w-[460px] mb-[60px]" key={index}>
                          <CourseCard
                            name={course.courses.name}
                            summary={course.courses.course_summary}
                            image={course.courses.image_cover.url}
                            time={course.courses.total_learning_time}
                            id={course.courses.course_id}
                          />
                        </div>
                      )
                    })}
                  </div>
                </TabPanel>
              </TabPanels>
            </div>
          </div>
        </Tabs>
      </div>

      <Footer />
    </>
  );
}
export default MyCoursePage;
