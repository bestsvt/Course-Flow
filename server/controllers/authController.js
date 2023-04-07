import { supabase } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function register(req, res) {
    // ต้องเพิ่มการดึงข้อมูลมาเช็คว่ามี email แล้วหรือยัง
    const user = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        birth_date: req.body.date,
        education: req.body.education
    };
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    const { error } = await supabase.from('users').insert(user)

    return res.json({
        message: "User has been created successfully",
      });
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
            profile_image: user.profile_image,             
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '259200',
        }
    );

    return res.json({ 
		message: "login succesfully",
		token 
	})
}

export { register , login }