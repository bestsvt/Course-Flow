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

function MyCoursePage() {
    const { userAuthState } = useAuth();
    
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
            {/* Style in config when not select / hover .. */}
            <Tab fontSize="24px" textColor="black">
              Inprogress
            </Tab>
            <Tab fontSize="24px" textColor="black" >
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
                    <h1 className="text-body2 text-gray-700">Course<br/>Inprogress</h1>
                    <h1 className="text-headline3 font-headline3 text-black">3</h1>
                  </div>
                  <div className="p-4 bg-gray-200 rounded-lg gap-6 flex flex-col w-[190px]">
                    <h1 className="text-body2 text-gray-700">Course<br/>Complete</h1>
                    <h1 className="text-headline3 font-headline3 text-black">2</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[65%]">
              <TabPanels>
                <TabPanel padding={'0 25px'}>
                  {/* ————————————————————— All Course Section ————————————————————— */}
                  {/* waiting for map data all course that user subscribe */}
                  <div className="flex justify-between flex-wrap">
                    <div className="w-[460px] mb-[60px]">
                      <CourseCard />
                    </div>
                    <div className="w-[460px] mb-[60px]">
                      <CourseCard />
                    </div>
                    <div className="w-[460px] mb-[60px]">
                      <CourseCard />
                    </div>
                    <div className="w-[460px] mb-[60px]">
                      <CourseCard />
                    </div>
                    <div className="w-[460px] mb-[60px]">
                      <CourseCard />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel padding={'0 25px'}>
                  {/* ————————————————————— Inprogress Section ————————————————————— */}
                  {/* waiting for map data all course that user subscribe and not completed */}
                  <div className="flex justify-between flex-wrap">
                    <div className="w-[460px] mb-[60px]">
                      <CourseCard />
                    </div>
                    <div className="w-[460px] mb-[60px]">
                      <CourseCard />
                    </div>
                    <div className="w-[460px] mb-[60px]">
                      <CourseCard />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel padding={'0 25px'}>
                  {/* ————————————————————— Completed Section ————————————————————— */}
                  {/* waiting for map data all course that user subscribe and completed */}
                  <div className="flex justify-between flex-wrap">
                    <div className="w-[460px] mb-[60px]">
                      <CourseCard />
                    </div>
                    <div className="w-[460px] mb-[60px]">
                      <CourseCard />
                    </div>
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
