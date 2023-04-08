import { supabase } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function register(req, res) {
  try {
    const email = req.body.email;
    const { data: users, error: selectError } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", email);
    // if error when select data throw the error
    if (selectError) {
      throw selectError;
    }
    
    // Check Email Aleary have in database or not
    if (users.length > 0) {
      return res.json({
        message: "This email address is already registered.",
      });
    }

    const user = {
      email,
      password: req.body.password,
      name: req.body.name,
      birth_date: req.body.date,
      education: req.body.education,
    };
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const { error: insertError } = await supabase.from("users").insert(user);
    // if error when insert data throw the error
    if (insertError) {
      throw insertError;
    }

    return res.json({
      message: "User has been created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while creating the user",
    });
  }
}

async function login(req, res) {
    
    const { data, error } = await supabase.from('users')
    .select()
    .eq('email', req.body.email)
    const user = data[0];

    if (!user) {
        return res.status(404).json({
                "message": "email not found"
            })
    }

	const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) {
            return res.status(401).json({
                "message": "password not valid"
            })
    }

    // ค่อยมาดูเรื่องเวลาหมดอายุ
    const token = jwt.sign(
        {
            id: user.user_id,
            name: user.name,
            email: user.email,
            education: user.education,
            birth_date: user.birth_date,
            profile_image: user.profile_image,             
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '15d',
        }
    );

    return res.json({ 
		message: "login succesfully",
		token 
	})
}

export { register , login }