import React from 'react'
import { Box, Stack, Text, Pressable, Circle, Icon, Button, ScrollView } from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import { TelasDaRotaDeEvento } from '../../routes/RotaDoEvento'

type Props = NativeStackScreenProps<TelasDaRotaDeEvento, 'TelaDoEvento'>

export const TelaDoEvento = ({ route, navigation }: Props) => {
  const BUTTON_COLOR = 'red.500'

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
            bg='blueGray.300'
          />

        </Pressable>

        <Pressable
          onPress={() => alert('chamar drawer')}
        >
          <Icon as={Feather} name='menu' color='white' size='7' />
        </Pressable>
      </Stack>
      <ScrollView
        mb='60px'
      >

        <Box
          bg='blueGray.300'
          rounded='sm'
          mx='5px'
          p='10px'
        // marginTop='10px'
        >
          <Text
            color={BUTTON_COLOR}
          >
            {route.params?.titulo ?? 'nada no momento'}
          </Text>

          <Text>
            {route.params?.descricao ?? 'nada no momento'}
          </Text>

          <Box
            bg='blueGray.400'
            rounded='sm'
            marginTop='10px'
            p='10px'
          >

            <Stack
              direction='row'
              justifyContent='space-between'
            >
              <Text>
                Criado por
              </Text>

              <Text>
                {route.params?.autor ?? 'Paulo Guina'}
              </Text>
            </Stack>

            <Stack
              direction='row'
              justifyContent='space-between'
            >
              <Text>
                Data
              </Text>

              <Text>
                {route.params?.data_do_evento ?? 'data aqui'}
              </Text>
            </Stack>

            <Stack
              direction='row'
              justifyContent='space-between'
            >
              <Text>
                Horário
              </Text>

              <Text>
                {route.params?.horario_do_evento ?? 'horario aqui'}
              </Text>
            </Stack>

            <Stack
              direction='row'
              justifyContent='space-between'
            >
              <Text>
                Modalidade
              </Text>

              <Text>
                {route.params?.modalidade ?? 'modalidade aqui'}
              </Text>
            </Stack>

            <Stack
              direction='row'
              justifyContent='space-between'
            >
              <Text>
                Participantes
              </Text>

              <Text>
                {route.params?.num_de_participantes ?? 'horario aqui'}
                {' / '}
                {route.params?.max_num_de_participantes ?? 'num max'}
              </Text>
            </Stack>

          </Box>

          <Stack
            direction='row'
            space='2'
            mt='10px'
          >
            <Button
              variant='outline'
              flex='1'
              borderColor={BUTTON_COLOR}
              _text={{
                color: BUTTON_COLOR, 
                fontSize: 'xs'
              }}
            >
              VER ORGANIZADOR
            </Button>

            <Button
              variant='solid'
              flex='1'
              bg={BUTTON_COLOR}
              _text={{
                fontSize: 'xs'
              }}
            >
              INSCREVER-SE
            </Button>
          </Stack>
        </Box>

      </ScrollView>
    </Box>
  )
}