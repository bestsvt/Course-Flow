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
    // Set ให้ เป็น profile_image อันเดิมจาก database ก่อน
    UpdateUser.profile_image = userData[0].profile_image;    
    previousUserProfileImage = userData[0].profile_image;
    
    // ต้องเพิ่มเงื่อนไข 3 กรณี (ตัว 3 กรณีนี้จะแบ่งเข้าไปใน 2 กรณีของการ check email = 6 กรณี)
    // กรณี 1 delete > ลบภาพจาก cloudinary แล้ว update database ส่วน profile_image ให้เป็น null
    // กรณี 2 update
    // กรณี *2.1 จากไม่มีภาพ > ให้ upload ไฟล์ภาพขึ้น coludinary อย่างเดียว / แล้ว update database
    // กรณี *2.2 จากที่มีภาพอยู่แล้ว > ให้ลบภาพเดิมจาก cloudinary / แล้ว upload ภาพขึ้น cloudinary ใหม่ หลังจากนั้น update database
    // กรณี 3 undifined > ไม่ได้ยุ่งกับภาพเลย / ให้ update แค่ข้อมูลส่วนอื่นที่ไม่มีภาพ (name date education email)
    // Check ว่า mail ที่จะ update เหมือนเดิมหรือไม่
    
    if (UpdateUser.email === userData[0].email) {
      // ถ้าเมลเหมือนเดิมให้ update ได้เลย
      if (statusImage == "update") {
        if (previousUserProfileImage == null) {
          // กรณีที่ 2.1 ภาพเดิมไม่มี
          UpdateUser.profile_image = await cloudinaryUpload(
            ...req.files.profile_image,
            "upload"
          );
        } else {
          // กรณีที่ 2.2 มีภาพเดิมอยู่แล้ว
          await cloudinaryUpload(previousUserProfileImage , "delete");
          UpdateUser.profile_image = await cloudinaryUpload(
            ...req.files.profile_image,
            "upload"
          );
        }
      } else if (statusImage == "delete") {
        await cloudinaryUpload(previousUserProfileImage , "delete");
        UpdateUser.profile_image = null;
      } 
      await supabase.from("users").update(UpdateUser).eq("user_id", userId);
    }
    // ถ้า Mail ที่ไม่เหมือนเดิมต้องกลับไปเช็คอีกว่า mail ที่จะ update ซ้ำกับข้อมูลใน database แล้วหรือยัง
    else {
      const { data: CheckMailAlreayUsed } = await supabase
        .from("users")
        .select()
        .eq("email", UpdateUser.email);
      // ถ้า length > 0 แสดงว่าไม่มีเมลที่จะ update ใน database แต่ถ้ามากกว่า 0 แสดงว่ามีซ้ำแล้ว
      if (CheckMailAlreayUsed.length > 0) {
        // ถ้ามีเมลซ้ำใน database ให้ return กลับไปว่าเมลถูกใช้แล้ว
        return res.json({
          message:
            "This email address is already in use. Please choose a different email address and try again.",
        });
      } else {
        // กรณีที่เมลไม่ซ้ำ
        if (statusImage == "update") {
          if (previousUserProfileImage == null) {
            // กรณีที่ 2.1 ภาพเดิมไม่มี
            UpdateUser.profile_image = await cloudinaryUpload(
              ...req.files.profile_image,
              "upload"
            );
          } else {
            // กรณีที่ 2.2 มีภาพเดิมอยู่แล้ว
            await cloudinaryUpload(previousUserProfileImage , "delete");
            UpdateUser.profile_image = await cloudinaryUpload(
              ...req.files.profile_image,
              "upload"
            );
          }
        } else if (statusImage == "delete") {
          await cloudinaryUpload(previousUserProfileImage , "delete");
          UpdateUser.profile_image = null;
        } 
        await supabase.from("users").update(UpdateUser).eq("user_id", userId);
      }
    }

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

export { updateProfile };
