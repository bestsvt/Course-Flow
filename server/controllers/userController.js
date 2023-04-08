import { supabase } from "../utils/db.js";
import jwt from "jsonwebtoken";
import { cloudinaryUpload } from "../utils/upload.js";


async function updateProfile(req, res) {
  const userId = req.body.userId;
  const statusImage = req.body.statusImage;
  const UpdateUser = {
    name: req.body.name,
    birth_date: req.body.birth_date,
    education: req.body.education,
    email: req.body.email,
  }

  try {
    const { data: userData } = await supabase
      .from("users")
      .select()
      .eq("user_id", userId);
    // Set ให้ เป็น profile_image อันเดิมจาก database ก่อน
    UpdateUser.profile_image = userData[0].profile_image
    // Check ว่าภาพมีการเปลี่ยนแปลงไหม ถ้ามีให้ upload ภาพขึ้นไปใหม่แล้วเอา link มา
    if (statusImage == 'update') {
      UpdateUser.profile_image = await cloudinaryUpload(req.files);
    }
    if (statusImage == 'delete') {
      UpdateUser.profile_image = null;
    }
    
    // ต้องเพิ่มเงื่อนไข 3 กรณี 
    // กรณี delete > ลบภาพจาก cloudinary แล้ว update database ส่วน profile_image ให้เป็น null
    // กรณี update > ให้ลบภาพเดิมจาก cloudinary แล้ว upload ภาพขึ้น cloudinary ใหม่ หลังจากนั้น update database
    // กรณีไม่ได้ยุ่งกับภาพเลย > ให้ update แค่ข้อมูลส่วนอื่นที่ไม่มีภาพ (name date education email)

    // Check ว่า mail ที่จะ update เหมือนเดิมหรือไม่
    if (UpdateUser.email === userData[0].email) {
      // ถ้าเมลเหมือนเดิมให้ update ได้เลย
      await supabase
      .from('users')
      .update(UpdateUser)
      .eq('user_id', userId);
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
          message: "This email address is already in use. Please choose a different email address and try again."
          })
      } else {
        // ถ้าไม่มีเมลซ้ำใน database ให้ update ได้เลย
        await supabase
        .from('users')
        .update(UpdateUser)
        .eq('user_id', userId);
      }
    }

    UpdateUser.user_id = userId;

    const token = jwt.sign(
      {
          id: UpdateUser.user_id,
          name: UpdateUser.name,
          email: UpdateUser.email,
          education: UpdateUser.education,
          birth_date: UpdateUser.birth_date,
          profile_image: UpdateUser.profile_image,             
      },
      process.env.SECRET_KEY,
      {
          expiresIn: '15d',
      }
    );

  return res.json({ 
  message: "Profile updated successfully!",
  token 
  })

  } catch (error) {
    console.log(error);
  }
}

export { updateProfile }