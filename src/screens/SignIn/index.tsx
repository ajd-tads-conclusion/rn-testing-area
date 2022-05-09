import * as yup from 'yup';
import { supabase } from '../../api/supabase'
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { TelasDaRotaAuth } from '../../routes/Auth';
import { useToast } from 'react-native-toast-notifications'
import { TextInput, View, Text, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthResponse, logarUsuario } from '../../routes/Auth/supabaseAuth';
import { checarSessaoLocalmente, removeSessaoLocalmente, salvaSessaoLocalmente } from '../../helpers/AsyncStorage/asyncStorage';

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
    const { error, user } = await logarUsuario(data.email, data.password)
    setRespostaDoSupabase({ user, error })
  }

  return (
    <View>

      <View >

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
                />
                {errors.email && <Text >{errors.email.message}</Text>}
              </>
            )
          }}
        />
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
                />
                {errors.password && <Text >{errors.password.message}</Text>}
              </>
            )
          }}
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          title='Entrar'
        />

        <View>
          <Text>
            Não possui uma conta?
          </Text>
          <Button
            title='Cadastre-se'
            onPress={() => navigation.navigate('SignUpFinish')}
          />
        </View>

      </View>
    </View>
  )
}