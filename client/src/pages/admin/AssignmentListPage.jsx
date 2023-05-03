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
  TableContainer,
  Image,
} from "@chakra-ui/react";


const AssignmentListPage = () => {
  return (
    <div className='flex'>
      {/* ————————————— Left Section ————————————— */}
      <SidebarAdmin/>
      {/* ————————————— Right Section ————————————— */}
      <div className='w-full'>
        {/* ————————————— Navbar Section ————————————— */}
        <nav className='h-[100px] border-gray-400 border-b bg-white flex justify-between px-10 py-4 items-center'>
          <h1 className='text-headline3 font-headline3 text-black'>Assignment</h1>
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
            <Button variant='primary'>+ Add Assignment</Button>
          </div>
        </nav>
        {/* ————————————— Content Section ————————————— */}
        <div className='h-full p-10 bg-gray-100 flex flex-col items-center gap-10'>
        {/* ————————————— Start Coding Here ————————————— */}
        
        <TableContainer borderRadius={10} width='100%'>
            <Table>
              <Thead>
                <Tr bg='#E4E6ED'>
                  <Th width='18%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Assignment detail</Th>
                  <Th width='18%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Course</Th>
                  <Th width='18%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Lesson</Th>
                  <Th width='18%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Sub-lesson</Th>
                  <Th width='18%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Created date</Th>
                  <Th width='10%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Action</Th>
                </Tr>
              </Thead>
              <Tbody bg='white' color='black'>

{/* Mock */}
                  <Tr className="text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2">What are the 4 elem...</Td>
                    <Td fontSize="body2" fontWeight="body2">Service Design Essen...</Td>
                    <Td fontSize="body2" fontWeight="body2">Introduction</Td>
                    <Td fontSize="body2" fontWeight="body2">4 Levels of Service D...</Td>
                    <Td fontSize="body2" fontWeight="body2">12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image width={25} height={25} src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/>
                      <Image width={25} height={25} src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  
                  <Tr className="text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2">What are the 4 elem...</Td>
                    <Td fontSize="body2" fontWeight="body2">Service Design Essen...</Td>
                    <Td fontSize="body2" fontWeight="body2">Introduction</Td>
                    <Td fontSize="body2" fontWeight="body2">4 Levels of Service D...</Td>
                    <Td fontSize="body2" fontWeight="body2">12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image width={25} height={25} src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/>
                      <Image width={25} height={25} src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  
                  <Tr className="text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2">What are the 4 elem...</Td>
                    <Td fontSize="body2" fontWeight="body2">Service Design Essen...</Td>
                    <Td fontSize="body2" fontWeight="body2">Introduction</Td>
                    <Td fontSize="body2" fontWeight="body2">4 Levels of Service D...</Td>
                    <Td fontSize="body2" fontWeight="body2">12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image width={25} height={25} src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/>
                      <Image width={25} height={25} src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  
                  <Tr className="text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2">What are the 4 elem...</Td>
                    <Td fontSize="body2" fontWeight="body2">Service Design Essen...</Td>
                    <Td fontSize="body2" fontWeight="body2">Introduction</Td>
                    <Td fontSize="body2" fontWeight="body2">4 Levels of Service D...</Td>
                    <Td fontSize="body2" fontWeight="body2">12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image width={25} height={25} src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/>
                      <Image width={25} height={25} src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  <Tr className="text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2">What are the 4 elem...</Td>
                    <Td fontSize="body2" fontWeight="body2">Service Design Essen...</Td>
                    <Td fontSize="body2" fontWeight="body2">Introduction</Td>
                    <Td fontSize="body2" fontWeight="body2">4 Levels of Service D...</Td>
                    <Td fontSize="body2" fontWeight="body2">12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image width={25} height={25} src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/>
                      <Image width={25} height={25} src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  
                  <Tr className="text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2">What are the 4 elem...</Td>
                    <Td fontSize="body2" fontWeight="body2">Service Design Essen...</Td>
                    <Td fontSize="body2" fontWeight="body2">Introduction</Td>
                    <Td fontSize="body2" fontWeight="body2">4 Levels of Service D...</Td>
                    <Td fontSize="body2" fontWeight="body2">12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image width={25} height={25} src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/>
                      <Image width={25} height={25} src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  
                  <Tr className="text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2">What are the 4 elem...</Td>
                    <Td fontSize="body2" fontWeight="body2">Service Design Essen...</Td>
                    <Td fontSize="body2" fontWeight="body2">Introduction</Td>
                    <Td fontSize="body2" fontWeight="body2">4 Levels of Service D...</Td>
                    <Td fontSize="body2" fontWeight="body2">12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image width={25} height={25} src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/>
                      <Image width={25} height={25} src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

                  
                  <Tr className="text-body2 font-body2 text-black">
                    <Td fontSize="body2" fontWeight="body2">What are the 4 elem...</Td>
                    <Td fontSize="body2" fontWeight="body2">Service Design Essen...</Td>
                    <Td fontSize="body2" fontWeight="body2">Introduction</Td>
                    <Td fontSize="body2" fontWeight="body2">4 Levels of Service D...</Td>
                    <Td fontSize="body2" fontWeight="body2">12/02/2022 10:30PM</Td>
                    <Td className="flex justify-center items-center">
                      <Image width={25} height={25} src="\image\icon\bin.png" alt="Bin Icon" className='mx-2 my-14'/>
                      <Image width={25} height={25} src="\image\icon\edit.png" alt="Edit Icon" className='mx-2 my-14' />
                    </Td>
                  </Tr>

{/* Mock */}

              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default AssignmentListPage