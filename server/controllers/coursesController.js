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
    const { data: course, error } = await supabase
      .from("courses")
      .select('* , lessons (* , sub_lessons(*, users_sub_lessons(*)))')
      .eq("course_id", courseId)
      .eq("lessons.sub_lessons.users_sub_lessons.user_id", userId)
      .order('lesson_id', { foreignTable: 'lessons', ascending: true })

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

    // For Button Previous - Next in Learning Page
    
    const { data: allLessons } = await supabase
      .from("getallofcourses")
      .select('course_id, lesson_id, sub_lesson_id')
      .eq('course_id',courseId)
      .order('lesson_id', { ascending: true })
      .order('sub_lesson_id', { ascending: true })

    return res.json({
      data: course,
      subscribeStatus,
      desireStatus,
      allLessons
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
  const userId = req.query.user
  
  try {
    const { data: sub_lesson } = await supabase
    .from("sub_lessons")
    .select('*, users_sub_lessons(*) ')
    .eq('sub_lesson_id', subLessonId)
    .eq('users_sub_lessons.user_id', userId)
    
    return res.json({
      data: sub_lesson
    });

  } catch (error) {
    console.log("get SubLesson By Id error:",error);
  }
}

async function postLearningSublesson (req, res) {
  const courseId = req.params.courseId;
  const subLessonId = req.params.subLessonId;
  const userId = req.query.user;
  const status = req.body.status;
  const action = req.body.action;
  const current_time = req.body.current_time;
  
  try {
    let updateStatus;
    const { data } = await supabase
      .from("users_sub_lessons")
      .select()
      .match({user_id: userId , sub_lesson_id: subLessonId})
    
    if (action == 'play' && status !== 'complete' && data.length == 0) {
      updateStatus = {user_id: userId , sub_lesson_id: subLessonId, current_time: current_time, status: status};
      await supabase
      .from("users_sub_lessons")
      .insert(updateStatus)
    } else if (action == 'pause') {
      updateStatus = {current_time: current_time, updated_at: new Date() }
      await supabase
        .from("users_sub_lessons")
        .update(updateStatus)
        .match({user_id: userId , sub_lesson_id: subLessonId})
    } else if (action == 'end') {
      updateStatus = {current_time: current_time, updated_at: new Date(), status: status}
      await supabase
        .from("users_sub_lessons")
        .update(updateStatus)
        .match({user_id: userId , sub_lesson_id: subLessonId})
    }

    return res.json({
      message: "Insert or Update successfully",
    });
  } catch (error) {
    console.log("post Learning Sub lesson error:",error);
  }
}

async function getLastSubLesson(req, res) {
  const courseId = req.params.courseId;
  const userId = req.query.user
  
  try {
    let lastSubLesson;

    const { data: last_sub_lesson } = await supabase
    .from("lastestsublesson")
    .select()
    .match({'course_id':courseId, 'user_id':userId})
    .order('updated_at', { ascending: false })
    .limit(1)

    if (last_sub_lesson.length > 0) {
      lastSubLesson = last_sub_lesson[0].sub_lesson_id
    } else {
      const { data: first_sub_lesson } = await supabase
      .from("getallofcourses")
      .select()
      .eq('course_id',courseId)
      .order('lesson_id', { ascending: true })
      .order('sub_lesson_id', { ascending: true })
      .limit(1)
      lastSubLesson = first_sub_lesson[0].sub_lesson_id
    }

    return res.json({
      lastSubLesson: lastSubLesson
    });

  } catch (error) {
    console.log("get SubLesson By Id error:",error);
  }
}
  
    
export {
  getAllCourses,
  getCoursesById,
  postSubscriptionAndDesire,
  getSubLessonById,
  postLearningSublesson,
  getLastSubLesson,
};
