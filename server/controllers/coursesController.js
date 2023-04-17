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
  const courseId = req.params.courseId;

  try {
    const { data: course } = await supabase
      .from("courses")
      .select()
      .eq("course_id", courseId);

    return res.json({
      data: course,
    });
  } catch (error) {
    console.log("Get courses by id error:", error);
  }
}

async function postSubscription(req, res) {
  const courseId = req.params.courseId;
  const userId = req.body.user_id;


  try {
    const { data: course } = await supabase
    .from("subscriptions")
    .insert({ user_id:userId , course_id:courseId , status:true}) 

    return res.json({
      message: "subscriptions แล้วนะ",
    });
  } catch (error) {
    console.log(error);
  }





}

export { getAllCourses, getCoursesById, postSubscription };
