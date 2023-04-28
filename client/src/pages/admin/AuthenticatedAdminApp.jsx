import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import EditLessonPage from "./EditLessonPage";
import EditCoursePage from './EditCoursePage';
import EditAssignmentPage from './EditAssignmentPage';
import CourseListPage from './CourseListPage';
import AssignmentListPage from './AssignmentListPage';
import AddLessonPage from './AddLessonPage';
import AddCoursePage from './AddCoursePage';
import AddAssignmentPage from "./AddAssignmentPage";
import NotFoundPageAdmin from "./NotFoundPageAdmin";

function AuthenticatedAdminApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/editlesson" element={<EditLessonPage />} />
        <Route path="/editcourse" element={<EditCoursePage />} />
        <Route path="/editassignment" element={<EditAssignmentPage />} />
        <Route path="/courselist" element={<CourseListPage />} />
        <Route path="/assignmentlist" element={<AssignmentListPage />} />
        <Route path="/addlesson" element={<AddLessonPage />} />
        <Route path="/addcourse" element={<AddCoursePage />} />
        <Route path="/addassignment" element={<AddAssignmentPage />} />
        <Route path="*" element={<NotFoundPageAdmin />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedAdminApp;
