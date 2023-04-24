import { supabase } from "../utils/db.js";
import jwt from "jsonwebtoken";
import { cloudinaryUpload } from "../utils/upload.js";

async function updateProfile(req, res) {
  const userId = req.body.userId;
  const statusImage = req.body.statusImage;
  const UpdateUser = {
    full_name: req.body.full_name,
    birth_date: req.body.birth_date,
    education: req.body.education,
    email: req.body.email,
  };
  let previousUserProfileImage;
  try {
    const { data: userData } = await supabase
      .from("users")
      .select()
      .eq("user_id", userId);
    const { data: CheckMailAlreayUsed } = await supabase
      .from("users")
      .select()
      .eq("email", UpdateUser.email);
    // Set ให้ เป็น profile_image อันเดิมจาก database ก่อน
    UpdateUser.profile_image = userData[0].profile_image;
    previousUserProfileImage = userData[0].profile_image;

    // เช็คว่าเมลซ้ำใน database ไหม และเช็คต่อว่าเมลซ้ำกับของเดิมหรือไม่
    if (
      CheckMailAlreayUsed.length > 0 &&
      !(UpdateUser.email === userData[0].email)
    ) {
      return res.json({
        message:
          "This email address is already in use. Please choose a different email address and try again.",
      });
    }

    // Check status Image (update, delete, undifined)
    if (statusImage == "update") {
      if (previousUserProfileImage == null) {
        // กรณีที่ 2.1 ภาพเดิมไม่มี
        UpdateUser.profile_image = await cloudinaryUpload(
          ...req.files.profile_image,
          "upload",
          "profile_image"
        );
      } else {
        // กรณีที่ 2.2 มีภาพเดิมอยู่แล้ว
        await cloudinaryUpload(previousUserProfileImage, "delete");
        UpdateUser.profile_image = await cloudinaryUpload(
          ...req.files.profile_image,
          "upload",
          "profile_image"
        );
      }
    } else if (statusImage == "delete") {
      await cloudinaryUpload(previousUserProfileImage, "delete");
      UpdateUser.profile_image = null;
    }
    await supabase.from("users").update(UpdateUser).eq("user_id", userId);

    // ต้อง update token เพื่อให้เวลากด update แล้วข้อมูลเปลี่ยนเลย แล้วไป set token ที่ client อีกที
    const token = jwt.sign(
      {
        id: userId,
        full_name: UpdateUser.full_name,
        email: UpdateUser.email,
        education: UpdateUser.education,
        birth_date: UpdateUser.birth_date,
        profile_image: UpdateUser.profile_image,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "15d",
      }
    );

    return res.json({
      message: "Profile updated successfully!",
      token,
    });
  } catch (error) {
    console.log("Update Profile Error:", error);
  }
}

async function getSubscribeCourse(req, res) {
  const userId = req.query.user;

  try {
    const { data: subscribeCourses } = await supabase
      .from("subscriptions")
      .select("subscription_id, status ,courses (*)")
      .eq("user_id", userId)
      .order("subscription_id", { ascending: true })

    return res.json({
      data: subscribeCourses,
    });
  } catch (error) {
    console.log("Get subscribe courses error:", error);
  }
}

async function getDesireCourse(req, res) {
  const userId = req.query.user;
  const currentPage = req.query.currentPage
  const itemsPerPage = 9;
  const offset = (currentPage - 1) * itemsPerPage;

  try {
    const { data: desireCoursesWithPage } = await supabase
      .from("desires")
      .select("desire_id ,courses (*)")
      .eq("user_id", userId)
      .range(offset, offset + itemsPerPage - 1);

    const { data: desireCourses } = await supabase
      .from("desires")
      .select("desire_id ,courses (*)")
      .eq("user_id", userId)

    return res.json({
      data: desireCoursesWithPage,
      desireCourses
    });
  } catch (error) {
    console.log("Get desire courses error:", error);
  }
}

export { updateProfile, getSubscribeCourse, getDesireCourse };
