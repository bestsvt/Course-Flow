import React, { useEffect, useState } from 'react'
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
  useDisclosure,
  Collapse,
  Spinner
} from "@chakra-ui/react";
import { Pagination } from 'antd';
import axios from 'axios';


const AssignmentListPage = () => {

  const [ keyword, setKeyword] = useState("");
  const [ suggest, setSuggest] = useState();
  const [ suggestWord, setSuggestWord] = useState("");
  const [ currentPage, setCurrentPage] = useState(1);
  const [ totalAssigment, setTotalAssignment] = useState();
  const [ isLoading, setIsLoading] = useState(false);
  const [ assignment, setAssignment] = useState([]);
  const { isOpen, onClose , onOpen} = useDisclosure()

  useEffect(() => {
    getAssignmentsAdmin(keyword)
  }, [keyword, currentPage]);

  useEffect(() => {
    getAssignmentsSuggestAdmin(suggestWord)
  }, [suggestWord]);

  function pagination(pageNumber) {
    setCurrentPage(pageNumber)  
  }

  async function getAssignmentsAdmin(searchKeyword) {
    try {
      setIsLoading(true)
      if (!searchKeyword) {
        searchKeyword = "";
      }
      const query = new URLSearchParams();
      query.append("keyword", searchKeyword);
      query.append("currentPage", currentPage);
      const results = await axios.get(
        `http://localhost:4000/admin/assignments?${query.toString()}`
      );
      setAssignment(results.data.data)
      setTotalAssignment(results.data.allAssignments.length)
      setIsLoading(false)
    } catch (error) {
      console.log("Get assignments Admin error:", error);
      setIsLoading(false)
    }
  }

  async function getAssignmentsSuggestAdmin(suggestWord) {
    try {
      const query = new URLSearchParams();
      query.append("keyword", suggestWord);
      const results = await axios.get(
        `http://localhost:4000/admin/assignments?${query.toString()}`
      );
      setSuggest(results.data.allAssignments);
    } catch (error) {
      console.log("Get assignments suggest admin error:", error);
    }
  };

  // Change format time to MM/DD/YYYY TT:TT(AM)
  function changeFormatTime(time) {
    function formatTime(hours, minutes) {
      const meridiem = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = String(minutes).padStart(2, '0');
      return `${formattedHours}:${formattedMinutes}${meridiem}`;
    }
    const inputDateString = time;
    const inputDate = new Date(inputDateString);
    return `${inputDate.getMonth() + 1}/${inputDate.getDate()}/${inputDate.getFullYear()} ${formatTime(inputDate.getHours(), inputDate.getMinutes())}`;
  }

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
          <div className="relative">
          <InputGroup>
            <Input
              variant="normal"
              id="password"
              placeholder="Search..."
              type="text"
              padding='0 45px'
              onChange={(event)=>{setSuggestWord(event.target.value); onOpen()}}
              value={suggestWord}
              onKeyDown={(event) => {
                if (event.keyCode === 13) { 
                // 13 is the keycode for Enter key
                  setKeyword(event.target.value);
                  onClose()
                }
              }}
            />
            <InputLeftElement margin="4px">
              <FiSearch fontSize={20}/>
            </InputLeftElement>
            </InputGroup>
            {suggest ?
              <Collapse in={isOpen} animateOpacity>
              <div className="absolute w-full flex flex-col shadow-shadow2 z-50 rounded-b-lg">
                {suggest.filter((item) => {
                    const search = suggestWord.toLowerCase();
                    const fullName = item.question.toLowerCase();
                    return (
                      search &&
                      search !== fullName
                    );
                  }).slice(0, 5).map((item,index)=>{
                  return (
                    <div className="py-2 px-4 text-black bg-white  hover:bg-gray-100 hover:cursor-pointer"
                    onClick={()=>{setSuggestWord(item.question);setKeyword(item.question)}}
                    key={index}>
                      {item.question}
                    </div>
                  )
                })}
              </div>
              </Collapse> 
            : null}
            </div>
            <Button variant='primary' isDisabled>+ Add Assignment</Button>
          </div>
        </nav>
        {/* ————————————— Content Section ————————————— */}
        <div className='h-full p-10 bg-gray-100 flex flex-col items-center gap-10'>
        {isLoading ?
        <div className="w-full flex justify-center items-center p-40">
          <Spinner
            thickness="5px"
            speed="0.5s"
            emptyColor="gray.200"
            color="blue.500"
            width={100}
            height={100}
          />
        </div>
        : 
        <TableContainer borderRadius={10} width='100%'>
          <Table>
            <Thead>
              <Tr bg='#E4E6ED'>
                <Th width='18.5%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Assignment detail</Th>
                <Th width='18.5%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Course</Th>
                <Th width='18.5%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Lesson</Th>
                <Th width='18.5%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Sub-lesson</Th>
                <Th width='18.5%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Created date</Th>
                <Th width='7.5%' textTransform="capitalize" fontSize="14px" fontWeight="400" color='#424C6B' fontFamily='Inter'>Action</Th>
              </Tr>
            </Thead>
            <Tbody bg='white' color='black'>
              {assignment.map((assignment,index)=>{
                return (
                <Tr className="text-body2 font-body2 text-black" key={index}>
                  <Td fontSize="body2" fontWeight="body2" padding='30px 24px'>{assignment.question.substring(0, 28) + '...'}</Td>
                  <Td fontSize="body2" fontWeight="body2">{assignment.coursename.substring(0, 26) + '...'}</Td>
                  <Td fontSize="body2" fontWeight="body2">{assignment.lessonname.length > 28 ? assignment.lessonname.substring(0, 28) + '...' : assignment.lessonname}</Td>
                  <Td fontSize="body2" fontWeight="body2">{assignment.sublessonname.substring(0, 26) + '...'}</Td>
                  <Td fontSize="body2" fontWeight="body2">{changeFormatTime(assignment.created_at)}</Td>
                  <Td>
                    <div className='flex gap-4 justify-center'>
                      <Image width={25} height={25} src="\image\icon\bin.png" alt="Bin Icon" className='hover:cursor-not-allowed'/>
                      <Image width={25} height={25} src="\image\icon\edit.png" alt="Edit Icon" className='hover:cursor-not-allowed'/>
                    </div>
                  </Td>
                </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
          }
          {isLoading ? null : 
          <Pagination
          total={totalAssigment}
          current={currentPage}
          pageSize={8}
          onChange={pagination}
          hideOnSinglePage={totalAssigment < 8 ? true : false}
          showSizeChanger={false}
          />}
        </div>
      </div>
    </div>
  )
}

export default AssignmentListPage