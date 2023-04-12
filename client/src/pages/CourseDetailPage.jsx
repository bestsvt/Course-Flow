import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import SubFooter from "../components/SubFooter";
import Footer from "../components/Footer";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton
} from '@chakra-ui/react'


function CourseDetailPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />

            <div name="course-detail-page" className="flex justify-center ">
                {/*   section 1 */}

                <div className="flex flex-col gap-28 w-[900px]  py-14 px-6 " >
                    <div >
                        <div className="flex items-center gap-1 mb-3 hover:opacity-75 hover:cursor-pointer" onClick={() => { navigate("/courses")}} >
                            <HiArrowLeft className="text-blue-500 text-body2 font-bold" />
                            <p className="text-blue-500 text-body2 font-bold ">Back</p>
                        </div>

                        <video
                            src="../../public/video/demo1.mp4"
                            controls
                            className="rounded-lg"
                        />
                    </div>


                    <div className="flex flex-col gap-4" >
                        <h1 className="text-headline2">Course Detail</h1>
                        <p className="text-body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum aenean fermentum, velit vel, scelerisque morbi accumsan. Nec, tellus leo id leo id felis egestas. Quam sit lorem quis vitae ut mus imperdiet. Volutpat placerat dignissim dolor faucibus elit ornare fringilla. Vivamus amet risus ullamcorper auctor nibh. Maecenas morbi nec vestibulum ac tempus vehicula.


                            Vel, sit magna nisl cras non cursus. Sed sedsit ullamcorper neque. Dictum sapienamet,                 dictumst maecenas.Mattis nulla tellus ut neque euismod crasamet, volutpat purus. Semper purus viverra turpis in tempus ac nunc.
                            Morbi ullamcorper sed elit enim turpis.Scelerisque rhoncus morbi pulvinar donec atsed                 fermentum. Duis non urnalacus, sit amet. Accumsan orci elementumnisl tellus sit quis. Integer turpis lectus eu blandit sit. At atcras viverra odio neque nisl consectetur.Arcu senectus aliquet vulputateurna, ornare. Mi sem tellus elementum atcommodo blandit nunc.   Viverraelit adipiscing ut dui, tellus viverra nec.



                            Lectus pharetra eget curabitur lobortis gravida gravida eget ut. Nullam velit morbi         quam a at. Sed eu orci, sociis nulla at sit. Nunc quam integer metus vitae elementum    pulvinar mattis nulla molestie. Quis eget vestibulum, faucibus malesuada eu. Et     lectus molestie egestas faucibus auctor auctor.
                        </p>

                    </div>

                    <div className="flex flex-col gap-4"  >

                        <h1 className="text-headline2">Module Samples</h1>
                        <Accordion allowToggle>
                            <AccordionItem >
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            <div className="flex gap-4">
                                                <h1 className="text-headline3 font-headline3 text-gray-700" >01</h1>
                                                <h1 className="text-headline3 text-black  font-headline3">Introduction</h1>
                                            </div>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4} className="w-[600px] ">
                                    <ul className="text-body2 font-body2 text-gray-700 list-disc px-[10%]" >
                                        <li >Welcome to the Course</li>
                                        <li>Course Overview</li>
                                        <li>Getting to Know You</li>
                                        <li>What is Service Design ?</li>
                                        <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
                                        <li>4 Levels of Service Design in an Organization</li>
                                        <li>Scope of Service Design</li>
                                        <li>Improving Existing Services - Credit Cards</li>
                                        <li>Improving Existing Services - MK</li>
                                        <li>Levels of Impact</li>

                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>


                            <AccordionItem >
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            <div className="flex gap-4">
                                                <h1 className="text-headline3 font-headline3 text-gray-700" >02</h1>
                                                <h1 className="text-headline3 text-black  font-headline3">Service Design Theories and Principles</h1>
                                            </div>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4} className="w-[600px] ">
                                    <ul className="text-body2 font-body2 text-gray-700 list-disc px-[10%]" >
                                        <li >Welcome to the Course</li>
                                        <li>Course Overview</li>
                                        <li>Getting to Know You</li>
                                        <li>What is Service Design ?</li>
                                        <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
                                        <li>4 Levels of Service Design in an Organization</li>
                                        <li>Scope of Service Design</li>
                                        <li>Improving Existing Services - Credit Cards</li>
                                        <li>Improving Existing Services - MK</li>
                                        <li>Levels of Impact</li>

                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>


                            <AccordionItem >
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            <div className="flex gap-4">
                                                <h1 className="text-headline3 font-headline3 text-gray-700" >03</h1>
                                                <h1 className="text-headline3 text-black  font-headline3">Understanding Users and Finding Opportunities</h1>
                                            </div>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4} className="w-[600px] ">
                                    <ul className="text-body2 font-body2 text-gray-700 list-disc px-[10%]" >
                                        <li >Welcome to the Course</li>
                                        <li>Course Overview</li>
                                        <li>Getting to Know You</li>
                                        <li>What is Service Design ?</li>
                                        <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
                                        <li>4 Levels of Service Design in an Organization</li>
                                        <li>Scope of Service Design</li>
                                        <li>Improving Existing Services - Credit Cards</li>
                                        <li>Improving Existing Services - MK</li>
                                        <li>Levels of Impact</li>

                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>


                            <AccordionItem >
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            <div className="flex gap-4">
                                                <h1 className="text-headline3 font-headline3 text-gray-700" >04</h1>
                                                <h1 className="text-headline3 text-black  font-headline3">Identifying and Validating Opportunities for Design</h1>
                                            </div>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4} className="w-[600px] ">
                                    <ul className="text-body2 font-body2 text-gray-700 list-disc px-[10%]" >
                                        <li >Welcome to the Course</li>
                                        <li>Course Overview</li>
                                        <li>Getting to Know You</li>
                                        <li>What is Service Design ?</li>
                                        <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
                                        <li>4 Levels of Service Design in an Organization</li>
                                        <li>Scope of Service Design</li>
                                        <li>Improving Existing Services - Credit Cards</li>
                                        <li>Improving Existing Services - MK</li>
                                        <li>Levels of Impact</li>

                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>


                            <AccordionItem >
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            <div className="flex gap-4">
                                                <h1 className="text-headline3 font-headline3 text-gray-700" >05</h1>
                                                <h1 className="text-headline3 text-black  font-headline3">Prototyping</h1>
                                            </div>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4} className="w-[600px] ">
                                    <ul className="text-body2 font-body2 text-gray-700 list-disc px-[10%]" >
                                        <li >Welcome to the Course</li>
                                        <li>Course Overview</li>
                                        <li>Getting to Know You</li>
                                        <li>What is Service Design ?</li>
                                        <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
                                        <li>4 Levels of Service Design in an Organization</li>
                                        <li>Scope of Service Design</li>
                                        <li>Improving Existing Services - Credit Cards</li>
                                        <li>Improving Existing Services - MK</li>
                                        <li>Levels of Impact</li>

                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>


                            <AccordionItem >
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            <div className="flex gap-4">
                                                <h1 className="text-headline3 font-headline3 text-gray-700" >06</h1>
                                                <h1 className="text-headline3 text-black  font-headline3">Course Summary</h1>
                                            </div>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4} className="w-[600px] ">
                                    <ul className="text-body2 font-body2 text-gray-700 list-disc px-[10%]" >
                                        <li >Welcome to the Course</li>
                                        <li>Course Overview</li>
                                        <li>Getting to Know You</li>
                                        <li>What is Service Design ?</li>
                                        <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
                                        <li>4 Levels of Service Design in an Organization</li>
                                        <li>Scope of Service Design</li>
                                        <li>Improving Existing Services - Credit Cards</li>
                                        <li>Improving Existing Services - MK</li>
                                        <li>Levels of Impact</li>

                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>

                        </Accordion>

                    </div>
                </div>

                {/*   section 2 */}

                <div className=" w-[357px] h-[450px] bg-white flex flex-col gap-6 p-3 pt-8  mt-24 rounded-lg shadow-shadow1  sticky top-0">
                    <div className="px-4 flex flex-col gap-4">
                        <div className="text-orange-500 font-body3">Course</div>
                        <div className="text-headline3 text-black font-body3">Service Design Essentials</div>
                        <div className="text-gray-700 text-body2">Lorem ipsum dolor sit amet consectetur  sit amet consectetur</div>
                        <div className=" text-headline3 font-headline3 text-gray-700 "> THB 3,559.00</div>
                    </div>
                    <hr className="h-[1px] bg-gray-300 mb-3" />

                    <div className="flex flex-col items-center gap-3">
                        <Button variant="secondary" className="w-[320px] " >Get in Desire Course</Button>

                        <Button variant="primary" onClick={onOpen} className="w-[320px] " >Subscribe This Course</Button>
                        <AlertDialog
                            motionPreset='slideInBottom'
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                            isOpen={isOpen}
                            isCentered
                        >
                            <AlertDialogOverlay />

                            <AlertDialogContent borderRadius={24}  >
                            <AlertDialogHeader className="text-body1 font-body1 text-black" >Confirmation</AlertDialogHeader>
                            <hr className="h-[1px] bg-gray-300 mb-3" />
                                <AlertDialogCloseButton />
                                <AlertDialogBody className="text-body2 font-body2 text-gray-700">
                                Do you sure to subscribe Service Design Essentials Course?
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button variant="secondary" ref={cancelRef} onClick={onClose}>
                                    No, I don’t
                                    </Button>
                                    <Button variant="primary" colorScheme='red' ml={3}>
                                    Yes, I want to subscribe
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
            <SubFooter />
            <Footer />
        </div>
    )
}

export default CourseDetailPage;