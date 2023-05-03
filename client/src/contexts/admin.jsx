import React, { useState } from "react";

const AdminContext = React.createContext();

function AdminProvider(props) {

  const [adminCourse, setAdminCourse] = useState({
    category: '',
    course_detail: '',
    course_name: '',
    cover_image: '',
    cover_image_file: null,
    learning_time: '',
    lesson: [],
    price: '',
    summary: '',
    video: '',
    video_file: null
  })
  const [adminLesson, setAdminLesson] = useState([])
  const [adminLessonField, setAdminLessonFiled] = useState({ name: '' })



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