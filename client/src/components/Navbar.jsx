import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import { HiOutlineUser, HiOutlineBookOpen, HiOutlineClipboardCheck } from 'react-icons/hi';
import { FaRegStar } from 'react-icons/fa';
import { BiLogIn } from 'react-icons/bi';
import { AiFillCaretDown } from 'react-icons/ai';



function Navbar() {
  const { isAuthenticated, userAuthState, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex flex-row px-[10%] justify-between h-[88px] items-center shadow-shadow2 relative">
      <img src="./image/logo/CourseFlow.png" className="w-[200px] hover:cursor-pointer" alt="logo" onClick={() => { navigate("/") }} />
      <div className="flex justify-between items-center gap-5">
        <div className="text-[#191C77] font-bold">Our Courses</div>
        {isAuthenticated ?
          <div>
            <Menu>
              <MenuButton
                px={4}
                py={2}>
                <div className="flex flex-row items-center justify-center gap-4">
                  <Image
                    boxSize='2.5rem'
                    borderRadius='full'
                    alt='profile-image'
                    src={userAuthState.user.profile_image ? 
                      userAuthState.user.profile_image.url : 
                      './image/homepage/navbar/profile-image-default.jpg'
                    }
                    className="object-cover"
                  />
                  <span className="text-body2 font-body2 text-gray-800">{userAuthState.user.name}</span> <AiFillCaretDown />
                </div>
              </MenuButton>
              <MenuList>
                <MenuItem icon={<HiOutlineUser className="text-blue-300 text-lg" />} onClick={() => { navigate("/profile")}}>
                  <p className="text-gray-700 font-headline1">Profile</p>
                </MenuItem>
                <MenuItem icon={<HiOutlineBookOpen className="text-blue-300 text-lg" />} >
                  <p className="text-gray-700 font-headline1">My Courses</p>
                </MenuItem>
                <MenuItem icon={<HiOutlineClipboardCheck className="text-blue-300 text-lg" />} >
                  <p className="text-gray-700 font-headline1">My Homework</p>
                </MenuItem>
                <MenuItem icon={<FaRegStar className="text-blue-300 text-lg" />} >
                  <p className="text-gray-700 font-headline1">My Desire Courses</p>
                </MenuItem>
                <MenuDivider />
                <MenuItem icon={<BiLogIn className="text-gray-700 text-lg" />} onClick={logout} >
                  <p className="text-gray-700 font-headline1">Log out</p>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          :
          <Button variant='primary' onClick={() => { navigate("/login") }}>Log in</Button>}
      </div>
    </div>
  );
}

export default Navbar;
