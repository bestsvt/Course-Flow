import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    TabIndicator,
  } from "@chakra-ui/react";
  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";
  import AssignmentCard from "../components/AssignmentCard";
  
  function MyAssignmentPage() {

    return (
      <>
        <Navbar />
        <section className="flex flex-col items-center px-[10%] py-[5%] gap-12 bg-imag-userpage">
          <h1 className="mt-5 text-headline2 font-headline2 text-black">My Assignment</h1>
          <Tabs position="relative" variant="unstyled" width="100%">
            <TabList justifyContent={"center"} gap={"16px"} border={"0px"}>

              <Tab fontSize="24px" textColor="black" >
                All 
              </Tab>

              {/* Check status Length if != 0 not disable / if = 0 disable */}
              <Tab fontSize="24px" textColor="black" >
                Pending
              </Tab>

              {/* Check status Length if != 0 not disable / if = 0 disable */}
              <Tab fontSize="24px" textColor="black" >
                In progress
              </Tab>

              {/* Check status Length if != 0 not disable / if = 0 disable */}
              <Tab fontSize="24px" textColor="black" >
                Submitted 
              </Tab>

              {/* Check status Length if != 0 not disable / if = 0 disable */}
              <Tab fontSize="24px" textColor="black" >
                Overdue
              </Tab>

            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="black"
              borderRadius="1px"
            />
  
            <div className="w-[100%] mt-10">
              <TabPanels>

                {/* ————————————————————— All Section ————————————————————— */}
                <TabPanel padding={0}>
                  {/* add logic if assignment count = 0 */}
                  <div className="flex flex-col items-center gap-6 ">
                    <AssignmentCard/>
                    <AssignmentCard/>
                    <AssignmentCard/>
                  </div>
                </TabPanel>

                {/* ————————————————————— Pending Section ————————————————————— */}
                <TabPanel padding={0}>
                  <div className="flex flex-col items-center gap-6 ">
                    <AssignmentCard/>
                  </div>
                </TabPanel>

                {/* ————————————————————— In progress Section ————————————————————— */}
                <TabPanel padding={0}>
                  <div className="flex flex-col items-center gap-6 ">
                    <AssignmentCard/>
                  </div>
                </TabPanel>

                {/* ————————————————————— Submitted Section ————————————————————— */}
                <TabPanel padding={0}>
                  <div className="flex flex-col items-center gap-6 ">
                    <AssignmentCard/>
                  </div>
                </TabPanel>

                {/* ————————————————————— Overdue Section ————————————————————— */}
                <TabPanel padding={0}>
                  <div className="flex flex-col items-center gap-6 ">
                    <AssignmentCard/>
                  </div>
                </TabPanel>

              </TabPanels>
            </div>
            
          </Tabs>
        </section>
        
        <Footer />
      </>
    );
  }
  export default MyAssignmentPage;
  