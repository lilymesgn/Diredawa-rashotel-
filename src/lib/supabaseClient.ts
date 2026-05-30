import { createClient } from "@supabase/supabase-js";

// Grab Supabase environment variables with provided values as fallbacks
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || "https://albijhxhgxxdfvelstcj.supabase.co";
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "sb_publishable_z5dhecJnwrs6LHHsyuo86Q_YMZp8IOT";

export const isSupabaseConfigured = !!((import.meta as any).env?.VITE_SUPABASE_URL && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY);

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase coordinates (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are missing from your environment. Defaulting to built-in fallback configurations."
  );
}

// Export the singleton client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
