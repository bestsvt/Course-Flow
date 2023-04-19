import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useCourses = () => {
  const [courses, setCourses] = useState();
  const [course, setCourse] = useState();
  const [desireCourse, setDesireCourse] = useState();
  const [suggest, setSuggest] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  async function getCourses (keyword) {
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
      const results = await axios.get(
        `http://localhost:4000/courses?${query.toString()}`
      );
      setIsLoading(false);
      setCourses(results.data.data);
    } catch (error) {
      console.log("Get courses error:", error);
    }
  };

  async function getCoursesSuggest (suggestWord) {
    try {
      const query = new URLSearchParams();
      query.append("keyword", suggestWord);
      const results = await axios.get(
        `http://localhost:4000/courses?${query.toString()}`
      );
      setSuggest(results.data.data);
    } catch (error) {
      console.log("Get courses suggest error:", error);
    }
  };

  async function getCoursesById(userId) {
    // ต้องมาเพิ่มกรณีที่ user คนนั้น sub แล้วหรือยังทีหลัง
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

  async function getDesireCourses(userId) {
    try {
      setIsLoading(true);
      const results = await axios.get(`http://localhost:4000/user/desire?user=${userId}`);
      setIsLoading(false);
      setDesireCourse(results.data.data);
    } catch (error) {
      console.log("Get desire courses error:", error);
    }
  }

  async function getSubLessonById() {
    try {
      setIsLoading(true);
      const results = await axios.get(`http://localhost:4000/courses/${params.courseId}/learning/${params.subLessonId}`);
      setIsLoading(false);
      return results.data.data[0]
    } catch (error) {
      console.log("Get sub-lesson by id error:", error);
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
  };
};

export default useCourses;
