import React from 'react'
import { Feather } from '@expo/vector-icons';
import { Box, Icon, Stack, Avatar } from 'native-base'

export const Home = () => {
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
        <Icon as={Feather} name='menu' color='white' size='7' />

        <Avatar bg='amber.500'
          size='sm'
          source={{
            uri: 'https://avatars.githubusercontent.com/u/80872981?v=4'
          }}
        >
          {/* TODO: pegar 2 iniciais do usuário */}
          RD
          <Avatar.Badge bg='green.600'/>
        </Avatar>
      </Stack>
    </Box>
  )
}