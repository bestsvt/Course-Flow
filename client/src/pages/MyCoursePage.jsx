import {
  Text,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  Card,
  CardHeader,
  Flex,
  Box,
  CardBody,
  Image, 
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import { useAuth } from "../contexts/authentication";

function MyCoursePage() {
    const { isAuthenticated, userAuthState, logout } = useAuth();
    
  return (
      <div>
        <Navbar />
       <Flex flexDirection="column" alignItems="center">
        <Text color="black" fontSize="45px" my="70px">My Course</Text>
        <Tabs position="relative" variant="unstyled">
          <TabList >
            <Tab fontSize="24px">All Course</Tab>
            <Tab fontSize="24px">Inprogress</Tab>
            <Tab fontSize="24px">Completed</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />
        </Tabs>
        </Flex>
        
    <div className="flex gap-[2.75%] flex-wrap mt-[60px] mb-[40px] px-[10%]">
        <div className="sticky top-0 w-[30%] h-[450px] shadow-shadow1" >
            <Card  height="450px">
                <Flex flexDirection="column" alignItems="center">
                <CardHeader display="flex"
                            flexDirection="column"
                            alignItems="center">
                <Image
                            mt="20px"
                            boxSize='120px'
                            borderRadius='full'
                            alt='profile-image'
                            src={userAuthState.user.profile_image ? 
                            userAuthState.user.profile_image.url : 
                            './image/homepage/navbar/profile-image-default.jpg'
                            }
                        />
                <Text fontSize="30px" mt="30px">{userAuthState.user.full_name}</Text>
                </CardHeader>
                <CardBody>
                    <Flex gap="5" justifyContent="center" alignContent="center">
                        <Box bgColor="gray.200" width="132px" height="132px" borderRadius="8px" padding="20px">
                            <Text>Course Inprogress</Text>
                            <Text fontSize="30px" mt="10px">3</Text>
                        </Box>
                        <Box bgColor="gray.200" width="132px" height="132px" borderRadius="8px" padding="20px">
                            <Text>Course Complete</Text>
                            <Text fontSize="30px" mt="10px">2</Text>
                        </Box>
                    </Flex>
                </CardBody>
                </Flex>
            </Card>
        </div>
        <div className="flex flex-wrap w-[850px] justify-between">
          <div className="w-[48%]">
            <CourseCard />
          </div>
          <div className="w-[48%]">
            <CourseCard />
          </div>
          <div className="w-[48%]">
            <CourseCard />
          </div>
          <div className="w-[48%]">
            <CourseCard />
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
}
export default MyCoursePage;
