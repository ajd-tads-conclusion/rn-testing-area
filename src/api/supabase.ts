import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { SUPA_KEY, SUPA_URL } from '@env'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const isBrowser = () => Platform.OS === 'web'

export const supabaseConfig = isBrowser() ? { url: SUPA_URL, publicKey: SUPA_KEY } : Constants.manifest?.extra?.supabase

export const supabase = createClient(supabaseConfig.url, supabaseConfig.publicKey, {
  localStorage: AsyncStorage,
  // detectSessionInUrl: false
})
