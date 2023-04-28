import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import NotFoundPageAdmin from "./NotFoundPageAdmin";

function UnauthenticatedAdminApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPageAdmin />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedAdminApp;
