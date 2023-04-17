import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Await, useNavigate } from "react-router-dom";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
} from '@chakra-ui/react'
import axios from "axios";
import { useAuth } from "../contexts/authentication";





function PriceCard(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();
    const { userAuthState } = useAuth()

    const subscription = async () => {
     
        const result = await axios.post(`http://localhost:4000/courses/${props.courseId}`,
            { user_id: userAuthState.user.id }
        )        

        onClose()

    }

    return (
        <section className=" w-[420px] h-[450px] bg-white flex flex-col gap-6 p-6 mt-24 rounded-lg shadow-shadow1 sticky top-5">
            <div className="flex flex-col gap-2">
                <div className="text-orange-500 font-body3 mb-4">Course</div>
                <div className="text-headline3 font-headline3 text-black ">{props.name}</div>
                <div className="text-gray-700 text-body2 mb-4">{props.course_summary}</div>
                <div className=" text-headline3 font-headline3 text-gray-700 ">THB {props.price}</div>
            </div>
            <hr className="h-[1px] bg-gray-300 mb-3" />
            {/* —————————————— wating function subscribe + desire —————————————— */}
            <div className="flex flex-col items-center gap-4">
                <Button variant="secondary" className="w-full" >Get in Desire Course</Button>
                <Button variant="primary" onClick={onOpen} className="w-full" >Subscribe This Course</Button>
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
        </section>
    )
}

export default PriceCard;