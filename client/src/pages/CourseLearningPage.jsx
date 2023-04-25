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
} from "@chakra-ui/react";
import useCourses from "../hooks/useCourses";

function CourseLearningPage() {
  const { userAuthState } = useAuth();
  const {
    course,
    isLoading,
    getCoursesById,
    getSubLessonById,
    postLearningSublessonAndCreateAssignment,
    getCoursesByIdWithOutLoading,
    getSubLessonByIdWithOutLoading,
    postSubmittedAssignments
  } = useCourses();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState();
  const [assignment, setAssignment] = useState();
  const [courselesson, setCourselesson] = useState();
  const [indexLesson, setIndexLesson] = useState();
  const [progress, setProgress] = useState();
  const [videoStatus, setVideoStatus] = useState();
  const [answer, setAnswer] = useState();

  // Function get sub lesson to show name and video
  async function getSubLesson() {
    const result = await getSubLessonById(userAuthState.user.id);
    setLesson(result.data[0]);
    setAssignment(result.assignment.assignments[0])
  }

  // This function work when click (Play Video)
  async function handlePlayVideo(event) {
    postLearningSublessonAndCreateAssignment(
      {
        status: "inProgress",
        current_time: event.target.currentTime,
        action: "play",
      },
      lesson.sub_lesson_id,
      userAuthState.user.id
    );
    setVideoStatus("in progress")
  }


  // This function work when click (Pause Video)
  async function handlePauseVideo(event) {
    if (event.target.currentTime !== event.target.duration) {
      postLearningSublessonAndCreateAssignment(
        {
          current_time: event.target.currentTime,
          action: "pause",
        },
        lesson.sub_lesson_id,
        userAuthState.user.id
      );
    }
  }

  // This function work when video end
  async function handleEndVideo(event) {
    createAssignments()
    postLearningSublessonAndCreateAssignment(
      {
        status: "complete",
        current_time: event.target.currentTime,
        action: "end",
      },
      lesson.sub_lesson_id,
      userAuthState.user.id
    );
    setVideoStatus("complete")
  }

  // This function set start time video
  async function handleLoadedMetadata(event) {
    event.target.currentTime = lesson?.users_sub_lessons[0]?.current_time || 0;
  }

  // fetch data when click sublesson / refresh
  useEffect(() => {
    async function getCourses() {
      const result = await getCoursesById(userAuthState.user.id);
      setCourselesson(result.data.allLessons)
      setProgress(Math.round(result.data.totalProgress))
      await getSubLesson();
    }
    getCourses();
  }, [navigate]);

  useEffect(() => {
    navigateLesson()
  }, [lesson]);

  useEffect(() => {
    async function fetch() {
      const result = await getCoursesByIdWithOutLoading(userAuthState.user.id);
      setCourselesson(result.data.allLessons)
      setProgress(Math.round(result.data.totalProgress))
      setVideoStatus()
      const results = await getSubLessonByIdWithOutLoading(userAuthState.user.id);
      setAssignment(results.assignment.assignments[0])
    }
    fetch();
  }, [videoStatus]);

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

  async function submitAssignments() {
    await postSubmittedAssignments(
      {
        status: "submitted",
        action: "submit",
        answer: answer,
        submitted_time: new Date()
      },
      assignment.assignment_id,
      userAuthState.user.id
    )
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
              onPause={handlePauseVideo}
              onEnded={handleEndVideo}
              onLoadedMetadata={handleLoadedMetadata}
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
                  {assignment?.users_assignments[0].status == 'submitted' ?
                    <p className="text-body2 font-body2 text-gray-700 leading-body2">{assignment?.users_assignments[0].answer}</p>
                    :
                    <textarea
                      onChange={(event) => { setAnswer(event.target.value) }}
                      name="answer-assignment"
                      id="answer-assignment"
                      cols="30"
                      rows="10"
                      placeholder="Answer..."
                      className="w-full h-[100px] resize-none hide-scroll p-3 rounded-lg border border-gray-400 outline-none"
                    ></textarea>}

                </div>

                {assignment?.users_assignments[0].status == 'submitted' ? null :
                  <div className="flex justify-between items-center">
                    <Button variant="primary" onClick={submitAssignments}>
                      Send Assignment
                    </Button>
                    {assignment?.countDeadline < 1 ?
                      <p className="text-red-600">Missing</p>
                      :
                      <p className="text-gray-700">Assign within {assignment?.countDeadline == '1' ? `${assignment?.countDeadline} day` : `${assignment?.countDeadline} days`}</p>
                    }
                  </div>
                }


              </div> : null}
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
