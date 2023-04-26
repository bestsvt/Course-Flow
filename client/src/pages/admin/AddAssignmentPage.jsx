import React from 'react'
import SidebarAdmin from '../../components/SidebarAdmin';
import TopbarAdmin from '../../components/TopbarAdmin';
import { Button } from "@chakra-ui/react";

const AddAssignmentPage = () => {
  return (
    <div className='flex '>
    <SidebarAdmin/> 
    <div>
    <TopbarAdmin name="Course"><Button className=''>click</Button></TopbarAdmin>
      <div>AddAssignmentPage</div>

    </div>

    </div>
  )
}

export default AddAssignmentPage