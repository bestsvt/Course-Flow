import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import UserProfilePage from "./UserProfilePage";
import OurCoursePage from "./OurCoursePage";
import MyCoursePage from "./MyCoursePage";
import CourseDetailPage from "./CourseDetailPage";
import DesireCoursePage from "./DesireCoursePage";
import CourseLearningPage from "./CourseLearningPage";
import MyAssignmentPage from "./MyAssignmentPage";
import LoginPage from "./admin/LoginPage";
import EditLessonPage from "./admin/EditLessonPage";
import EditCoursePage from './admin/EditCoursePage';
import EditAssignmentPage from './admin/AddAssignmentPage';
import CourseListPage from './admin/CourseListPage';
import AssignmentListPage from './admin/AssignmentListPage';
import AddLessonPage from './admin/AddLessonPage';
import AddCoursePage from './admin/AddCoursePage';
import AddAssignmentPage from "./admin/AddAssignmentPage";

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
        <Route path="/myassignments" element={<MyAssignmentPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* <Route path="/admin/" element={<LoginPage />} />
        <Route path="/admin/editlesson" element={<EditLessonPage />} />
        <Route path="/admin/editcourse" element={<EditCoursePage />} />
        <Route path="/admin/editassignment" element={<EditAssignmentPage />} />
        <Route path="/admin/courselist" element={<CourseListPage />} />
        <Route path="/admin/assignmentlist" element={<AssignmentListPage />} />
        <Route path="/admin/addlesson" element={<AddLessonPage />} />
        <Route path="/admin/addcourse" element={<AddCoursePage />} />
        <Route path="/admin/addassignment" element={<AddAssignmentPage />} /> */}

      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
