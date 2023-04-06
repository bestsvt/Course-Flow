import { supabase } from "../utils/db.js";
import bcrypt from "bcrypt";

async function register(req, res) {
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

export { register }