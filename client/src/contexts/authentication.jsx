import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const navigate = useNavigate();
  const [userAuthState, setUserAuthState] = useState({
    error: null,
    user: null,
  });

  const login = async (data) => {
    try {
      const result = await axios.post("http://localhost:4000/auth/login", data);
      return result
    } catch (error) {
      console.log("Login Error", error);
      alert("Oops, it looks like an error has occurred. Please try again later.")
    }
  };

  // register the user
  const registration = async (data) => {
    try {
      const result = await axios.post("http://localhost:4000/auth/register", data);
      return result
    } catch (error) {
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
  
  // —————————————————— Admin Section ——————————————————

  const [adminAuthState, setAdminAuthState] = useState({ user: null });
  
  // Login Admin
  const loginAdmin = async (data) => {
    try {
      // Start Coding Here

    } catch (error) {
      console.log("Login Admin Error", error);
      alert("Oops, it looks like an error has occurred. Please try again later.")
    }
  };

  // Logout Admin
  const logoutAdmin = () => {
      // Start Coding Here
  };

  // Check Admin logged in ?
  const isAdminAuthenticated = Boolean(localStorage.getItem("tokenAdmin"));
  
  return (
    <AuthContext.Provider
      value={{ userAuthState, setUserAuthState, login, logout, registration, isAuthenticated, loginAdmin, logoutAdmin, isAdminAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };