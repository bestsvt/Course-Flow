import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useCourses = () => {
  const [courses, setCourses] = useState();
  const [course, setCourse] = useState();
  const [totalCourses, setTotalCourses] = useState();
  const [desireCourse, setDesireCourse] = useState();
  const [suggest, setSuggest] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  async function getCourses(keyword, currentPage) {
    try {
      // ตัว isLoading เอาไว้ แสดง Spinner ตอนโหลด
      setIsLoading(true);
      // เช็คว่ามี keyword เข้ามาไหม ถ้าไม่มีให้ใส่เป็น ""
      if (!keyword) {
        keyword = "";
      }
      // ใช้แบบนี้เผื่อกรณีต้องการเพิ่ม keyword อีกจะได้เขียนไม่เยอะ เช่น page
      const query = new URLSearchParams();
      query.append("keyword", keyword);
      query.append("currentPage", currentPage);
      const results = await axios.get(
        `http://localhost:4000/courses?${query.toString()}`
      );
      setIsLoading(false);
      setCourses(results.data.data);
      setTotalCourses(results.data.allCourses.length)
    } catch (error) {
      console.log("Get courses error:", error);
    }
  };

  async function getCoursesSuggest(suggestWord) {
    try {
      const query = new URLSearchParams();
      query.append("keyword", suggestWord);
      const results = await axios.get(
        `http://localhost:4000/courses?${query.toString()}`
      );
      setSuggest(results.data.allCourses);
    } catch (error) {
      console.log("Get courses suggest error:", error);
    }
  };

  async function getCoursesById(userId) {
    try {
      setIsLoading(true);
      let api;
      if (userId) {
        api = `http://localhost:4000/courses/${params.courseId}?user=${userId}`
      } else {
        api = `http://localhost:4000/courses/${params.courseId}`
      }
      const results = await axios.get(api);
      setIsLoading(false);
      setCourse(results.data.data[0]);
      return results
    } catch (error) {
      console.log("Get courses by id error:", error);
    }
  }

  // This function using only learning page (for update status progress)
  async function getCoursesByIdWithOutLoading(userId) {
    try {
      const results = await axios.get(`http://localhost:4000/courses/${params.courseId}?user=${userId}`);
      setCourse(results.data.data[0]);
      return results
    } catch (error) {
      console.log("Get courses by id error:", error);
    }
  }

  async function getDesireCourses(userId, currentPage) {
    try {
      setIsLoading(true);
      const query = new URLSearchParams();
      query.append("user", userId);
      query.append("currentPage", currentPage);
      const results = await axios.get(`http://localhost:4000/user/desire?${query.toString()}`);
      setDesireCourse(results.data.data);
      setTotalCourses(results.data.desireCourses.length)
      setIsLoading(false);
    } catch (error) {
      console.log("Get desire courses error:", error);
    }
  }

  async function getSubLessonById(user_id) {
    try {
      setIsLoading(true);
      const results = await axios.get(`http://localhost:4000/courses/${params.courseId}/learning/${params.subLessonId}?user=${user_id}`);
      setIsLoading(false);
      return results.data
    } catch (error) {
      console.log("Get sub-lesson by id error:", error);
    }
  }

  async function getSubLessonByIdWithOutLoading(user_id) {
    try {
      const results = await axios.get(`http://localhost:4000/courses/${params.courseId}/learning/${params.subLessonId}?user=${user_id}`);
      return results.data
    } catch (error) {
      console.log("Get sub-lesson by id error:", error);
    }
  }

  async function postLearningSublessonAndCreateAssignment(data, sub_lesson_id, user_id) {
    try {
      const result = await axios.post(`http://localhost:4000/courses/${course.course_id}/learning/${sub_lesson_id}?user=${user_id}`, data)
      return result
    } catch (error) {
      console.log("post Learning Sub lesson error:", error);
    }
  }
  async function postSubmittedAssignments(data, assignment_id, user_id) {
    try {
      const result = await axios.put(`http://localhost:4000/assignments/${assignment_id}?user=${user_id}`, data)
      return result
    } catch (error) {
      console.log("post Learning Sub lesson error:", error);
    }
  }

  return {
    courses,
    getCourses,
    getCoursesSuggest,
    suggest,
    isLoading,
    getCoursesById,
    course,
    getDesireCourses,
    desireCourse,
    getSubLessonById,
    getSubLessonByIdWithOutLoading,
    postLearningSublessonAndCreateAssignment,
    getCoursesByIdWithOutLoading,
    totalCourses,
    postSubmittedAssignments
  };
};

export default useCourses;
