import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./configs/theme";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authentication";
import jwtInterceptor from "./utils/jwtInterceptors.js";
import ScrollToTop from "./utils/scrollToTop";

jwtInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ScrollToTop>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ScrollToTop>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
