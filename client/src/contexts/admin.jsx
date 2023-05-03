import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AdminContext = React.createContext();

function AdminProvider(props) {

  const [adminCourse, setAdminCourse] = useState({
    category: '',
    course_detail: '',
    course_name: '',
    cover_image: '',
    cover_image_file: '',
    learning_time: '',
    lesson: '',
    price: '',
    summary: '',
    testeieiei: '',
    video: '',
    video_file: ''
  })
  const [adminLesson, setAdminLesson] = useState([])
  const [adminLessonField, setAdminLessonFiled] = useState({})



  return (
    <AdminContext.Provider
      value={{
        adminCourse,
        setAdminCourse,
        adminLesson,
        setAdminLesson,
        adminLessonField,
        setAdminLessonFiled
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAdmin = () => React.useContext(AdminContext);

export { AdminProvider, useAdmin };