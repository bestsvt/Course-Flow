import { HiOutlineBookOpen,HiOutlineClock } from 'react-icons/hi'

function CourseCard(props) {
    
    return (
        <div className="flex flex-col gap-6 h-[550px] bg-white rounded-lg shadow-shadow1 hover:opacity-75 hover:cursor-pointer relative">
            <img className="rounded-t-lg h-[50%] object-cover" src="https://cdn.discordapp.com/attachments/1064852887823458386/1094902855053349004/image_1.png"/>
            <div className="px-4 flex flex-col gap-2 mb-5">
                <div className="text-orange-500 font-body3">Course</div>
                <div className="text-headline3 text-black font-body3">Service Design Essentials</div>
                <div className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores tempore illum aliquam sint nostrum.</div>
            </div>     
            <div className="flex items-center gap-6 p-4 border-gray-300 border-t-2 absolute bottom-0 left-0 w-full">
                <div className="flex gap-2.5 items-center"><HiOutlineBookOpen className="text-blue-400 text-[20px]"/>6 Lesson</div>
                <div className="flex gap-2.5 items-center"><HiOutlineClock className="text-blue-400 text-[20px]"/>6 Hours</div>
            </div>
        </div>
        )
}

export default CourseCard;