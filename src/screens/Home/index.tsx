import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { Box, Icon, Stack, Avatar, FlatList, Divider, Pressable, Skeleton, Text } from 'native-base'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import type { TelasDaRotaAuth } from '../../routes/Auth'

type Props = NativeStackScreenProps<TelasDaRotaAuth, 'Home'>

type Post = {
  userId: number,
  id: number,
  title: string,
  body: string
}

export const Home = ({ navigation }: Props) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function carregarPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
        const data = await response.json()

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
          onPress={() => alert('a')}
        >
          <Avatar bg='amber.500'
            size='sm'
            source={{
              uri: 'https://avatars.githubusercontent.com/u/80872981?v=4'
            }}
          >
            {/* TODO: pegar 2 iniciais do usuário */}
            RD
            <Avatar.Badge
              // aqui pode ser implementado uma lógica que muda a cor do bg conforme o status
              // (online, ausente, nao pertube)
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
                {e.item.body}
              </Text>
            </Skeleton.Text>
          )
        }}
      >

      </FlatList>
    </Box>
  )
}