import React from 'react'
import SidebarAdmin from '../../components/SidebarAdmin';
import { FiSearch } from "react-icons/fi"
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Image,
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
        <div className='h-full'>
        {/* ————————————— Start Coding Here ————————————— */}
          <Box className=' flex justify-center items-start overflow-y-scroll h-[745px] w-full hide-scroll'>
            <Table colorScheme="gray.200"  className='mx-10 my-12 '>
              <Thead position="sticky" top={0} bgColor="gray.300" >
                <Tr className="h-10">
                  <Th></Th>
                  <Th color="gray.800" fontSize="body3" fontWeight="body3">Image</Th>
                  <Th color="gray.800" fontSize="body3" fontWeight="body3">Course name</Th>
                  <Th color="gray.800" fontSize="body3" fontWeight="body3">Lesson</Th>
                  <Th color="gray.800" fontSize="body3" fontWeight="body3">Price</Th>
                  <Th color="gray.800" fontSize="body3" fontWeight="body3">Created date</Th>
                  <Th color="gray.800" fontSize="body3" fontWeight="body3">Updated date</Th>
                  <Th color="gray.800" fontSize="body3" fontWeight="body3">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                
                {/* {courses.map((course, index) => {
                  return (
                  <Tr key={index} className="h-24">
                    <Td fontSize="body2" fontWeight="body2">{course.course_id}</Td>
                    <Td><img src='\image\course\default-image-course.png'/></Td>
                    <Td fontSize="body2" fontWeight="body2">{course.name}</Td> 
                    <Td fontSize="body2" fontWeight="body2">{course.total_learning_time} lessons</Td>
                    <Td fontSize="body2" fontWeight="body2">{course.price}</Td>
                    <Td fontSize="body2" fontWeight="body2">{course.create_at}</Td>
                    <Td fontSize="body2" fontWeight="body2">{course.update_at}</Td>
                    <Td className="flex justify-center items-center">
                      <Image boxSize='20px' src="\image\icon\bin.png" alt="Bin Icon" className='m-5'/><Image boxSize='20px' src="\image\icon\edit.png" alt="Edit Icon" className='m-5' />
                    </Td>
                  </Tr>

                  )})} */}

{/* Mock */}

                  <Tr className="h-24 text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2" >1</Td>
                    <Td ><Image src='\image\course\default-image-course.png'  /></Td>
                    <Td fontSize="body2" fontWeight="body2" >Service Design Essentials</Td>
                    <Td fontSize="body2" fontWeight="body2" >6 Lessons</Td>
                    <Td fontSize="body2" fontWeight="body2" >3,559.00</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image boxSize='20px' src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/><Image boxSize='20px' src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  <Tr className="h-24 text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2" >1</Td>
                    <Td ><Image boxSizeX='64px' boxSizeY='47px' src='\image\course\default-image-course.png'  /></Td>
                    <Td fontSize="body2" fontWeight="body2" >Service Design Essentials</Td>
                    <Td fontSize="body2" fontWeight="body2" >6 Lessons</Td>
                    <Td fontSize="body2" fontWeight="body2" >3,559.00</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image boxSize='20px' src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/><Image boxSize='20px' src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  <Tr className="h-24 text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2" >1</Td>
                    <Td ><Image boxSizeX='64px' boxSizeY='47px' src='\image\course\default-image-course.png'  /></Td>
                    <Td fontSize="body2" fontWeight="body2" >Service Design Essentials</Td>
                    <Td fontSize="body2" fontWeight="body2" >6 Lessons</Td>
                    <Td fontSize="body2" fontWeight="body2" >3,559.00</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image boxSize='20px' src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/><Image boxSize='20px' src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  <Tr className="h-24 text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2" >1</Td>
                    <Td ><Image boxSizeX='64px' boxSizeY='47px' src='\image\course\default-image-course.png'  /></Td>
                    <Td fontSize="body2" fontWeight="body2" >Service Design Essentials</Td>
                    <Td fontSize="body2" fontWeight="body2" >6 Lessons</Td>
                    <Td fontSize="body2" fontWeight="body2" >3,559.00</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image boxSize='20px' src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/><Image boxSize='20px' src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  <Tr className="h-24 text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2" >1</Td>
                    <Td ><Image boxSizeX='64px' boxSizeY='47px' src='\image\course\default-image-course.png'  /></Td>
                    <Td fontSize="body2" fontWeight="body2" >Service Design Essentials</Td>
                    <Td fontSize="body2" fontWeight="body2" >6 Lessons</Td>
                    <Td fontSize="body2" fontWeight="body2" >3,559.00</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image boxSize='20px' src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/><Image boxSize='20px' src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  <Tr className="h-24 text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2" >1</Td>
                    <Td ><Image boxSizeX='64px' boxSizeY='47px' src='\image\course\default-image-course.png'  /></Td>
                    <Td fontSize="body2" fontWeight="body2" >Service Design Essentials</Td>
                    <Td fontSize="body2" fontWeight="body2" >6 Lessons</Td>
                    <Td fontSize="body2" fontWeight="body2" >3,559.00</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image boxSize='20px' src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/><Image boxSize='20px' src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  <Tr className="h-24 text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2" >1</Td>
                    <Td ><Image boxSizeX='64px' boxSizeY='47px' src='\image\course\default-image-course.png'  /></Td>
                    <Td fontSize="body2" fontWeight="body2" >Service Design Essentials</Td>
                    <Td fontSize="body2" fontWeight="body2" >6 Lessons</Td>
                    <Td fontSize="body2" fontWeight="body2" >3,559.00</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image boxSize='20px' src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/><Image boxSize='20px' src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  <Tr className="h-24 text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2" >1</Td>
                    <Td ><Image boxSizeX='64px' boxSizeY='47px' src='\image\course\default-image-course.png'  /></Td>
                    <Td fontSize="body2" fontWeight="body2" >Service Design Essentials</Td>
                    <Td fontSize="body2" fontWeight="body2" >6 Lessons</Td>
                    <Td fontSize="body2" fontWeight="body2" >3,559.00</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image boxSize='20px' src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/><Image boxSize='20px' src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  <Tr className="h-24 text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2" >1</Td>
                    <Td ><Image boxSizeX='64px' boxSizeY='47px' src='\image\course\default-image-course.png'  /></Td>
                    <Td fontSize="body2" fontWeight="body2" >Service Design Essentials</Td>
                    <Td fontSize="body2" fontWeight="body2" >6 Lessons</Td>
                    <Td fontSize="body2" fontWeight="body2" >3,559.00</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image boxSize='20px' src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/><Image boxSize='20px' src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  <Tr className="h-24 text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2" >1</Td>
                    <Td ><Image boxSizeX='64px' boxSizeY='47px' src='\image\course\default-image-course.png'  /></Td>
                    <Td fontSize="body2" fontWeight="body2" >Service Design Essentials</Td>
                    <Td fontSize="body2" fontWeight="body2" >6 Lessons</Td>
                    <Td fontSize="body2" fontWeight="body2" >3,559.00</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td fontSize="body2" fontWeight="body2" >12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image boxSize='20px' src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/><Image boxSize='20px' src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

{/* Mock */}                 


              </Tbody>
            </Table>
          </Box>
         

        
        </div>
      </div>
    </div>
  )
}

export default CourseListPage