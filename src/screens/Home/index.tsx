import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import {
  Box,
  Icon,
  Stack,
  Avatar,
  FlatList,
  Divider,
  Pressable,
  Skeleton,
  Text,
  useToast
} from 'native-base'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { supabase } from '../../api/supabase';

import type { TelasDaRotaAuth } from '../../routes/Auth'
import { removeSessaoLocalmente } from '../../routes/Auth/asyncStorage';
import { signOutUsuario } from '../../routes/Auth/supabaseAuth';

type Props = NativeStackScreenProps<TelasDaRotaAuth, 'MainTabs'>

type tabela_teste = {
  id: string, 
  owner: string,
  seila_kk: string
}

export const Home = ({ navigation }: Props) => {
  const [posts, setPosts] = useState<tabela_teste[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const toast = useToast()

  useEffect(() => {
    async function carregarPosts() {
      try {
        const { data, error } = await supabase.from<tabela_teste>('tabela_teste').select('*')

        if(data === null) {
          return
        }

        setPosts(data)

        setTimeout(() => {
          setLoading(false)
        }, 1100)
      } catch (e) {
        console.error(e)
      }
    }

    carregarPosts()
  }, [])

  return (
    <Box
      flex='1'
      bg='blueGray.800'
      p='3'
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
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

              if (error) {
                toast.show({
                  status: 'error',
                  title: 'Tente novamente',
                  description: 'Ocorreu um erro ao fazer Logout, tente novamente'
                })

                return
              }

              removeSessaoLocalmente()
              navigation.navigate('SignIn')
            })()
          }}
        >
          <Avatar bg='amber.500'
            size='sm'
            source={{
              uri: 'https://avatars.githubusercontent.com/u/80872981?v=4'
            }}
          >
            RD
            <Avatar.Badge
              bg='green.600'
            />
          </Avatar>
        </Pressable>
      </Stack>

      <FlatList
        data={posts}
        mt='5'
        keyExtractor={(e) => String(e.id)}
        ItemSeparatorComponent={() => <Divider alignSelf='center' my='3' />}
        renderItem={(e) => {
          return (
            <Skeleton.Text
              lines={1}
              isLoaded={!loading}
              rounded='sm'
              w={{
                base: '100%',
                md: '500'
              }}
            >
              <Text
                color='white'
              >
                {e.item.seila_kk}
              </Text>
            </Skeleton.Text>
          )
        }}
      >

      </FlatList>
    </Box>
  )
}