import { supabase } from "../utils/db.js";

async function getAllAssignment(req, res) {

  const userId = req.query.user

  try {
    const { data: assignments } = await supabase
      .from("getallassignments")
      .select()
      .eq('user_id', userId)
      .order("created_at", { ascending: false })

    function checkDeadLine(createDate, duration) {
        const createTime = new Date(createDate);
        const dueDate = new Date(createTime.getTime() + duration * 24 * 60 * 60 * 1000);
        const timeDiff = dueDate.getTime() - new Date().getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return daysDiff
    }

    // loop for add deadline
    for (let i = 0; i < assignments.length; i++) {
      const status = assignments[i].status;
      const duration = assignments[i].duration
      const countDeadline = checkDeadLine(assignments[i].created_at , duration)
      const daysAfterCreated = (new Date() - new Date(assignments[i].created_at))/(1000 * 60 * 60 * 24)

      // add deadline
      assignments[i].countDeadline = countDeadline

      // Check ว่าสร้างมาแล้วกี่วัน มากกว่า duration ของ assignment ไหม
      // และมี status ต้องไม่เท่ากับ overdue / submitted
      if (daysAfterCreated >= duration && status !== 'overdue' && status !== 'submitted' && status !== 'submitted late') {
        await supabase
          .from("users_assignments")
          .update({ status: "overdue", updated_at: new Date()})
          .eq('user_assignment_id', assignments[i].user_assignment_id);
      }
  
    }
    
    return res.json({
      data: assignments
    });
  } catch (error) {
    console.log("get All Assignment error: ", error);
  }
}

async function putSaveDraftAssignment(req, res) {
  const answer = req.body.answer
  const userId = req.query.user
  const assignmentId = req.params.assignmentId

  try {
    await supabase
      .from("users_assignments")
      .update({answer: answer, status: 'inProgress', updated_at: new Date()})
      .match({ user_id: userId, assignment_id: assignmentId });

    return res.json({
      message: 'Draft saved successfully !'
    });
  } catch (error) {
    console.log("put Save Draft Assignment error: ", error);
  }
}

async function putSubmitAssignment(req, res) {
  const answer = req.body.answer
  const subLessonId = req.body.subLessonId
  const userId = req.query.user
  const assignmentId = req.params.assignmentId

  try {
    let updateAssignment;
    
    // Check ว่า status ของ assignments เป็น overdue แล้วหรือยังก่อนที่จะทำการส่ง
    const { data: checkOverdue } = await supabase
      .from("users_assignments")
      .select()
      .match({user_id: userId ,assignment_id: assignmentId}); 

    if (checkOverdue[0].status == 'overdue') {
      updateAssignment = {
        answer: answer, 
        status: 'submitted late', 
        updated_at: new Date(), 
        submitted_time: new Date()
      }
    } else {
      updateAssignment = {
        answer: answer, 
        status: 'submitted', 
        updated_at: new Date(), 
        submitted_time: new Date()
      }
    }

    await supabase
      .from("users_assignments")
      .update(updateAssignment)
      .match({ user_id: userId, assignment_id: assignmentId });

    const updateStatus = {
        user_id: userId,
        sub_lesson_id: subLessonId,
        updated_at: new Date(),
        status: 'complete',
      };

    await supabase
      .from("users_sub_lessons")
      .update(updateStatus)
      .match({ user_id: userId, sub_lesson_id: subLessonId });

    return res.json({
      message: 'Assignment submitted !'
    });
  } catch (error) {
    console.log("put Submit Assignment error: ", error);
  }
}

export {
  putSaveDraftAssignment,
  putSubmitAssignment,
  getAllAssignment
};
