import AsyncStorage from '@react-native-async-storage/async-storage'
import { Session } from '@supabase/supabase-js';

export async function saveSessionLocally(sessao: Session): Promise<void> {
  const objetoEmJSON = JSON.stringify(sessao)
  await AsyncStorage.setItem('@session_key', objetoEmJSON)
}

export async function checkSessionLocally(): Promise<any> {
  const string = await AsyncStorage.getItem('@session_key')
  return string != null ? JSON.parse(string) : null;
}

export async function deleteLocalSession(): Promise<void> {
  await AsyncStorage.removeItem('@session_key')
}