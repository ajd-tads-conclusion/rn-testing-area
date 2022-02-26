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

import { AuthResponse, criarUsuario } from '../../routes/Auth/supabaseAuth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { TelasDaRotaAuth } from '../../routes/Auth';

type Props = NativeStackScreenProps<TelasDaRotaAuth, 'SignUp'>

export const SignUp = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [respostaDoSupabase, setRespostaDoSupabase] = useState<AuthResponse>({ user: null, error: null })
  const toast = useToast()

  useEffect(() => {
    if (respostaDoSupabase.user !== null) {
      toast.show({
        status: 'success',
        title: 'Confirme o e-mail',
        description: 'Clique no link que enviamos ao seu e-mail'
      })

      return
    }

    if (respostaDoSupabase.error?.status === 429) {
      toast.show({
        status: 'error',
        title: 'Tente novamente mais tarde'
      })

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

          {/* TODO: chamar o supabase login aqui */}
          <Button
            onPress={async () => {
              const res = await criarUsuario(email, password)
              setRespostaDoSupabase(res)
            }}
          >
            Cadastrar-se
          </Button>

          <Stack direction='row' alignItems='center' alignSelf='center'
          >
            <Text color={'white'}>
              Já possui uma conta?
            </Text>
            <Button
              variant='link'
              onPress={() => navigation.navigate('SignIn')}
            >
              Faça login
            </Button>
          </Stack>

        </Stack>
      </FormControl>
    </Center>
  )
}