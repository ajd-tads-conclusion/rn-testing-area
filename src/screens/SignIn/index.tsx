import * as yup from 'yup';
import { COLORS } from '../../theme/colors';
import { supabase } from '../../api/supabase'
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { TelasDaRotaAuth } from '../../routes/Auth';
import { ErrorLabel } from '../../components/ErrorLabel';
import { useToast } from 'react-native-toast-notifications'
import { TextInput, View, Text, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthResponse, logarUsuario } from '../../routes/Auth/supabaseAuth';
import {
  checarSessaoLocalmente,
  removeSessaoLocalmente,
  salvaSessaoLocalmente
} from '../../helpers/AsyncStorage/asyncStorage';

type Props = NativeStackScreenProps<TelasDaRotaAuth, 'SignIn'>

type Inputs = {
  email: string,
  password: string
}

const schema = yup.object({
  email: yup.string().email('O e-mail deve ser válido').required('o e-mail é obrigatório'),
  password: yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export const SignIn = ({ navigation }: Props) => {
  const [respostaDoSupabase, setRespostaDoSupabase] = useState<AuthResponse>({ user: null, error: null })
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
    (async function () {
      const sessao = await checarSessaoLocalmente()
      if (sessao) {
        navigation.navigate('MainTabs')
      }
    })()
  }, [])

  useEffect(() => {
    if (respostaDoSupabase.user !== null) {
      toast.show('Bem-vindo', {
      })

      const session = supabase.auth.session()

      if (session) {
        try {
          salvaSessaoLocalmente(session)
        } catch {
          removeSessaoLocalmente()
        } finally {
          navigation.navigate('MainTabs')
        }
      }

      return
    }

    if (respostaDoSupabase.error !== null) {
      toast.show('Credenciais inválidas', {
      })

      return
    }
  }, [respostaDoSupabase])

  const onSubmit = async (data: Inputs) => {
    setLoading(true)

    const { error, user } = await logarUsuario(data.email, data.password)

    setRespostaDoSupabase({ user, error })
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
              <>
                <TextInput
                  placeholder='E-mail'
                  value={value}
                  onChangeText={onChange}
                  placeholderTextColor={COLORS.white + '9C'}
                  style={{
                    backgroundColor: COLORS.tertiary,
                    borderColor: errors.email && COLORS.error,
                    borderWidth: errors.email && 1,
                    borderRadius: 5,
                    marginBottom: 10,
                    padding: 10,
                    color: errors.email ? COLORS.error : COLORS.white,
                    fontWeight: 'bold'
                  }}
                />
                {
                  errors.email && <ErrorLabel campo={errors.email} />
                }
              </>
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
              <>
                <TextInput
                  placeholder='Senha'
                  value={value}
                  onChangeText={onChange}
                  placeholderTextColor={COLORS.white + '9C'}
                  secureTextEntry={true}
                  style={{
                    backgroundColor: COLORS.tertiary,
                    borderColor: errors.password && COLORS.error,
                    borderWidth: errors.password && 1,
                    borderRadius: 5,
                    marginBottom: 10,
                    padding: 10,
                    color: errors.password ? COLORS.error : COLORS.white,
                    fontWeight: 'bold'
                  }}
                />

                {
                  errors.password && <ErrorLabel campo={errors.password} />
                }
              </>
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
            <Pressable
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text
                style={{
                  padding: 5,
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'solid',
                }}
              >
                Cadastre-se
              </Text>
            </Pressable>

          </Text>
        </View>

      </View>
    </View>
  )
}