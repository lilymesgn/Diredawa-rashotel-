import { createClient } from "@supabase/supabase-js";

// Grab Supabase environment variables
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || "";
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "";

// Export a reactive configuration checker
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase credentials (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are missing from your environment. The hotel website is running in offline demo mode using local state and LocalStorage fallback database logic."
  );
}

// Instantiate Supabase client (fallback to sandbox URL if empty to avoid system failure)
export const supabase = createClient(
  supabaseUrl || "https://placeholder-project-id.supabase.co",
  supabaseAnonKey || "placeholder-anon-key-abcde12345"
);
