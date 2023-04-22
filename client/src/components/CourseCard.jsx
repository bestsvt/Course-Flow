import { HiOutlineBookOpen,HiOutlineClock } from 'react-icons/hi'
import { useNavigate } from "react-router-dom";

function CourseCard(props) {
    const navigate = useNavigate();
    return (
    <div className="flex flex-col gap-6 h-[550px] bg-white rounded-lg shadow-shadow1 hover:opacity-75 hover:cursor-pointer relative"
    onClick={() => { navigate(`/courses/${props.id}`) ;window.scrollTo(0, 0)}}
    >
        <img className="rounded-t-lg h-[50%] object-cover" src={props.image ? props.image : './image/course/default-image-course.png'}/>
        <div className="px-4 flex flex-col gap-2 mb-5">
            <div className="text-orange-500 font-body3">Course</div>
            <div className="text-headline3 text-black font-body3">{props.name}</div>
            <div className="">{props.summary}</div>
        </div>     
        <div className="flex items-center gap-6 p-4 border-gray-300 border-t-2 absolute bottom-0 left-0 w-full">
            <div className="flex gap-2.5 items-center"><HiOutlineBookOpen className="text-blue-400 text-[20px]"/>6 Lesson</div>
            <div className="flex gap-2.5 items-center"><HiOutlineClock className="text-blue-400 text-[20px]"/>{props.time} Hours</div>
        </div>
    </div>
    )
}

export default CourseCard;