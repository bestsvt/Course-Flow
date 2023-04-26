import React from 'react'
import SidebarAdmin from '../../components/SidebarAdmin';
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button } from "@chakra-ui/react";  


const AddLessonPage = () => {
  return (
    <div className='flex'>
      {/* ————————————— Left Section ————————————— */}
      <SidebarAdmin/>
      {/* ————————————— Right Section ————————————— */}
      <div className='w-full'>
        {/* ————————————— Navbar Section ————————————— */}
        <nav className='h-[100px] border-gray-400 border-b bg-white flex justify-between px-10 py-4 items-center'>
            <div className='flex items-center gap-4'>
              <ArrowBackIcon boxSize={7} color='#9AA1B9'/>
              <div className='flex flex-col'>
                <h1 className='text-body3 font-body3 text-gray-600'>Course <span className='text-black'>‘{'Service Design Essentials’Introduction'}’</span></h1>
                <h1 className='text-headline3 font-headline3 text-black'>Add Lesson</h1>
              </div>
               
            </div>
            <div className='flex gap-4'>
              <Button variant='secondary'>Cancel</Button>
              <Button variant='primary'>Create</Button>
            </div>
        </nav>
        {/* ————————————— Content Section ————————————— */}
        <div>
        {/* ————————————— Start Coding Here ————————————— */}

        
        </div>
      </div>
    </div>
  )
}

export default AddLessonPage