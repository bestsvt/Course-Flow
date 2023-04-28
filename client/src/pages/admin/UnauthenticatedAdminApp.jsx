import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "./AdminLoginPage";
import NotFoundPageAdmin from "./NotFoundPageAdmin";

function UnauthenticatedAdminApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="*" element={<NotFoundPageAdmin />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedAdminApp;
