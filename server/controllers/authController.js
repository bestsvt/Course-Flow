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
      full_name: req.body.full_name,
      birth_date: req.body.birth_date,
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
      message: "Congratulations! Your Courseflow account has been created successfully. Start learning today with our online courses!",
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
        return res.json({
                "message": "Email not found"
            })
    }

	const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) {
            return res.json({
                "message": "Password not valid"
            })
    }

    const token = jwt.sign(
        {
            id: user.user_id,
            full_name: user.full_name,
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
		message: "You have successfully accessed your Courseflow account. Let's start learning!",
		token 
	})
}

async function loginAdmin(req, res) {
  
  const username = req.body.username;
  const password = req.body.password;

  const { data: userAdmin } = await supabase
    .from('admins')
    .select()
    .eq("username", username);

  const admin = userAdmin[0];

  if (!admin) {
    return res.json({
      message: "Username not found",
    });
  }

  const isValidPassword = (password == admin.password);

  if (!isValidPassword) {
    return res.json({
      message: "Password not valid"
    })
  }

  const tokenAdmin = jwt.sign(
      {
          admin_id: admin.admin_id,
          username: admin.username,
      },
      process.env.SECRET_KEY,
      {
          expiresIn: '15d',
      }
  );
  

  return res.json({ 
  message: "Congratulations! You have successfully logged in. Welcome back to our platform.",
  tokenAdmin 
})
}

export { register , login , loginAdmin }