import React from 'react'
import { Box, Stack, Text, Pressable, Circle, Icon } from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import { TelasDaRotaDeEvento } from '../../routes/RotaDoEvento'

type Props = NativeStackScreenProps<TelasDaRotaDeEvento, 'TelaDoEvento'>

export const TelaDoEvento = ({ route, navigation }: Props) => {
  return (
    <Box
      flex='1'
      bg='blueGray.800'
      alignContent='center'
      justifyItems='center'
    >

      <Stack
        direction='row'
        space='26px'
        px='15px'
        alignSelf='center'
        alignItems='center'
        justifyContent='space-between'
        minH='60px'
        w={{
          base: '100%',
          sm: '450'
        }}
      >
        <Pressable
          onPress={() => navigation.navigate('Events')}
        >
          <Circle
            size='7'
            bg='blueGray.400'
          />

        </Pressable>

        <Pressable
          onPress={() => alert('chamar drawer')}
        >
          <Icon as={Feather} name='menu' color='white' size='7' />
        </Pressable>
      </Stack>

      <Box
        bg='blueGray.400'
        rounded='sm'
        mx='5px'
        p='10px'
        // marginTop='10px'
      >

      </Box>
      {/* <Text
        color='white'
      >
        {route.params?.data_do_evento ?? 'nada no momento'}
      </Text> */}
    </Box>
  )
}