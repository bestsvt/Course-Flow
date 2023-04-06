import { Routes, Route } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
