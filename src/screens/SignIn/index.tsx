import React from 'react';
import { Center, FormControl, Input, Button, Stack, Text } from 'native-base';

export const SignIn = () => {
  return (
    <Center flex={1} bg='blueGray.800'>
      <FormControl p='3' w={{
        base: '100%',
        md: 500
      }}>
        <Stack space='3'>

          <FormControl.Label _text={{
            color: 'white',
            fontSize: 'xl'
          }}>
            Usuário
          </FormControl.Label>
          <Input placeholderTextColor='gray.400' placeholder='insira o seu usuário' color='white' />

          <FormControl.Label _text={{
            color: 'white',
            fontSize: 'xl'
          }}>
            Senha
          </FormControl.Label>
          <Input placeholderTextColor='gray.400' placeholder='insira sua senha aqui' color='white' />

          {/* TODO: chamar o supabase login aqui */}
          <Button>
            Cadastrar-se
          </Button>

          <Stack direction='row' alignItems='center' alignSelf='center'>
            <Text color={'white'}>
              já possui uma conta?
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