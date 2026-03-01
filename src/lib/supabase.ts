import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isPlaceholder = !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder');

if (isPlaceholder) {
  console.error(
    '🔴 Supabase credentials missing! \n' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables. \n' +
    'The app will use mock data until these are configured.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url-missing.supabase.co',
  supabaseAnonKey || 'placeholder-key-missing'
);
