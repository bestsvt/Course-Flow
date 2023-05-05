import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    TabIndicator,
    Spinner
  } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AssignmentCard from "../components/AssignmentCard";
import axios from "axios";
import { useAuth } from "../contexts/authentication";
import { useEffect, useState } from "react";

function MyAssignmentPage() {
  const { userAuthState } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function getAssignments() {
    setIsLoading(true)
    const result = await axios.get(`http://localhost:4000/assignments?user=${userAuthState.user.id}`);
    setAssignments(result.data.data)
    setIsLoading(false)
  }
  useEffect(() => {
    getAssignments()
    setStatus('')
  }, [status]);

  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center px-[10%] py-[5%] gap-12 bg-imag-userpage">
        <h1 className="mt-5 text-headline2 font-headline2 text-black">My Assignment</h1>
        <Tabs position="relative" variant="unstyled" width="100%">
          <TabList justifyContent={"center"} gap={"16px"} border={"0px"}>
            <Tab fontSize="24px" textColor="black" isDisabled={assignments?.length == 0 ? true : false}>
              All 
            </Tab>
            {/* Check status Length if != 0 not disable / if = 0 disable */}
            <Tab fontSize="24px" textColor="black" isDisabled={assignments?.filter((assignment)=>{return assignment.status == 'pending'}).length == 0 ? true : false}>
              Pending
            </Tab>
            {/* Check status Length if != 0 not disable / if = 0 disable */}
            <Tab fontSize="24px" textColor="black" isDisabled={assignments?.filter((assignment)=>{return assignment.status == 'inProgress'}).length == 0 ? true : false}>
              In progress
            </Tab>
            {/* Check status Length if != 0 not disable / if = 0 disable */}
            <Tab fontSize="24px" textColor="black" isDisabled={assignments?.filter((assignment)=>{return assignment.status == 'submitted' || assignment.status == 'submitted late'}).length == 0 ? true : false}>
              Submitted 
            </Tab>
            {/* Check status Length if != 0 not disable / if = 0 disable */}
            <Tab fontSize="24px" textColor="black" isDisabled={assignments?.filter((assignment)=>{return assignment.status == 'overdue'}).length == 0 ? true : false}>
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
            {isLoading ? 
            <div className="w-full flex justify-center items-center p-10">
              <Spinner
                thickness="5px"
                speed="0.5s"
                emptyColor="gray.200"
                color="blue.500"
                width={100}
                height={100}
              />
            </div>
            :
            <TabPanels>
              {/* ————————————————————— All Section ————————————————————— */}
              <TabPanel padding={0}>
                <div className="flex flex-col items-center gap-6 ">
                  {assignments.map((assignment,index)=>{
                    return (
                      <AssignmentCard key={index}
                      courseName={assignment.course_name}
                      lessonName={assignment.lesson_name}
                      subLessonName={assignment.sub_lesson_name}
                      assignmentStatus={assignment.status}
                      question={assignment.question}
                      answer={assignment.answer}
                      duration={assignment.duration}
                      courseId={assignment.course_id}
                      subLessonId={assignment.sub_lesson_id}
                      createdAt={assignment.created_at}
                      countDeadline={assignment.countDeadline}
                      assignmentId={assignment.assignment_id}
                      status={status}
                      setStatus={setStatus}
                      />
                    )
                  })}
                </div>
              </TabPanel>
              {/* ————————————————————— Pending Section ————————————————————— */}
              <TabPanel padding={0}>
                <div className="flex flex-col items-center gap-6 ">
                {assignments.filter((assignment)=>{
                  return assignment.status == 'pending'
                }).map((assignment,index)=>{
                    return (
                      <AssignmentCard key={index}
                      courseName={assignment.course_name}
                      lessonName={assignment.lesson_name}
                      subLessonName={assignment.sub_lesson_name}
                      assignmentStatus={assignment.status}
                      question={assignment.question}
                      answer={assignment.answer}
                      duration={assignment.duration}
                      courseId={assignment.course_id}
                      subLessonId={assignment.sub_lesson_id}
                      createdAt={assignment.created_at}
                      countDeadline={assignment.countDeadline}
                      assignmentId={assignment.assignment_id}
                      status={status}
                      setStatus={setStatus}
                      />
                    )
                  })}
                </div>
              </TabPanel>
              {/* ————————————————————— In progress Section ————————————————————— */}
              <TabPanel padding={0}>
                <div className="flex flex-col items-center gap-6 ">
                {assignments.filter((assignment)=>{
                  return assignment.status == 'inProgress'
                }).map((assignment,index)=>{
                    return (
                      <AssignmentCard key={index}
                      courseName={assignment.course_name}
                      lessonName={assignment.lesson_name}
                      subLessonName={assignment.sub_lesson_name}
                      assignmentStatus={assignment.status}
                      question={assignment.question}
                      answer={assignment.answer}
                      duration={assignment.duration}
                      courseId={assignment.course_id}
                      subLessonId={assignment.sub_lesson_id}
                      createdAt={assignment.created_at}
                      countDeadline={assignment.countDeadline}
                      assignmentId={assignment.assignment_id}
                      status={status}
                      setStatus={setStatus}
                      />
                    )
                  })}
                </div>
              </TabPanel>
              {/* ————————————————————— Submitted Section ————————————————————— */}
              <TabPanel padding={0}>
                <div className="flex flex-col items-center gap-6 ">
                {assignments.filter((assignment)=>{
                  return assignment.status == 'submitted' || assignment.status == 'submitted late'
                }).map((assignment,index)=>{
                    return (
                      <AssignmentCard key={index}
                      courseName={assignment.course_name}
                      lessonName={assignment.lesson_name}
                      subLessonName={assignment.sub_lesson_name}
                      assignmentStatus={assignment.status}
                      question={assignment.question}
                      answer={assignment.answer}
                      duration={assignment.duration}
                      courseId={assignment.course_id}
                      subLessonId={assignment.sub_lesson_id}
                      createdAt={assignment.created_at}
                      countDeadline={assignment.countDeadline}
                      assignmentId={assignment.assignment_id}
                      status={status}
                      setStatus={setStatus}
                      />
                    )
                  })}
                </div>
              </TabPanel>
              {/* ————————————————————— Overdue Section ————————————————————— */}
              <TabPanel padding={0}>
                <div className="flex flex-col items-center gap-6 ">
                {assignments.filter((assignment)=>{
                  return assignment.status == 'overdue'
                }).map((assignment,index)=>{
                    return (
                      <AssignmentCard key={index}
                      courseName={assignment.course_name}
                      lessonName={assignment.lesson_name}
                      subLessonName={assignment.sub_lesson_name}
                      assignmentStatus={assignment.status}
                      question={assignment.question}
                      answer={assignment.answer}
                      duration={assignment.duration}
                      courseId={assignment.course_id}
                      subLessonId={assignment.sub_lesson_id}
                      createdAt={assignment.created_at}
                      countDeadline={assignment.countDeadline}
                      assignmentId={assignment.assignment_id}
                      status={status}
                      setStatus={setStatus}
                      />
                    )
                  })}
                </div>
              </TabPanel>
            </TabPanels>
          }
          </div>
          
        </Tabs>
      </section>
      
      <Footer />
    </>
  );
}

export default MyAssignmentPage;
  