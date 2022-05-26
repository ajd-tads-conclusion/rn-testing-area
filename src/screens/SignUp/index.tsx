import { COLORS } from '../../theme/colors'
import { Link } from '../../components/Link'
import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { TextInput } from '../../components/TextInput'
import type { TelasDaRotaAuth } from '../../routes/Auth'
import { useToast } from 'react-native-toast-notifications'
import { AuthResponse, criarUsuario } from '../../routes/Auth/supabaseAuth'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<TelasDaRotaAuth, 'SignUp'>

export const SignUp = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState(false)
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
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          margin: 10,
          padding: 10,
          borderRadius: 5,
          backgroundColor: COLORS.secondary,
          borderColor: COLORS.white,
          borderWidth: 1
        }}
      >

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.white,
            marginBottom: 10
          }}
        >
          Email:
        </Text>
        <TextInput
          value={email}
          onChange={t => setEmail(t)}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.white,
            marginBottom: 10
          }}
        >
          Senha:
        </Text>
        <TextInput
          value={password}
          onChange={t => setPassword(t)}
        />

        <Pressable
          disabled={loading}
          onPress={async () => {
            const res = await criarUsuario(email, password)
            setLoading(true)
            setRespostaDoSupabase(res)
            setLoading(false)
          }}
          style={{
            backgroundColor: loading ? COLORS.secondary : COLORS.primary,
            borderRadius: 5,
            padding: 10
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 15,
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Cadastrar
          </Text>
        </Pressable>

        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: COLORS.white,
              marginTop: 10,
              textAlign: 'center'
            }}
          >
            Não possui uma conta?
            <Link
              onPress={() => navigation.navigate('SignIn')}
              title={'Entrar'}
            />
          </Text>
        </View>

      </View>
    </View>
  )
}