import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const navigate = useNavigate();

  // ระบบ Login ยังไม่ทำ
  const login = async (data) => {
    // try {
    //   setState({ ...state, error: null, loading: true });
    //   const result = await axios.post("http://localhost:4000/auth/login", data);
    //   const token = result.data.token;
    //   localStorage.setItem("token", token);
    //   const userDataFromToken = jwtDecode(token);
    //   setState({ ...state, user: userDataFromToken });
    //   navigate("/");
    // } catch (error) {
    //   setState({
    //     ...state,
    //     error: error.response.data.message,
    //     loading: false,
    //   });
    // }
  };

  // register the user
  const registration = async (data) => {
    await axios.post("http://localhost:4000/auth/register", data);
    navigate("/login");
  };

  // ระบบ Logout ยังไม่ทำ
  const logout = () => {
  };
  // ระบบเช็ค Login - Logout
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, login, logout, registration, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };