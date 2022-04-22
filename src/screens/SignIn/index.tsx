import React, { useEffect, useState } from 'react';
import {
  Center,
  FormControl,
  Input,
  Button,
  Stack,
  Text,
  useToast
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { supabase } from '../../api/supabase'
import { checarSessaoLocalmente, removeSessaoLocalmente, salvaSessaoLocalmente } from '../../helpers/AsyncStorage/asyncStorage';
import type { TelasDaRotaAuth } from '../../routes/Auth';
import { AuthResponse, logarUsuario } from '../../routes/Auth/supabaseAuth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
      toast.show({
        title: 'Bem-vindo',
        description: 'Login efetuado com sucesso'
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
      toast.show({
        title: 'Credenciais inválidas',
        description: 'Verifique os campos e tente novamente'
      })

      return
    }
  }, [respostaDoSupabase])

  const onSubmit = async (data: Inputs) => {
    const { error, user } = await logarUsuario(data.email, data.password)
    setRespostaDoSupabase({ user, error })
  }

  return (
    <Center
      flex={1}
      bg='blueGray.800'
    >
      <FormControl
        p='3'
        w={{
          base: '100%',
          sm: 400
        }}>
        <Stack space='3'>

          <Controller
            control={control}
            name={'email'}
            render={({ field: { value, onChange }, formState: { errors } }) => {
              return (
                <>
                  <Input
                    placeholder='E-mail'
                    bgColor={errors.email ? 'danger.300' : 'white'}
                    color={errors.email ? 'white' : 'black'}
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors.email && <Text color={'danger.500'}>{errors.email.message}</Text>}
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
                  <Input
                    placeholder='Senha'
                    bgColor={errors.password ? 'danger.300' : 'white'}
                    color={errors.password ? 'white' : 'black'}
                    value={value}
                    type='password'
                    onChangeText={onChange}
                  />
                  {errors.password && <Text color={'danger.500'}>{errors.password.message}</Text>}
                </>
              )
            }}
          />
          <Button
            onPress={handleSubmit(onSubmit)}
          >
            Entrar
          </Button>

          <Stack direction='row' alignItems='center' alignSelf='center'
          >
            <Text color={'white'}>
              Não possui uma conta?
            </Text>
            <Button
              variant='link'
              onPress={() => navigation.navigate('SignUpFinish')}
            >
              Cadastre-se
            </Button>
          </Stack>

        </Stack>
      </FormControl>
    </Center>
  )
}