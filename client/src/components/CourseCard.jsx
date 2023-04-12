import { HiOutlineBookOpen,HiOutlineClock } from 'react-icons/hi'

function CourseCard(props) {
    
    return (
    <div className="flex flex-col justify-between gap-6 h-[550px] bg-white rounded-lg shadow-shadow1 hover:opacity-75 hover:cursor-pointer">
        <img className="rounded-t-lg h-1/2 object-cover" src={props.image ? props.image : './image/course/default-image-course.png'}/>
        <div className="px-4 flex flex-col gap-2 mb-5 h-32">
            <div className="text-orange-500 font-body3">Course</div>
            <div className="text-headline3 text-black font-body3">{props.name}</div>
            <div className="">{props.summary}</div>
        </div>
        <hr className="h-[1px] bg-gray-300"/>
        <div className="flex items-center gap-6 p-4">
            <div className="flex gap-2.5 items-center"><HiOutlineBookOpen className="text-blue-400 text-[20px]"/>6 Lesson</div>
            <div className="flex gap-2.5 items-center"><HiOutlineClock className="text-blue-400 text-[20px]"/>{props.time} Hours</div>
        </div>
    </div>
    )
}

export default CourseCard;