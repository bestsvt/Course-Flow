import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./configs/theme";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authentication";
import jwtInterceptor from "./utils/jwtInterceptors.js";
import AppAdmin from "./AppAdmin";
import { AdminProvider } from "./contexts/admin";

jwtInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
          <AuthProvider>
            <AdminProvider>
              <Routes>
                <Route path="/*" element={<App />}/>
                <Route path="/admin/*" element={<AppAdmin />}/>
              </Routes>
            </AdminProvider>
          </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  // </React.StrictMode>
);


