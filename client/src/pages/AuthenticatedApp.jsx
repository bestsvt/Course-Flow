import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import UserProfilePage from "./UserProfilePage";
import OurCoursePage from "./OurCoursePage";
import MyCoursePage from "./MyCoursePage";
import CourseDetailPage from "./CourseDetailPage";
import DesireCoursePage from "./DesireCoursePage";
import CourseLearningPage from "./CourseLearningPage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/courses" element={<OurCoursePage />} />
        <Route path="/mycourses" element={<MyCoursePage />} />
        <Route path="/desire" element={<DesireCoursePage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/courses/:courseId/learning/:subLessonId" element={<CourseLearningPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
