import { COLORS } from '../../theme/colors'
import { AntDesign } from '@expo/vector-icons'
import * as AuthSession from 'expo-auth-session'
import { Link, TextInput } from '../../components'
import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import type { AuthScreenParams } from '../../routes/Auth'
import { useToast } from 'react-native-toast-notifications'
import { AuthResponse, createUser } from '../../routes/Auth/supabaseAuth'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { supabase, supabaseConfig } from '../../api/supabase'

type Props = NativeStackScreenProps<AuthScreenParams, 'SignUp'>

export const SignUp = ({ navigation }: Props) => {
  async function handleGoogleLogin() {
    const proxyRedirectUri = AuthSession.makeRedirectUri({ useProxy: true })
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: false })
    const provider = 'google'

    const response = await AuthSession.startAsync({
      authUrl: `${supabaseConfig.url}/auth/v1/authorize?provider=${provider}&redirect_to=${proxyRedirectUri}`,
      returnUrl: redirectUri
    })

    if (response.type !== 'success') return

    // TODO: update redirect based on context
    await supabase.auth.signIn({
      refreshToken: response.params.refresh_token,
    })
  }


  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState<string>('')
  const [supabaseResponse, setSupabaseResponse] = useState<AuthResponse>({ user: null, error: null })
  const toast = useToast()

  useEffect(() => {
    if (supabaseResponse.user !== null) {
      toast.show('Confirme o e-mail', {
      })

      return
    }

    if (supabaseResponse.error?.status === 429) {
      toast.show('Tente novamente mais tarde', {})

      return
    }

    if (supabaseResponse.error !== null) {
      toast.show('Credenciais inválidas', {})

      return
    }
  }, [supabaseResponse])

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
            const res = await createUser(email, password)
            setLoading(true)
            setSupabaseResponse(res)
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

        <Pressable
          style={{
            marginTop: 10,
            backgroundColor: COLORS.primary,
            borderRadius: 5,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}

          onPress={handleGoogleLogin}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 15,
              marginRight: 10,
              fontWeight: 'bold'
            }}
          >
            Entrar com o Google
          </Text>

          <AntDesign name="google" size={20} color={COLORS.white} />
        </Pressable>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginRight: 10,
              color: COLORS.white,
              textAlign: 'center'
            }}
          >
            Não possui uma conta?
          </Text>

          <Link
            onPress={() => navigation.navigate('SignIn')}
            title={'Entrar'}
          />
        </View>

      </View>
    </View>
  )
}