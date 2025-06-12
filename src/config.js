import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

export const jwtSecret = process.env.SUPABASE_JWT_SECRET;