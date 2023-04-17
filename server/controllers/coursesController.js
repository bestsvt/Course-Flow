import { supabase } from "../utils/db.js";

async function getAllCourses(req, res) {
  const keyword = req.query.keyword;

  try {
    const { data: AllCourse } = await supabase
      .from("courses")
      .select()
      .ilike("name", `%${keyword}%`)
      .order("course_id", { ascending: true });

    return res.json({
      data: AllCourse,
    });
  } catch (error) {
    console.log("Get all courses error:", error);
  }
}

async function getCoursesById(req, res) {

  const courseId = req.params.courseId

  try {
    const { data: course } = await supabase
      .from("courses")
      .select()
      .eq('course_id', courseId)

    return res.json({
      data: course,
    });
  } catch (error) {
    console.log("Get courses by id error:", error);
  }
}



export { getAllCourses , getCoursesById };
