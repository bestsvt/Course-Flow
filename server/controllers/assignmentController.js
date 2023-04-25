import { supabase } from "../utils/db.js";

async function postSubmittedAssignments(req, res) {
  const userId = req.query.user;
  const status = req.body.status;
  const action = req.body.action;
  const answer = req.body.answer;
  const submittedTime = req.body.submitted_time;
  const assignmentId = req.params.assignmentId;
  let msg;
  let updateStatus;

  try {
    if (action == "submit") {
      updateStatus = {
        answer: answer,
        status: status,
        submitted_time: submittedTime,
      };
      await supabase
        .from("users_assignments")
        .update(updateStatus)
        .match({ user_id: userId, assignment_id: assignmentId });
      msg = "Submitted successfully";
    }

    return res.json({
      message: msg,
    });
  } catch (error) {
    console.log("Post subscription and desire error:", error);
  }
}

export { postSubmittedAssignments };
