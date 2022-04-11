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
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { supabase } from '../../api/supabase'
import { checarSessaoLocalmente, removeSessaoLocalmente, salvaSessaoLocalmente } from '../../routes/Auth/asyncStorage';
import type { TelasDaRotaAuth } from '../../routes/Auth';
import { AuthResponse, logarUsuario } from '../../routes/Auth/supabaseAuth';

type Props = NativeStackScreenProps<TelasDaRotaAuth, 'SignIn'>

export const SignIn = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [respostaDoSupabase, setRespostaDoSupabase] = useState<AuthResponse>({ user: null, error: null })
  const toast = useToast()

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
        status: 'success',
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
        status: 'error',
        title: 'Credenciais inválidas',
        description: 'Verifique os campos e tente novamente'
      })

      return
    }
  }, [respostaDoSupabase])

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

          <FormControl.Label _text={{
            color: 'white',
            fontSize: 'xl'
          }}>
            E-mail
          </FormControl.Label>
          <Input
            nativeID='email'
            placeholderTextColor='gray.400'
            placeholder='insira o seu e-mail'
            color='white'
            type='e-mail'
            _hover={{
              color: 'black'
            }}
            value={email}
            onChangeText={t => setEmail(t)}
          />

          <FormControl.Label _text={{
            color: 'white',
            fontSize: 'xl'
          }}>
            Senha
          </FormControl.Label>
          <Input
            nativeID='pass'
            placeholderTextColor='gray.400'
            placeholder='insira sua senha'
            color='white'
            type='password'
            _hover={{
              color: 'black'
            }}
            value={password}
            onChangeText={t => setPassword(t)}
          />

          <Button
            onPress={async () => {
              const res = await logarUsuario(email, password)
              setRespostaDoSupabase(res)
            }}
          >
            Login
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