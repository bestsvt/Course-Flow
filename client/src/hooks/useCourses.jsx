import { useState } from "react";
import axios from "axios";

const useCourses = () => {
  const [courses, setCourses] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getCourses = async (keyword) => {
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

  return { courses, getCourses, isLoading };
};

export default useCourses;
