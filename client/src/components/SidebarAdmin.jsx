import React from "react";
import { HiOutlineBookOpen, HiOutlineClipboardCheck, HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const { logoutAdmin } = useAuth()
  return (
    <section className="w-[320px] h-screen bg-white border-r divide-solid  border-[#D6D9E4]">
      <div className="flex flex-col py-10 px-8 items-center">
        <img
          src="/image/logo/CourseFlow.png"
          alt="logo"
          className="w-[174px] h-[19px] mb-6 cursor-pointer"
          onClick={()=>{navigate('/')}}
        />
        <h1 className="mb-16 text-[#646D89]">Admin Panel Control</h1>
      </div>

      <div className="flex text-[#424C6B] font-headline1  w-ful py-4 px-6 items-center gap-4 cursor-pointer hover:bg-gray-200 active:bg-gray-200"
      onClick={()=>{navigate('/admin/courselist')}}
      >
        <span className="text-blue-300 text-lg">
          <HiOutlineBookOpen />
        </span>
        <span>Course</span>
      </div>
      <div className="flex text-[#424C6B] font-headline1  w-full py-4 px-6 mb-[468px] items-center gap-4 cursor-pointer hover:bg-gray-200" 
      onClick={()=>{navigate('/admin/assignmentlist')}}
      >
        <span className="text-blue-300 text-lg">
          <HiOutlineClipboardCheck />
        </span>
        <span>Assignment</span>
      </div>
      <div className="flex text-[#424C6B] font-headline1  w-full py-4 px-6 items-center gap-4 cursor-pointer hover:bg-gray-200"
      onClick={logoutAdmin}
      >
        <span className="text-blue-300 text-lg">
          <HiOutlineLogout />
        </span>
        <span>Log out</span>
      </div>
    </section>
  );
};

export default SidebarAdmin;
