import { createClient } from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SUPA_URL, SUPA_KEY } from '@env'

export const supabase = createClient(SUPA_URL, SUPA_KEY, {
  localStorage: AsyncStorage,
  detectSessionInUrl: false
})
