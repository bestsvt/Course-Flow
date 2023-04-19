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
  const userId = req.query.user

  try {
    const { data: course } = await supabase
      .from("courses")
      .select('* , lessons (* , sub_lessons(*))')
      .eq("course_id", courseId)

    let subscribeStatus;
    let desireStatus;

    if (userId) {
      // Check Subscription
      const { data: courseSubscription } = await supabase
      .from("subscriptions")
      .select()
      .match({"course_id": courseId, "user_id": userId});
      if (courseSubscription.length > 0) {
        subscribeStatus = true;
      } else {
        subscribeStatus = false;
      }

      // Check Desire
      const { data: courseDesire } = await supabase
      .from("desires")
      .select()
      .match({"course_id": courseId, "user_id": userId});
      if (courseDesire.length > 0) {
        desireStatus = true;
      } else {
        desireStatus = false;
      }

    }

    return res.json({
      data: course,
      subscribeStatus,
      desireStatus
    });
  } catch (error) {
    console.log("Get courses by id error:", error);
  }
}

async function postSubscriptionAndDesire(req, res) {
  const courseId = req.params.courseId;
  const userId = req.body.user_id;
  const status = req.body.status;
  const action = req.body.action;
  let msg;

  try {
    // Desire Function
    if (status === "desire") {
      if (action === "add") {
        await supabase
        .from("desires")
        .insert({ user_id:userId , course_id:courseId , status:true}) 
        msg = "The course has been added to your desired courses successfully!"
      } else if (action === "remove") {
        await supabase
        .from("desires")
        .delete()
        .match({"course_id": courseId, "user_id": userId});
        msg = "The course has been removed from your desired courses successfully!"
      }
    }

    // Subscribe Function
    if (status === "subscribe") {
      await supabase
        .from("desires")
        .delete()
        .match({"course_id": courseId, "user_id": userId});

      await supabase
      .from("subscriptions")
      .insert({ user_id:userId , course_id:courseId , status:true}) 
      msg = "The course has been successfully enrolled in."
    } 
    
    return res.json({
      message: msg,
    });
  } catch (error) {
    console.log("Post subscription and desire error:",error);
  }
}

async function getSubLessonById(req, res) {
  const courseId = req.params.courseId;
  const subLessonId = req.params.subLessonId;

  try {
    const { data: sub_lesson } = await supabase
    .from("sub_lessons")
    .select()
    .eq('sub_lesson_id', subLessonId)

    return res.json({
      data: sub_lesson
    });

  } catch (error) {
    console.log("get SubLesson By Id error:",error);
  }
  
}


export { getAllCourses, getCoursesById, postSubscriptionAndDesire, getSubLessonById };
