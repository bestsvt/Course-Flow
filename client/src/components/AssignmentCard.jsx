import { Button , Badge , Link } from "@chakra-ui/react"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AssignmentCard(props) {

  const [answer, setAnswer] = useState(props.answer);

  const navigate = useNavigate();

  return (
      <section className="flex flex-col bg-blue-100 rounded-lg px-24 py-10 gap-9 w-full">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="text-headline3 font-headline3 text-black">
              Course: {props.courseName}
            </h1>
            <Badge variant={props.status}>
              {props.status == 'inProgress' ? 'In Progress' : props.status}
            </Badge>
          </div>

          <div className="flex justify-between text-body2 font-body2 text-gray-700">
            <h1>
              {props.lessonName}: {props.subLessonName}
            </h1>
            {props.status == 'submitted' || 
            props.status == 'submitted late' 
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
              {props.status == 'submitted' || props.status == 'submitted late' ? 
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

            <div className="flex flex-col justify-end items-center gap-4 w-[15%]">
              {props.status == 'submitted' || props.status == 'submitted late' ? null :
              <>
              <Button
                className="w-[90%]"
                variant="primary"
                onClick={() => {navigate("")}}
              >
                Send Assignment
              </Button>
              <Link
                onClick={() => { navigate("")}}
              >
                Open in Courses
              </Link>
              </>
              }
            </div>
        </div>
      </section>

    )
}

export default AssignmentCard;