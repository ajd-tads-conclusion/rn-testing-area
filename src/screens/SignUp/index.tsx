import React, { useEffect, useState } from 'react';

import { AuthResponse, criarUsuario } from '../../routes/Auth/supabaseAuth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { TelasDaRotaAuth } from '../../routes/Auth';
import { useToast } from 'react-native-toast-notifications'
import { View, Text, TextInput, Button } from 'react-native';

type Props = NativeStackScreenProps<TelasDaRotaAuth, 'SignUp'>

export const SignUp = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [respostaDoSupabase, setRespostaDoSupabase] = useState<AuthResponse>({ user: null, error: null })
  const toast = useToast()

  useEffect(() => {
    if (respostaDoSupabase.user !== null) {
      toast.show('Confirme o e-mail', {
      })

      return
    }

    if (respostaDoSupabase.error?.status === 429) {
      toast.show('Tente novamente mais tarde', {})

      return
    }

    if (respostaDoSupabase.error !== null) {
      toast.show('Credenciais inválidas', {})

      return
    }
  }, [respostaDoSupabase])

  return (
    <View>
      <View>
        <View>

          <Text>
            E-mail
          </Text>
          <TextInput
            nativeID='email'
            placeholderTextColor='gray.400'
            placeholder='insira o seu e-mail'
            value={email}
            onChangeText={t => setEmail(t)}
          />

          <Text >
            Senha
          </Text>
          <TextInput
            nativeID='pass'
            placeholderTextColor='gray.400'
            placeholder='insira sua senha'
            value={password}
            onChangeText={t => setPassword(t)}
          />

          <Button
            title='Cadastrar'
            onPress={async () => {
              const res = await criarUsuario(email, password)
              setRespostaDoSupabase(res)
            }}
          />

          <View>
            <Text>
              Já possui uma conta?
            </Text>
            <Button
              title='Entrar'
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>

        </View>
      </View>
    </View>
  )
}