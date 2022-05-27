import { COLORS } from '../../theme/colors'
import { Link, TextInput } from '../../components'
import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import type { AuthScreenParams } from '../../routes/Auth'
import { useToast } from 'react-native-toast-notifications'
import { AuthResponse, createUser } from '../../routes/Auth/supabaseAuth'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<AuthScreenParams, 'SignUp'>

export const SignUp = ({ navigation }: Props) => {
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