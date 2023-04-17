import React from "react";
import { useNavigate } from "react-router-dom";
import {
AlertDialog,
AlertDialogBody,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogContent,
AlertDialogOverlay,
AlertDialogCloseButton,
Button,
useToast,
useDisclosure
} from '@chakra-ui/react'
import axios from "axios";
import { useAuth } from "../contexts/authentication";

function PriceCard(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();
    const { userAuthState , isAuthenticated} = useAuth()
    const toast = useToast()

    const subscription = async () => {
        const result = await axios.post(`http://localhost:4000/courses/${props.courseId}`,
            { user_id: userAuthState.user.id,
                status: "subscribe"
            }
        )
        props.setSubscribeStatus(!props.subscribeStatus)
        onClose()
        toast({
            title: result.data.message,
            isClosable: true,
            position: 'top',
            status: 'success',
            colorScheme: "blue",
            duration: 5000
          })
    }

    async function desire(action) {
        const result = await axios.post(`http://localhost:4000/courses/${props.courseId}`,
            { user_id: userAuthState.user.id,
            status: "desire",
            action: action }
        )
        props.setDesireStatus(!props.desireStatus)
        toast({
            title: result.data.message,
            isClosable: true,
            position: 'top',
            status: 'success',
            colorScheme: "blue",
            duration: 5000
          })
    }



    return (
        <section>
            <div className=" w-[420px] bg-white flex flex-col gap-6 p-6 mt-24 rounded-lg shadow-shadow1 sticky top-5">
                <div className="flex flex-col gap-2">
                    <div className="text-orange-500 font-body3 mb-4">Course</div>
                    <div className="text-headline3 font-headline3 text-black ">{props.name}</div>
                    <div className="text-gray-700 text-body2 mb-4">{props.course_summary}</div>
                    <div className=" text-headline3 font-headline3 text-gray-700 ">THB {props.price}</div>
                </div>
                <hr className="h-[1px] bg-gray-300 mb-3" />
                {/* —————————————— wating function subscribe + desire —————————————— */}
                <div className="flex flex-col items-center gap-4">
                    {
                    isAuthenticated ?
                    props.subscribeStatus ? 
                    // รอเพิ่ม navigate ไปที่หน้า learing page 
                    <Button variant="primary" className="w-full">Start Learning</Button> 
                    : 
                    <>
                    {props.desireStatus ? 
                    <Button variant="secondary" className="w-full" onClick={()=>{desire("remove")}}>Remove from Desire Course</Button> 
                    :
                    <Button variant="secondary" className="w-full" onClick={()=>{desire('add')}}>Get in Desire Course</Button>
                    }
                    <Button variant="primary" className="w-full" onClick={onOpen}>Subscribe This Course</Button>
                    </>
                    :
                    <>
                    <Button variant="secondary" className="w-full" onClick={()=>{navigate('/login')}}>Get in Desire Course</Button>
                    <Button variant="primary" className="w-full" onClick={()=>{navigate('/login')}}>Subscribe This Course</Button>
                    </>
                    }
                    
                    {/* ใส่ Logic เพิ่มถ้ามี Desire เข้ามาด้วย */}
                    <AlertDialog
                        motionPreset='slideInBottom'
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                        isOpen={isOpen}
                        isCentered
                    >
                        <AlertDialogOverlay />
                        <AlertDialogContent borderRadius={24}  >
                            <AlertDialogHeader className="text-body1 font-body1 text-black" >
                                Confirmation
                            </AlertDialogHeader>
                            <hr className="h-[1px] bg-gray-300 mb-3" />
                            <AlertDialogCloseButton />
                            <AlertDialogBody className="text-body2 font-body2 text-gray-700">
                                Do you sure to subscribe Service Design Essentials Course?
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button variant="secondary" ref={cancelRef} onClick={onClose}>
                                    No, I don’t
                                </Button>
                                <Button variant="primary" colorScheme='red' ml={3} onClick={subscription} >
                                    Yes, I want to subscribe
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </section>
    )
}

export default PriceCard;