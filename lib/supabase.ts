import { createClient } from '@supabase/supabase-js'

// Creates a single Supabase client instance and exports it for use across the app.
// The URL and anon key are loaded from .env.local at build time.
// The anon key is safe to expose publicly — Row Level Security policies in Supabase
// ensure each user can only access their own data regardless of the key being visible.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)