import { supabase } from "../utils/db.js";

async function getAllCourses(req, res) {
    const keyword = req.query.keyword;
    const currentPage = req.query.currentPage
    const itemsPerPage = 8;
    const offset = (currentPage - 1) * itemsPerPage;
  
    try {
      const { data: allCourses } = await supabase
        .from("getallcourses")
        .select()
        .ilike("name", `%${keyword}%`)
        .order("created_at", { ascending: true })
  
      const { data: allCoursesWithPage } = await supabase
        .from("getallcourses")
        .select()
        .ilike("name", `%${keyword}%`)
        .order("created_at", { ascending: true })
        .range(offset, offset + itemsPerPage - 1);
        
      return res.json({
        data: allCoursesWithPage,
        allCourses
      });
    } catch (error) {
      console.log("Get all courses error:", error);
    }
  }

  async function deleteCourse(req, res) {
    const courseId = req.params.courseId;

    try {
      // await supabase
      //   .from('courses')
      //   .delete()
      //   .eq('course_id', courseId)

      return res.json({
        message: 'Course deleted successfully!'
      });
    } catch (error) {
      console.log("Delete course error:", error);
    }
  }

  async function updateCourse(req, res) {
    const courseId = req.params.courseId;

    try {

      

      return res.json({
        message: 'Course updated successfully!'
      });
    } catch (error) {
      console.log("Delete course error:", error);
    }
  }

export { getAllCourses , deleteCourse , updateCourse};