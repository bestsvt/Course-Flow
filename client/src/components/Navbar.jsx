import { Text, Button } from "@chakra-ui/react";

function Navbar() {


  return (
      
    <div className="flex flex-row  px-[10%]  py-[2%] justify-between w-[1440px] h-[88px] items-center shadow-md">
      <Text className="text-body1 font-bold" 
      bgGradient='linear-gradient(90deg, #95BEFF, #0040E5)'
      bgClip='text'
      >
        CourseFlow
        </Text>
      <div className="flex justify-between w-[300px] items-center">
        <div className="text-[#191C77] font-bold">Our Courses</div>
        <Button variant='primary'>Log in</Button>
      </div>
    </div>
    
  );
}

export default Navbar;
