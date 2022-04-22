import AsyncStorage from '@react-native-async-storage/async-storage'
import { Session } from '@supabase/supabase-js';

export async function salvaSessaoLocalmente(sessao: Session): Promise<void> {
  const objetoEmJSON = JSON.stringify(sessao)
  await AsyncStorage.setItem('@session_key', objetoEmJSON)
}

export async function checarSessaoLocalmente(): Promise<any> {
  const string = await AsyncStorage.getItem('@session_key')
  return string != null ? JSON.parse(string) : null;
}

export async function removeSessaoLocalmente(): Promise<void> {
  await AsyncStorage.removeItem('@session_key')
}