import { Text, Button} from "@chakra-ui/react";

function Navbar() {
  return (
    <div className="flex flex-row bg-blue-300  px-[10%]  py-[2%] justify-between w-[1440px] h-[88px] items-center">
      <Text className="text-headline2 fontWeight-headline2" shadow='shadow1'>CourseFlow</Text>
      <div className="flex justify-between w-[300px] items-center">
        <h1 className="text-[#191C77] font-bold">Our Courses</h1>
        <Button variant='primary'> Log in</Button>
      </div>
    </div>
  );
}

export default Navbar;
