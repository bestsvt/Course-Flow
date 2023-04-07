import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";


function Navbar() {
  const { isAuthenticated , userAuthState , logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex flex-row px-[10%] justify-between h-[88px] items-center shadow-shadow2 relative">
      <img src="./image/logo/CourseFlow.png" className="w-[200px]" alt="logo" onClick={() => {navigate("/")}}/>
      <div className="flex justify-between w-[300px] items-center">
        <div className="text-[#191C77] font-bold">Our Courses</div>
        {isAuthenticated ? 
        // image + name + drowdown
        <div className="flex">
          <Button variant='primary' onClick={logout}>Logout</Button>
        </div>
        : 
        <Button variant='primary' onClick={() => {navigate("/login")}}>Log in</Button>}
      </div>
    </div>
  );
}

export default Navbar;
