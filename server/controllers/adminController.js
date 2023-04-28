import { supabase } from "../utils/db.js";

async function loginAdmin(req, res) {
  const username = req.body.username;

  const { data: userAdmin, error: selectError } = await supabase
    .from("admins")
    .select()
    .eq("username", username);

  // console.log(username);
  // console.log(userAdmin);

  const admin = userAdmin[0];

  if (!admin) {
    return res.json({
      message: "Email not found",
    });
  }

  // const isValidPassword = await bcrypt.compare(req.body.password, user.password);

  // if (!isValidPassword) {
  //         return res.json({
  //             "message": "Password not valid"
  //         })
  // }

  // const token = jwt.sign(
  //     {
  //         id: user.user_id,
  //         full_name: user.full_name,
  //         email: user.email,
  //         education: user.education,
  //         birth_date: user.birth_date,
  //         profile_image: user.profile_image,
  //     },
  //     process.env.SECRET_KEY,
  //     {
  //         expiresIn: '15d',
  //     }
  // );

  return res.json({
    message:
      "You have successfully accessed your Courseflow account. Let's start learning!",
    // token
  });
}

export { loginAdmin };
