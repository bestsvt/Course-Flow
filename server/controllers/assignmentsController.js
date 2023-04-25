import { supabase } from "../utils/db.js";

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
  putSubmitAssignment
};
