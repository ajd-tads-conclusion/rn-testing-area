import React from 'react'
import { Feather } from '@expo/vector-icons';
import {
  Box,
  Icon,
  Stack,
  Avatar,
  Pressable,
  useToast,
  Image
} from 'native-base'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import type { TelasDaRotaAuth } from '../../routes/Auth'
import { removeSessaoLocalmente } from '../../helpers/AsyncStorage/asyncStorage';
import { signOutUsuario } from '../../routes/Auth/supabaseAuth';

type Props = NativeStackScreenProps<TelasDaRotaAuth, 'MainTabs'>

export const Home = ({ navigation }: Props) => {
  const toast = useToast()

  return (
    <Box
      flex='1'
      bg='blueGray.800'
      p='3'
      alignItems='center'
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        w={{
          base: '100%',
          sm: '450'
        }}
      >
        <Pressable
          onPress={() => alert('a')}
        >
          <Icon as={Feather} name='menu' color='white' size='7' />
        </Pressable>

        <Pressable
          onPress={() => {
            (async function () {
              const error = await signOutUsuario()
              removeSessaoLocalmente()

              if (error) {
                toast.show({
                  title: 'Tente novamente',
                  description: 'Ocorreu um erro ao fazer Logout, tente novamente'
                })

                return
              }

              navigation.navigate('SignIn')
            })()
          }}
        >
          <Avatar
            size={'md'}
            bg="amber.500"
            source={{
              uri: "https://github.com/ddanielsantos.png"
            }}>
            RD
            <Avatar.Badge
              size={7}
            />
          </Avatar>

        </Pressable>
      </Stack>
    </Box>
  )
}