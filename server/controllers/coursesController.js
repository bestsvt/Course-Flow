import { supabase } from "../utils/db.js";

async function getAllCourses(req, res) {
  const keyword = req.query.keyword;
  const currentPage = req.query.currentPage
  const itemsPerPage = 9;
  const offset = (currentPage - 1) * itemsPerPage;

  try {
    const { data: allCourses } = await supabase
      .from("courses")
      .select()
      .ilike("name", `%${keyword}%`)
      .order("course_id", { ascending: true })

    const { data: allCoursesWithPage } = await supabase
      .from("courses")
      .select()
      .ilike("name", `%${keyword}%`)
      .order("course_id", { ascending: true })
      .range(offset, offset + itemsPerPage - 1);
      
    return res.json({
      data: allCoursesWithPage,
      allCourses
    });
  } catch (error) {
    console.log("Get all courses error:", error);
  }
}

async function getCoursesById(req, res) {
  const courseId = req.params.courseId;
  const userId = req.query.user;

  try {

  let course;
  let subscribeStatus;
  let desireStatus;
  let totalProgress;

  if (userId) {

    // Get Courses if logged in
    const { data: result, error:errorCourse } = await supabase
      .from("courses")
      .select("* , lessons (* , sub_lessons(*, users_sub_lessons(*)))")
      .eq("course_id", courseId)
      .eq("lessons.sub_lessons.users_sub_lessons.user_id", userId)
    course = result;

    // Check Subscription
    const { data: courseSubscription } = await supabase
      .from("subscriptions")
      .select()
      .match({ course_id: courseId, user_id: userId });
    if (courseSubscription.length > 0) {
      subscribeStatus = true;
    } else {
      subscribeStatus = false;
    }

    // Check Desire
    const { data: courseDesire } = await supabase
      .from("desires")
      .select()
      .match({ course_id: courseId, user_id: userId });
    if (courseDesire.length > 0) {
      desireStatus = true;
    } else {
      desireStatus = false;
    }

    // For Progress bar
    const { data: progress } = await supabase
      .from("lastestsublesson")
      .select()
      .match({ course_id: courseId, user_id: userId, status: "complete" });
    const { data: totalSubLesson } = await supabase
      .from("count_sub_lessons")
      .select()
      .eq("course_id", courseId);

    totalProgress = (progress.length / totalSubLesson[0].sub_lessons_count) * 100;
    
    if (totalProgress == 100) {
    await supabase
      .from("subscriptions")
      .update({ status: "complete" })
      .match({ course_id: courseId, user_id: userId });
  }

  } else {
      // if not logged in just get course
      const { data: result } = await supabase
      .from("courses")
      .select("* , lessons (* , sub_lessons(*, users_sub_lessons(*)))")
      .eq("course_id", courseId)
      .order("lesson_id", { foreignTable: "lessons", ascending: true });
      course = result;
    }

    // For Button Previous - Next in Learning Page
    const { data: allLessons } = await supabase
      .from("getallofcourses")
      .select("course_id, lesson_id, sub_lesson_id")
      .eq("course_id", courseId)
      .order("lesson_id", { ascending: true })
      .order("sub_lesson_id", { ascending: true });

      return res.json({
      data: course,
      subscribeStatus,
      desireStatus,
      allLessons,
      totalProgress,
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
          .insert({ user_id: userId, course_id: courseId });
        msg = "The course has been added to your desired courses successfully!";
      } else if (action === "remove") {
        await supabase
          .from("desires")
          .delete()
          .match({ course_id: courseId, user_id: userId });
        msg =
          "The course has been removed from your desired courses successfully!";
      }
    }

    // Subscribe Function
    if (status === "subscribe") {
      await supabase
        .from("desires")
        .delete()
        .match({ course_id: courseId, user_id: userId });

      await supabase
        .from("subscriptions")
        .insert({ user_id: userId, course_id: courseId });
      msg = "The course has been successfully enrolled in.";
    }

    return res.json({
      message: msg,
    });
  } catch (error) {
    console.log("Post subscription and desire error:", error);
  }
}

async function getSubLessonById(req, res) {
  const courseId = req.params.courseId;
  const subLessonId = req.params.subLessonId;
  const userId = req.query.user;

  try {
    const { data: sub_lesson } = await supabase
      .from("sub_lessons")
      .select("*, users_sub_lessons(*) ")
      .eq("sub_lesson_id", subLessonId)
      .eq("users_sub_lessons.user_id", userId);

    const { data: assignment } = await supabase
      .from("sub_lessons")
      .select("*, assignments (*, users_assignments(*)) ")
      .eq("sub_lesson_id", subLessonId)
      .eq("assignments.users_assignments.user_id", userId)

    function checkDeadLine(createDate, duration) {
      const createTime = new Date(createDate);
      const dueDate = new Date(createTime.getTime() + duration * 24 * 60 * 60 * 1000);
      const timeDiff = dueDate.getTime() - new Date().getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff
    }

    if (assignment[0].assignments.length > 0) {
      // Check ว่ามี assignments อยู่แล้วหรือยัง
      if (assignment[0].assignments[0].users_assignments.length > 0) {
        const status = assignment[0].assignments[0].users_assignments[0].status;
        const duration = assignment[0].assignments[0].duration
        const countDeadline = checkDeadLine(assignment[0].assignments[0].users_assignments[0].created_at,assignment[0].assignments[0].duration)
        const daysAfterCreated = (new Date() - new Date(assignment[0].assignments[0].users_assignments[0].created_at))/(1000 * 60 * 60 * 24)
        assignment[0].assignments[0].countDeadline = countDeadline
        // Check ว่าสร้างมาแล้วกี่วัน มากกว่า duration ของ assignment ไหม
        // และมี status ต้องไม่เท่ากับ overdue / submitted
        if (daysAfterCreated >= duration && status !== 'overdue' && status !== 'submitted' && status !== 'submitted late') {
          await supabase
            .from("users_assignments")
            .update({ status: "overdue", updated_at: new Date()})
            .eq('user_assignment_id', assignment[0].assignments[0].users_assignments[0].user_assignment_id);
        }
      }
    }

    return res.json({
      data: sub_lesson,
      assignment: assignment[0],
    });
  } catch (error) {
    console.log("get SubLesson By Id error:", error);
  }
}

async function postLearningSublessonAndCreateAssignment(req, res) {
  const courseId = req.params.courseId;
  const subLessonId = req.params.subLessonId;
  const userId = req.query.user;
  let status = req.body.status;
  const action = req.body.action;
  const current_time = req.body.current_time;
  let msg;

  try {
    let updateStatus;
    const { data } = await supabase
      .from("users_sub_lessons")
      .select()
      .match({ user_id: userId, sub_lesson_id: subLessonId });

    if (action == "play" && status !== 'watched' && status !== "complete" && data.length == 0) {
      updateStatus = {
        user_id: userId,
        sub_lesson_id: subLessonId,
        current_time: current_time,
        status: status,
      };
      await supabase.from("users_sub_lessons").insert(updateStatus);
      msg = "Insert successfully"
    } else if (action == "pause") {
      updateStatus = { current_time: current_time, updated_at: new Date() };
      await supabase
        .from("users_sub_lessons")
        .update(updateStatus)
        .match({ user_id: userId, sub_lesson_id: subLessonId });
      msg = "Update successfully"
    } else if (action == "end") {
      // Check this sub-lesson have assignments or not
      const { data: assignments } = await supabase
        .from("assignments")
        .select()
        .eq('sub_lesson_id', subLessonId);
      // if not have assignment let status complelte
      if (assignments.length == 0) {
        status = 'complete'
      }
      // if have assignment let status watched
      updateStatus = {
        current_time: current_time,
        updated_at: new Date(),
        status: status,
      };
      await supabase
        .from("users_sub_lessons")
        .update(updateStatus)
        .match({ user_id: userId, sub_lesson_id: subLessonId });
      msg = "Update successfully"
    } else if (action == "create") {
      // Create a assignment
      const { data: assignments } = await supabase
        .from("assignments")
        .select()
        .eq('sub_lesson_id', subLessonId);

      if (assignments.length > 0) {
        const { data: checkAlredyCreated } = await supabase
          .from("users_assignments")
          .select()
          .match({user_id: userId ,assignment_id: assignments[0].assignment_id}); 
  
        if (checkAlredyCreated.length == 0) {
          // length = 0 -- Don't have assignment yet
          await supabase.from("users_assignments").insert(
            {
            user_id: userId,
            assignment_id: assignments[0].assignment_id,
          });
          msg = "Create assignment successfully"
        }
      }

    }

    return res.json({
      message: msg,
    });
  } catch (error) {
    console.log("post Learning Sub lesson error:", error);
  }
}

async function getLastSubLesson(req, res) {
  const courseId = req.params.courseId;
  const userId = req.query.user;

  try {
    let lastSubLesson;

    const { data: last_sub_lesson } = await supabase
      .from("lastestsublesson")
      .select()
      .match({ course_id: courseId, user_id: userId })
      .order("updated_at", { ascending: false })
      .limit(1);

    if (last_sub_lesson.length > 0) {
      lastSubLesson = last_sub_lesson[0].sub_lesson_id;
    } else {
      const { data: first_sub_lesson } = await supabase
        .from("getallofcourses")
        .select()
        .eq("course_id", courseId)
        .order("lesson_id", { ascending: true })
        .order("sub_lesson_id", { ascending: true })
        .limit(1);
      lastSubLesson = first_sub_lesson[0].sub_lesson_id;
    }

    return res.json({
      lastSubLesson: lastSubLesson,
    });
  } catch (error) {
    console.log("get SubLesson By Id error:", error);
  }
}

export {
  getAllCourses,
  getCoursesById,
  postSubscriptionAndDesire,
  getSubLessonById,
  postLearningSublessonAndCreateAssignment,
  getLastSubLesson,
};
