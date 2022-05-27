import * as yup from 'yup'
import { COLORS } from '../../theme/colors'
import { supabase } from '../../api/supabase'
import { Link, TextInput } from '../../components'
import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import type { AuthScreenParams } from '../../routes/Auth'
import { useToast } from 'react-native-toast-notifications'
import { AuthResponse, loginUser } from '../../routes/Auth/supabaseAuth'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  checkSessionLocally,
  deleteLocalSession,
  saveSessionLocally
} from '../../helpers/AsyncStorage/asyncStorage'

type Props = NativeStackScreenProps<AuthScreenParams, 'SignIn'>

type Inputs = {
  email: string,
  password: string
}

const schema = yup.object({
  email: yup.string().email('O email deve ser válido').required('O email é obrigatório'),
  password: yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export const SignIn = ({ navigation }: Props) => {
  const [supabaseResponse, setSupabaseResponse] = useState<AuthResponse>({ user: null, error: null })
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    async function redirectIfHasSession() {
      const session = await checkSessionLocally()
      if (session) {
        navigation.navigate('MainTabs')
      }
    }

    redirectIfHasSession()
  }, [])

  useEffect(() => {
    if (supabaseResponse.user !== null) {
      toast.show('Bem-vindo', {
      })

      const session = supabase.auth.session()

      if (session) {
        try {
          saveSessionLocally(session)
        } catch {
          deleteLocalSession()
        } finally {
          navigation.navigate('MainTabs')
        }
      }

      return
    }

    if (supabaseResponse.error !== null) {
      toast.show('Credenciais inválidas', {
        type: 'custom_danger',
        data: {
          description: 'verifique os campos e tente novamente'
        },
        placement: 'top'
      })

      return
    }
  }, [supabaseResponse])

  const onSubmit = async (data: Inputs) => {
    setLoading(true)

    const { error, user } = await loginUser(data.email, data.password)

    setSupabaseResponse({ user, error })
    setLoading(false)
  }

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
          E-mail:
        </Text>

        <Controller
          control={control}
          name={'email'}
          render={({ field: { value, onChange }, formState: { errors } }) => {
            return (
              <TextInput
                value={value}
                onChange={onChange}
                placeholder={'Insira o seu email aqui'}
                errors={errors.email}
              />
            )
          }}
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

        <Controller
          control={control}
          name={'password'}
          render={({ field: { value, onChange }, formState: { errors } }) => {
            return (
              <TextInput
                value={value}
                placeholder={'Insira a sua senha aqui'}
                onChange={onChange}
                errors={errors.password}
              />
            )
          }}
        />
        <Pressable
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
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
            Entrar
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
            onPress={() => navigation.navigate('SignUp')}
            title={'Crie uma aqui'}
          />
        </View>

      </View>
    </View>
  )
}