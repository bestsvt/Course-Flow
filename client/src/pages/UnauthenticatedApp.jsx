import { Routes, Route } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import LoginPage from "./LogingPage"
import NotFoundPage from "./NotFoundPage";
import OurCoursePage from "./OurCoursePage";
import CourseDetailPage from "./CourseDetailPage";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/courses" element={<OurCoursePage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
