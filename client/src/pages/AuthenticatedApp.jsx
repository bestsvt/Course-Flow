import { Routes, Route } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import LoginPage from "./LogingPage"

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
