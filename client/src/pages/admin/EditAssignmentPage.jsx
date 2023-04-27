import React, { useEffect, useState } from "react";
import SidebarAdmin from '../../components/SidebarAdmin'
import {
  Button,
  Select,
  Link,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons'




const EditAssignmentPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [values, setValues] = useState({ course: '', lesson: '', subLesson: '', assignment: '', duration: '' })


  return (
    <div className='flex'>
      {/* ————————————— Left Section ————————————— */}
      <SidebarAdmin />
      {/* ————————————— Right Section ————————————— */}
      <div className='w-full'>
        {/* ————————————— Navbar Section ————————————— */}
        <nav className='h-[100px] border-gray-400 border-b bg-white flex justify-between px-10 py-4 items-center'>
          <div className='flex items-center gap-4'>
            <ArrowBackIcon boxSize={7} color='#9AA1B9' />
            <h1 className='text-headline3 font-headline3 text-gray-600'>Assignment <span className='text-black'>‘{'What are the 4 elements of service design?'}’</span></h1>
          </div>
          <div className='flex gap-4'>
            <Button variant='secondary'>Cancel</Button>
            <Button variant='primary'>Save</Button>
          </div>
        </nav>
        <div className='bg-gray-100 h-full p-[3%]'>
          <div>
            {/* ————————————— Start Coding Here ————————————— */}

            <div className='flex flex-col gap-8 bg-white w-full  rounded-3xl border-2 border-gray-300 py-[5%] px-[10%]'>

              <div className='flex flex-col gap-1'>
                <h1 className='text-[16px] font-headline3 text-black' >Course</h1>
                <Select placeholder='Place Holder' width={'48%'} height={'48px'} border={'1px'} borderColor={'gray.400'}
                  focusBorderColor="gray.400" _focus={{ boxShadow: 'none' }}
                  value={values.course}
                  onChange={(e) => setValues({ ...values, course: e.target.value })}
                  {...(values.course === "" && { color: "gray.600" })} >
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                  <option value='option4'>Option 4</option>
                </Select>
              </div>

              <div className='flex gap-[4%] '>

                <div className='flex flex-col gap-1 w-full'>
                  <h1 className='text-[16px] font-headline3 text-black'>Lesson</h1>
                  <Select placeholder='Place Holder' width={'100%'} height={'48px'} border={'1px'} borderColor={'gray.400'}
                    focusBorderColor="gray.400" _focus={{ boxShadow: 'none' }}
                    value={values.lesson}
                    onChange={(e) => setValues({ ...values, lesson: e.target.value })}
                    {...(values.lesson === "" && { color: "gray.600" })}  >
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                    <option value='option4'>Option 4</option>
                  </Select>
                </div>

                <div className='flex flex-col gap-1 w-full'>
                  <h1 className='text-[16px] font-headline3 text-black'>Sub-lesson</h1>
                  <Select placeholder='Place Holder' width={'100%'} height={'48px'} border={'1px'} borderColor={'gray.400'}
                    focusBorderColor="gray.400" _focus={{ boxShadow: 'none' }}
                    value={values.subLesson}
                    onChange={(e) => setValues({ ...values, subLesson: e.target.value })}
                    {...(values.subLesson === "" && { color: "gray.600" })}  >
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                    <option value='option4'>Option 4</option>
                  </Select>
                </div>

              </div>

              <hr className="h-[1px] bg-gray-400 " />

              <h1 className='text-xl font-semibold text-gray-700' >Assignment detail</h1>

              <div className='flex flex-col gap-1'>
                <h1 className='text-[16px] font-headline3 text-black'>Assignment *</h1>
                <Select placeholder='Place Holder' height={'48px'} border={'1px'} borderColor={'gray.400'}
                  focusBorderColor="gray.400" _focus={{ boxShadow: 'none' }}
                  value={values.assignment}
                  onChange={(e) => setValues({ ...values, assignment: e.target.value })}
                  {...(values.assignment === "" && { color: "gray.600" })} >
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                  <option value='option4'>Option 4</option>
                </Select>
              </div>

              <div className='flex flex-col gap-1'>
                <h1 className='text-[16px] font-headline3 text-black'>Duration of assignment (day)</h1>
                <Select placeholder='Place Holder' width={'48%'} height={'48px'} border={'1px'} borderColor={'gray.400'}
                  focusBorderColor="gray.400" _focus={{ boxShadow: 'none' }} _placeholder={{ textColor: 'gray.600' }}
                  value={values.duration}
                  onChange={(e) => setValues({ ...values, duration: e.target.value })}
                  {...(values.duration === "" && { color: "gray.600" })}  >
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                  <option value='option4'>Option 4</option>
                </Select>
              </div>

            </div>

          </div>
          <Link className='flex justify-end my-20' onClick={onOpen}>Delete Assignment</Link>
          <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent borderRadius={24}>
              <AlertDialogHeader className="text-body1 font-body1 text-black" >Confirmation</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Do you sure to delete this assignment?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button variant="secondary"  >
                  Yes, I want to delete assignment
                </Button>
                <Button variant="primary" marginLeft={'15px'} ref={cancelRef} onClick={onClose}>
                  No, I don’t
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>




        </div>
      </div>
    </div>
  )
}

export default EditAssignmentPage