import { Button } from "@chakra-ui/react";

function Navbar() {


  return (
      
    <div className="flex flex-row px-[10%] justify-between h-[88px] items-center shadow-shadow2 z-5 relative">
      <img src="./image/logo/CourseFlow.png" className="w-[200px]" alt="logo"/>
      <div className="flex justify-between w-[300px] items-center">
        <div className="text-[#191C77] font-bold">Our Courses</div>
        <Button variant='primary'>Log in</Button>
      </div>
    </div>
    
  );
}

export default Navbar;
