import { supabase } from "../../api/supabase"
import type { User, ApiError } from '@supabase/supabase-js'

export type AuthResponse = {
  user: User | null,
  error: ApiError | null
}

export async function criarUsuario(email: string, password: string): Promise<AuthResponse> {
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password
  })

  return { user, error }
}

export async function logarUsuario(email: string, password: string): Promise<AuthResponse> {
  const { user, error } = await supabase.auth.signIn({
    email: email,
    password: password
  })

  return { user, error }
}

export async function signOutUsuario() {
  const { error } = await supabase.auth.signOut()

  return error
}