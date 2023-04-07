import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
