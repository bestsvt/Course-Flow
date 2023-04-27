import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import {
  Button,
  Link,
  Progress,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Badge,
  Spinner,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import useCourses from "../hooks/useCourses";
import axios from "axios";

function CourseLearningPage() {
  const { userAuthState } = useAuth();
  const {
    course,
    isLoading,
    getCoursesById,
    getSubLessonById,
    postLearningSublessonAndCreateAssignment,
    getCoursesByIdWithOutLoading,
    getSubLessonByIdWithOutLoading
  } = useCourses();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState();
  const [assignment, setAssignment] = useState();
  const [courselesson, setCourselesson] = useState();
  const [indexLesson, setIndexLesson] = useState();
  const [progress, setProgress] = useState();
  const [status, setStatus] = useState();
  const [answer, setAnswer] = useState();
  const [sendIsLoading, setSendIsLoading] = useState(false);
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [pauseTime, setPauseTime] = useState();
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  // Function get sub lesson to show name and video
  async function getSubLesson() {
    const result = await getSubLessonById(userAuthState.user.id);
    setLesson(result.data[0]);
    setAssignment(result.assignment.assignments[0])
    setAnswer(result.assignment.assignments[0].users_assignments[0]?.answer);
  }

  // This function work when click (Play Video)
  async function handlePlayVideo(event) {
    if (lesson.users_sub_lessons.length == 0) {
      postLearningSublessonAndCreateAssignment(
        {
          status: "inProgress",
          current_time: event.target.currentTime,
          action: "play",
        },
        lesson.sub_lesson_id,
        userAuthState.user.id
      );
      setStatus("Video In-progress")
    }
  }

  // This function work every time video play (to save time that play until end)
  async function handleTimeUpdate(event) {
      setPauseTime(event.target.currentTime)
  }
  
  // This function work when video end
  async function handleEndVideo(event) {
    createAssignments()
    postLearningSublessonAndCreateAssignment(
      {
        status: "watched",
        current_time: event.target.currentTime,
        action: "end",
      },
      lesson.sub_lesson_id,
      userAuthState.user.id
    );
    setStatus("Video End")
  }

  // This function set start time video
  async function handleLoadedMetadata(event) {
    event.target.currentTime = lesson?.users_sub_lessons[0]?.current_time || 0;
    if (lesson?.users_sub_lessons[0]?.current_time >= event.target.duration) {
      event.target.currentTime = 0
    }
  }

  // fetch data when click sublesson / refresh
  useEffect(() => {
    async function fetch() {
      const result = await getCoursesById(userAuthState.user.id);
      setCourselesson(result.data.allLessons)
      setProgress(Math.round(result.data.totalProgress))
      await getSubLesson();
    }
    if (pauseTime !== lesson?.users_sub_lessons[0]?.current_time && pauseTime !== 0) {
      postLearningSublessonAndCreateAssignment(
        {
          current_time: pauseTime,
          action: "pause",
        },
        lesson.sub_lesson_id,
        userAuthState.user.id
      );
      setPauseTime()
    }
    fetch();
  }, [navigate]);

  useEffect(() => {
    navigateLesson()
  }, [lesson]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (pauseTime !== lesson?.users_sub_lessons[0]?.current_time && pauseTime !== 0) {
        postLearningSublessonAndCreateAssignment(
          {
            current_time: pauseTime,
            action: "pause",
          },
          lesson.sub_lesson_id,
          userAuthState.user.id
        );
        setPauseTime();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pauseTime]);

  useEffect(() => {
    async function fetch() {
      const result = await getCoursesByIdWithOutLoading(userAuthState.user.id);
      setCourselesson(result.data.allLessons)
      setProgress(Math.round(result.data.totalProgress))
      setStatus()
      const results = await getSubLessonByIdWithOutLoading(userAuthState.user.id);
      setAssignment(results.assignment.assignments[0])
      setAnswer(results.assignment.assignments[0].users_assignments[0]?.answer);
    }
    fetch();
    setSaveIsLoading(false)
  }, [status]);

  // Function for button previous and next lesson
  function navigateLesson() {
    const currentLessonIndex = courselesson?.findIndex(
      (courselesson) =>
        courselesson.lesson_id === lesson?.lesson_id &&
        courselesson.sub_lesson_id === lesson?.sub_lesson_id
    )
    setIndexLesson(currentLessonIndex)
  }

  // Function for create assignment
  async function createAssignments() {
    await postLearningSublessonAndCreateAssignment(
      { action: "create" },
      lesson.sub_lesson_id,
      userAuthState.user.id
    );
  }

  // Function Save draft answer
  async function handleSaveDraft() {
    if (answer == null) {
      toast({
        title: "You haven't typed anything. Please enter your answer before saving as a draft.",
        isClosable: true,
        position: 'top',
        status: 'error',
        duration: 5000
      })
    } else {
      const result = await axios.put(`http://localhost:4000/assignments/${assignment.assignment_id}/save?user=${userAuthState.user.id}`,
      {answer: answer},
      );
      toast({
        title: result.data.message,
        isClosable: true,
        position: 'top',
        status: 'success',
        colorScheme: "blue",
        duration: 5000
      })
      setStatus("Save Draft Assignment")
    }
    setSaveIsLoading(false)
  }

  // Function send answer
  async function handleSubmitAssignment() {
    if (answer == null) {
      toast({
        title: "You haven't typed anything. Please enter your answer before submitting.",
        isClosable: true,
        position: 'top',
        status: 'error',
        duration: 5000
      })
    } else {
    const result = await axios.put(`http://localhost:4000/assignments/${assignment.assignment_id}/submit?user=${userAuthState.user.id}`, 
    { 
      answer: answer,
      subLessonId: lesson.sub_lesson_id
    }
    );
    toast({
      title: result.data.message,
      isClosable: true,
      position: 'top',
      status: 'success',
      colorScheme: "blue",
      duration: 5000
    })
    setStatus("Submit Assignment")
    }
    onClose()
    setSendIsLoading(false)
  }

  return (
    <>
      <Navbar />
      <section className="px-[10%] py-[5%] flex justify-center gap-[2%]">
        {/* ———————— Left Section ———————— */}
        <div className="shadow-shadow1 w-[30%] flex flex-col gap-6 px-6 py-8 overflow-y-scroll hide-scroll h-[850px] rounded-lg ">
          <div className="text-orange-500 font-body3 mb-4">Course</div>
          {/* Course Deatil */}
          <div className="flex flex-col gap-2">
            <div className="text-headline3 font-headline3 text-black">
              {course?.name}
            </div>
            <div className="text-body2 font-body2 text-gray-700">
              {course?.course_summary}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-body3 font-body3 text-gray-700">
              {progress}% Complete
            </div>
            <Progress
              borderRadius='99px'
              bg='#E4E6ED'
              value={progress}
            />
          </div>
          <Accordion allowMultiple>
            {course?.lessons.map((lessons, index) => {
              return (
                <AccordionItem borderTop="none" key={index}>
                  <AccordionButton paddingBottom={0}>
                    <Box as="span" flex="1" textAlign="left" padding="16px 0">
                      <div className="flex gap-4">
                        <h1 className="text-headline3 font-headline3 text-gray-700">
                          0{index + 1}
                        </h1>
                        <h1 className="text-headline3 font-headline3 text-black">
                          {lessons.name}
                        </h1>
                      </div>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel paddingTop="8px">
                    <ul className="text-body2 font-body2 text-gray-700">
                      {lessons.sub_lessons
                        .sort((a, b) => a.sub_lesson_id - b.sub_lesson_id)
                        .map((sub_lesson, index) => {
                          return (
                            <li
                              className={sub_lesson.sub_lesson_id === lesson?.sub_lesson_id ?
                              "flex items-center px-2 py-3 gap-4 rounded-lg bg-gray-300 hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300" :
                              "flex items-center px-2 py-3 gap-4 rounded-lg hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300"}
                              key={index}
                              onClick={() => {
                                navigate(
                                  `/courses/${course.course_id}/learning/${sub_lesson.sub_lesson_id}`
                                );
                              }}
                            >
                              {sub_lesson.users_sub_lessons[0]?.status === "complete" ?
                              <img
                                src="/image/icon/complete.png"
                                alt="icon-status"
                                className="w-[18px] h-[18px]"
                              />
                              : 
                              sub_lesson.users_sub_lessons[0]?.status === "watched" || 
                              sub_lesson.users_sub_lessons[0]?.status === "inProgress" ?
                              <img
                                src="/image/icon/watched.png"
                                alt="icon-status"
                                className="w-[18px] h-[18px]"
                              />
                              :
                              <img
                                src="/image/icon/no-watch.png"
                                alt="icon-status"
                                className="w-[18px] h-[18px]"
                              />
                              }
                              <p>{sub_lesson.name}</p>
                            </li>
                          );
                        })}
                    </ul>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* ———————— Right Section ———————— */}
        {isLoading ? (
          <div className="w-[68%] flex justify-center items-center">
            <Spinner
              thickness="5px"
              speed="0.5s"
              emptyColor="gray.200"
              color="blue.500"
              width={100}
              height={100}
            />
          </div>
        ) : (
          <div className="w-[68%] flex flex-col gap-8">
            <div className="text-headline2 font-headline2 text-black">
              {lesson?.name}
            </div>
            {/* ———————— Video Section ———————— */}
            <video
              src={lesson?.video.url}
              controls
              className="rounded-lg w-[100%] mb-[50px]"
              onPlay={handlePlayVideo}
              onEnded={handleEndVideo}
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
            />

            {/* ———————— Assignment Card ———————— */}
            {assignment?.users_assignments.length > 0 ?
            <div className="bg-blue-100 w-full rounded-lg flex flex-col p-6 gap-[25px]">
              <div className="flex justify-between">
                <p className="text-body1 font-body1 text-black">Assignment</p>
                <Badge variant={assignment?.users_assignments[0].status}>
                  {(assignment?.users_assignments[0].status) == 'inProgress' ? 'In Progress' : assignment?.users_assignments[0].status}
                </Badge>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-black text-body2 font-body2">{assignment?.question}</p>
                {assignment?.users_assignments[0].status == 'submitted' ||
                assignment?.users_assignments[0].status == 'submitted late' ? 
                <p className="text-body2 font-body2 text-gray-700 leading-body2">{assignment?.users_assignments[0].answer}</p> 
                : 
                <textarea
                  name="answer-assignment"
                  id="answer-assignment"
                  cols="30"
                  rows="10"
                  placeholder="Answer..."
                  className="w-full h-[100px] resize-none hide-scroll p-3 rounded-lg border border-gray-400 outline-none"
                  value={answer ? answer : ''}
                  onChange={(e) => setAnswer(e.target.value)}
                ></textarea>}
                
              </div>

              {assignment?.users_assignments[0].status == 'submitted' ||
                assignment?.users_assignments[0].status == 'submitted late' ? null :
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-6 ">
                  <Button 
                  variant="primary" 
                  onClick={()=>{setSendIsLoading(true); onOpen()}}
                  isLoading={sendIsLoading}
                  loadingText='Submitting'>
                      Send Assignment
                  </Button>
                  <Button 
                  variant="draft" 
                  onClick={()=>{setSaveIsLoading(true); handleSaveDraft()}}
                  isLoading={saveIsLoading}
                  loadingText='Saving'>
                      Save as draft
                  </Button>
                  <Button 
                  variant="draft" 
                  onClick={()=>{console.log(pauseTime)}}>
                      Check
                  </Button>
                  <Button 
                  variant="draft" 
                  onClick={()=>{console.log(lesson?.users_sub_lessons[0]?.current_time)}}>
                      Check2
                  </Button>
                </div>
                {assignment?.countDeadline < 1 ? 
                <p className="text-red-600">Missing</p>
                : 
                <p className="text-gray-700">Assign within {assignment?.countDeadline == '1' ? `${assignment?.countDeadline} day` : `${assignment?.countDeadline} days`}</p>
                }
              </div>
              }
            </div> : null}
            <AlertDialog
              motionPreset='slideInBottom'
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />
              <AlertDialogContent borderRadius={24}>
                <AlertDialogHeader className="text-body1 font-body1 text-black" >
                  Confirmation
                </AlertDialogHeader>
                <hr className="h-[1px] bg-gray-300 mb-3" />
                <AlertDialogCloseButton onClick={()=>{setSendIsLoading(false)}}/>
                <AlertDialogBody className="text-body2 font-body2 text-gray-700">
                Are you sure you want to send this assignment? Once it's sent, you won't be able to make any changes.
                </AlertDialogBody>
                <AlertDialogFooter gap={3}>
                  <Button variant="secondary" ref={cancelRef} onClick={()=>{onClose();setSendIsLoading(false)}}>Cancel</Button>
                  <Button variant="primary" onClick={()=>{handleSubmitAssignment()}}>Send Assignment</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </section>

      {/* ———————— Button (Next - Previous) ———————— */}
      <section className="flex justify-between items-center px-16 py-5 shadow-shadow1 h-[100px]">
        <div>
          {indexLesson === 0 ?
            <p className="font-bold hover:cursor-not-allowed text-gray-500">Previous Lesson</p>
            :
            <Link
              onClick={() => { navigate(`/courses/${course.course_id}/learning/${courselesson[indexLesson - 1].sub_lesson_id}`) }}
            >Previous Lesson</Link>
          }
        </div>

        <div>
          {indexLesson === courselesson?.length - 1 ?
            <Button variant="primary" isDisabled>Next Lesson</Button>
            :
            <Button variant="primary"
              onClick={() => { navigate(`/courses/${course.course_id}/learning/${courselesson[indexLesson + 1].sub_lesson_id}`) }}
            >Next Lesson</Button>
          }
        </div>
      </section>
      <Footer />
    </>
  );
}

export default CourseLearningPage;
