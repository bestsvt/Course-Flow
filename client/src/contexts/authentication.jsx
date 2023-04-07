import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [userAuthState, setUserAuthState] = useState({
    error: null,
    user: null,
  });

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const result = await axios.post("http://localhost:4000/auth/login", data);
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setUserAuthState({ ...userAuthState, user: userDataFromToken });
      navigate("/");
    } catch (error) {
      setUserAuthState({
        ...userAuthState,
        error: error.response.data.message,
      });
      console.log("Login Error", error);
      alert("Oops, it looks like an error has occurred. Please try again later.")
    }
  };

  // register the user
  const registration = async (data) => {
    try {
      await axios.post("http://localhost:4000/auth/register", data);
      navigate("/login");
    } catch (error) {
      console.log("Resgister Error ",error);
      alert("Oops, it looks like an error has occurred. Please try again later.")
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem("token")
	  setUserAuthState({ ...userAuthState, user: null })
    navigate("/");
  };
  
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  // When Refresh state.user will change to Null
  // Check ว่าเข้าสู่ระบบยัง แล้ว state.user ว่างเปล่าไหม
  // ถ้าใช่ให้มันใส่ข้อมูลกลับเข้าไปใหม่
  if (isAuthenticated && !userAuthState.user) {
    const token = localStorage.getItem("token");
    const userDataFromToken = jwtDecode(token);
    setUserAuthState({ ...userAuthState, user: userDataFromToken });
  }
  

  return (
    <AuthContext.Provider
      value={{ userAuthState, login, logout, registration, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };