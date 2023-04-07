import dotenv from "dotenv";
import { createClient } from '@supabase/supabase-js'

dotenv.config();

const supabaseUrl = 'https://zpbdbfztfdyvnodxvzht.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }