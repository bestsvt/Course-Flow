import { Button , Badge , Link, useDisclosure, useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,} from "@chakra-ui/react"; 
import React , { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import axios from "axios";

function AssignmentCard(props) {

  const { userAuthState } = useAuth();
  const [answer, setAnswer] = useState(props.answer);
  const [sendIsLoading, setSendIsLoading] = useState(false);
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const cancelRef = React.useRef()
  const navigate = useNavigate();

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
      const result = await axios.put(`http://localhost:4000/assignments/${props.assignmentId}/save?user=${userAuthState.user.id}`,
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
      props.setStatus("Save Draft Assignment")
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
    const result = await axios.put(`http://localhost:4000/assignments/${props.assignmentId}/submit?user=${userAuthState.user.id}`, 
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
    props.setStatus("Submit Assignment")
    }
    onClose()
    setSendIsLoading(false)
  }

  return (
      <section className="flex flex-col bg-blue-100 rounded-lg px-24 py-10 gap-9 w-full">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="text-headline3 font-headline3 text-black">
              Course: {props.courseName}
            </h1>
            <Badge variant={props.assignmentStatus}>
              {props.assignmentStatus == 'inProgress' ? 'In Progress' : props.assignmentStatus}
            </Badge>
          </div>

          <div className="flex justify-between text-body2 font-body2 text-gray-700">
            <h1>
              {props.lessonName}: {props.subLessonName}
            </h1>
            {props.assignmentStatus == 'submitted' || 
            props.assignmentStatus == 'submitted late' 
            ? null :
            props.countDeadline < 1 ? 
            <p className="text-red-600 font-bold">Missing</p>
            : 
            <p className="text-gray-700">Assign within {props.countDeadline == '1' ? `${props.countDeadline} day` : `${props.countDeadline} days`}</p>
            }
          </div>
        </div>

        <div className="flex flex-row justify-between rounded-lg bg-white p-6 gap-[5%] w-[100%]">
            <div className="flex flex-col gap-1 w-[80%]">
              <h1 className="text-body2 font-body2 text-black">
                {props.question}
              </h1>
              {props.assignmentStatus == 'submitted' || props.assignmentStatus == 'submitted late' ? 
                <p className="text-body2 font-body2 text-gray-700 leading-body2">{answer}</p> 
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

            <div className="flex flex-col justify-center items-center gap-4 w-[15%]">
              {props.assignmentStatus == 'submitted' || props.assignmentStatus == 'submitted late' ? null :
              <>
              <Button 
                variant="primary" 
                onClick={()=>{setSendIsLoading(true); onOpen()}}
                isLoading={sendIsLoading}
                loadingText='Submitting'
                width='full'>
                  Send Assignment
              </Button>
              <Button 
                variant="draft" 
                onClick={()=>{setSaveIsLoading(true); handleSaveDraft()}}
                isLoading={saveIsLoading}
                loadingText='Saving'
                width='full'>
                  Save as draft
              </Button>
              </>
              }
              <Link onClick={() => { navigate(`/courses/${props.courseId}/learning/${props.assignmentId}`)}}>
                Open in Courses
              </Link>
            </div>
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
      </section>

    )
}

export default AssignmentCard;