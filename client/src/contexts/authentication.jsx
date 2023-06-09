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
    previousURL: null,
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
    setUserAuthState({ ...userAuthState, user: null, previousURL: null,})
    navigate("/");
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

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
      const result = await axios.post("http://localhost:4000/auth/loginAdmin", data);
      return result

    } catch (error) {
      console.log("Login Admin Error", error);
      alert("Oops, it looks like an error has occurred. Please try again later.")
    }
  };

  // Logout Admin
  const logoutAdmin = () => {
    localStorage.removeItem("tokenAdmin")
    setAdminAuthState({ ...adminAuthState, user: null })
    navigate("/admin");
  };

  // Check Admin logged in ?
  const isAdminAuthenticated = Boolean(localStorage.getItem("tokenAdmin"));

  if (isAdminAuthenticated && !adminAuthState.user) {
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    const adminDataFromToken = jwtDecode(tokenAdmin);
    setAdminAuthState({ ...adminAuthState, user: adminDataFromToken });
  }

  return (
    <AuthContext.Provider
      value={{ userAuthState, setUserAuthState, login, logout, registration, isAuthenticated, loginAdmin, logoutAdmin, isAdminAuthenticated , adminAuthState , setAdminAuthState}}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };