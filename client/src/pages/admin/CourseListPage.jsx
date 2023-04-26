import React from 'react'
import SidebarAdmin from '../../components/SidebarAdmin';
import { FiSearch } from "react-icons/fi"
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

const CourseListPage = () => {
  return (
    <div className='flex'>
      {/* ————————————— Left Section ————————————— */}
      <SidebarAdmin/>
      {/* ————————————— Right Section ————————————— */}
      <div className='w-full'>
        {/* ————————————— Navbar Section ————————————— */}
        <nav className='h-[100px] border-gray-400 border-b bg-white flex justify-between px-10 py-4 items-center'>
          <h1 className='text-headline3 font-headline3 text-black'>Course</h1>
          <div className='flex items-center gap-4'>
          <InputGroup>
            <Input
              variant="normal"
              id="password"
              placeholder="Search..."
              type="text"
              padding='0 45px'
            />
            <InputLeftElement margin="4px">
              <FiSearch fontSize={20}/>
            </InputLeftElement>
            </InputGroup>
            <Button variant='primary'>+ Add Course</Button>
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

export default CourseListPage