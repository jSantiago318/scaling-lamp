import { createClient } from '@supabase/supabase-js'

// import env var
const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)

const signIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) {
    throw error
  }
  localStorage.setItem('emailData', JSON.stringify(email))
}

const signUp = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password
  })
  if (error) {
    throw error
  }
}
export { supabase, signIn, signUp }