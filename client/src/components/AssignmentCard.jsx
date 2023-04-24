import { Button , Badge , Link } from "@chakra-ui/react"; 
import { useNavigate } from "react-router-dom";

function AssignmentCard(props) {

  const navigate = useNavigate();

  return (
      <section className="flex flex-col bg-blue-100 rounded-lg px-24 py-10 gap-9 w-full">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="text-headline3 font-headline3 text-black">
              Course: {"Course Name"}
            </h1>
            <Badge variant="pending">
                  {'Status of Assignment'}
            </Badge>
          </div>

          <div className="flex justify-between text-body2 font-body2 text-gray-700">
            <h1>
              {"Lesson Name"}: {"Sub-lesson Name"}
            </h1>
            <h1>
              Assign within {'2'} Days
            </h1>
          </div>
        </div>

        <div className="flex flex-row justify-between rounded-lg bg-white p-6 gap-[5%] w-[100%]">
            <div className="flex flex-col gap-1 w-[80%]">
              <h1 className="text-body2 font-body2 text-black">
                {'Question of assignment'}
              </h1>
              <textarea
                name="answer-assignment"
                id="answer-assignment"
                cols="30"
                rows="10"
                placeholder="Answer..."
                className="h-[100px] w-full resize-none hide-scroll p-3 rounded-lg border border-gray-400 outline-none"
              />
            </div>

            <div className="flex flex-col justify-end items-center gap-4 w-[15%]">
              <Button
                className="w-[90%]"
                variant="primary"
                onClick={() => {navigate("")}}
              >
                Submit
              </Button>
              <Link
                onClick={() => { navigate("")}}
              >
                Open in Courses
              </Link>
            </div>
        </div>
      </section>

    )
}

export default AssignmentCard;