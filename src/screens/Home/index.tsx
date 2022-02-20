import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { Box, Icon, Stack, Avatar, FlatList, Divider, Pressable, Skeleton, Text } from 'native-base'

type Post = {
  userId: number,
  id: number,
  title: string,
  body: string
}

export const Home = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // const teste = [{userId: 13284, id: 1, title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'}]
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
      .then(response => response.json())
      .then(data => {
        setLoading(false)
        setPosts(data)
      })
      .catch(error => console.error(error));
  })

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
        alwaysBounceVertical={true}
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