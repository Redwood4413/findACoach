import { Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY,
);

export default supabase;
