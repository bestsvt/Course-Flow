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
  import { useAuth } from "../contexts/authentication";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import AssignmentCard from "../components/AssignmentCard";
  
  function MyAssignmentPage() {
    const { userAuthState } = useAuth();
    const [myAssignment, setMyAssignment] = useState()
    const [totalInprogress, setTotalInprogress] = useState()
    const [totalComplete, setTotalComplete] = useState()
    const [totalPending, setTotalPending] = useState()
  
    // useEffect(() => {
    //   async function getCourses() {
    //     const result = await axios.get(`http://localhost:4000/user/subscription?user=${userAuthState.user.id}`)
    //     setMyCourses(result.data.data)
    //     setTotalInprogress(result.data.data.filter(Course => Course.status == "inProgress").length)
    //     setTotalComplete(result.data.data.filter(Course => Course.status == "complete").length)
    //   }
    //   getCourses()
    // }, []);
  
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center px-[10%] py-[5%] gap-12 bg-imag-userpage">
          <h1 className="mt-5 text-headline2 font-headline2 text-black">My Assignment</h1>
          <Tabs position="relative" variant="unstyled" width="100%">
            <TabList justifyContent={"center"} gap={"16px"} border={"0px"}>
            <Tab fontSize="24px" textColor="black" >
              All 
            </Tab>
            {/* Style in config when not select / hover .. */}
            {totalPending == 0 ?
            <Tab fontSize="24px" textColor="black" isDisabled>
              Pending
            </Tab>
            :
            <Tab fontSize="24px" textColor="black" >
              Pending
            </Tab>
            }
            <Tab fontSize="24px" textColor="black" isDisabled>
              In progress
            </Tab>
            <Tab fontSize="24px" textColor="black" isDisabled>
              Submitted 
            </Tab>
            <Tab fontSize="24px" textColor="black" isDisabled>
              Overdue
            </Tab>
              
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="black"
              borderRadius="1px"
            />
  
              <div className="w-[100%] mt-16 ">
                <TabPanels>
  
                  <TabPanel padding={'0 25px'}>
                    {/* ————————————————————— All Section ————————————————————— */}
                         
                    <div className="flex flex-col items-center gap-6 ">
                      <AssignmentCard/>
                      <AssignmentCard/>
                      <AssignmentCard/>
                    
                    </div>
                  </TabPanel>

                  <TabPanel padding={'0 25px'}>
                    {/* ————————————————————— Pending Section ————————————————————— */}
                    <div className="flex flex-col items-center gap-6 ">

                    </div>
                  </TabPanel>

                  <TabPanel padding={'0 25px'}>
                    {/* ————————————————————— In progress Section ————————————————————— */}
                    <div className="flex flex-col items-center gap-6 ">

                    </div>
                  </TabPanel>

                                    <TabPanel padding={'0 25px'}>
                    {/* ————————————————————— Submitted Section ————————————————————— */}
                    <div className="flex flex-col items-center gap-6 ">

                    </div>
                  </TabPanel>

                                    <TabPanel padding={'0 25px'}>
                    {/* ————————————————————— Overdue Section ————————————————————— */}
                    <div className="flex flex-col items-center gap-6 ">

                    </div>
                  </TabPanel>
                </TabPanels>
              </div>
            
          </Tabs>
        </div>
        
        <Footer />
      </>
    );
  }
  export default MyAssignmentPage;
  