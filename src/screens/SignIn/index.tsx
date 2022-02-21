import React, { useState } from 'react';
import { Center, FormControl, Input, Button, Stack, Text } from 'native-base';
import { supabase } from '../../api/supabase'

async function CreateUser(email: string, password: string) {
  let { user, error } = await supabase.auth.signUp({
    email: email,
    password: password
  })

  return { user, error }
}

export const SignIn = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <Center flex={1} bg='blueGray.800'>
      <FormControl p='3' w={{
        base: '100%',
        sm: 350,
        // md: 300
      }}>
        <Stack space='3'>

          <FormControl.Label _text={{
            color: 'white',
            fontSize: 'xl'
          }}>
            Usuário
          </FormControl.Label>
          <Input
            placeholderTextColor='gray.400'
            placeholder='insira o seu usuário'
            color='white'
            type='e-mail'
            _hover={{
              color: 'black'
            }}
            value={email}
            onChangeText={t=>setEmail(t)}
          />

          <FormControl.Label _text={{
            color: 'white',
            fontSize: 'xl'
          }}>
            Senha
          </FormControl.Label>
          <Input
            placeholderTextColor='gray.400'
            placeholder='insira sua senha aqui'
            color='white'
            type='password'
            _hover={{
              color: 'black'
            }}
            value={password}
            onChangeText={t=>setPassword(t)}
          />

          {/* TODO: chamar o supabase login aqui */}
          <Button
            onPress={() => alert('a')}
          >
            Cadastrar-se
          </Button>

          <Stack direction='row' alignItems='center' alignSelf='center'>
            <Text color={'white'}>
              Já possui uma conta?
            </Text>
            <Button variant='link'>
              Faça login
            </Button>
          </Stack>

        </Stack>
      </FormControl>
    </Center>
  )
}