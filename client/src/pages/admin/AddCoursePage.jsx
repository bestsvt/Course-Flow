import React from 'react'
import SidebarAdmin from '../../components/SidebarAdmin';
import { Button } from "@chakra-ui/react";


const AddCoursePage = () => {
  return (
    <div className='flex'>
      {/* ————————————— Left Section ————————————— */}
      <SidebarAdmin/>
      {/* ————————————— Right Section ————————————— */}
      <div className='w-full'>
        {/* ————————————— Navbar Section ————————————— */}
        <nav className='h-[100px] border-gray-400 border-b bg-white flex justify-between px-10 py-4 items-center'>
            <h1 className='text-headline3 font-headline3 text-black'>Add Course</h1>
            <div className='flex gap-4'>
              <Button variant='secondary'>Cancel</Button>
              <Button variant='primary'>Create</Button>
            </div>
        </nav>
        {/* ————————————— Content Section ————————————— */}
        <div className='bg-gray-100 h-full'>
        {/* ————————————— Start Coding Here ————————————— */}

        
        </div>
      </div>
    </div>
  )
}

export default AddCoursePage