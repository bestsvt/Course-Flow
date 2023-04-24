import { Button } from "@chakra-ui/react"; 
import { useNavigate } from "react-router-dom";

 
function AssignmentCard() {
const navigate = useNavigate();
return (
        <div
            className="flex flex-col w-[1120px] h-[354px] bg-blue-100 rounded-lg
            px-[8%] py-8"
          >
            <div className="flex flex-row justify-between pb-6">
              <div className="">
                <h1 className="text-headline3 text-black">
                  Course: Service Design Essentials
                </h1>
                <h1 className="text-body2 text-gray-700">
                  Introduction: 4 Levels of Service Design in an Organization{" "}
                </h1>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="bg-[#FFFBDB] text-[#996500] w-[80px] h-[32px] font-medium rounded text-center">
                  Pending
                </h1>
                <h1>Assign within 2 Days</h1>
              </div>
            </div>
            <div className="flex flex-row justify-between rounded-lg bg-white py-6 px-[2%]">
              <div className="flex flex-col">
                <h1 className="text-body2 text-black">
                  What are the 4 elements of service design?
                </h1>
                <textarea
                  name=""
                  id=""
                  cols="80"
                  rows="5"
                  className="border border-gray-400 rounded-lg p-3"
                  placeholder="Answer..."
                ></textarea>
              </div>
              <div className="flex flex-col gap-5">
                <Button
                  className="w-[140px] mt-[36px]"
                  variant="primary"
                  onClick={() => {
                    navigate("/courses");
                  }}
                >
                  Submit
                </Button>
                <div
                  className="text-blue-500 font-bold hover:cursor-pointer"
                  onClick={() => {
                    navigate("/courses");
                  }}
                >
                  Open in Courses
                </div>
              </div>
            </div>
          </div>

    )
}
export default AssignmentCard;