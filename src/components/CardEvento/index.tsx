import React from 'react'
import { Box, Text, Stack, Button, Skeleton } from 'native-base'
import { NavigationTelaDeEventos } from '../../screens/Events'
import { useNavigation } from '@react-navigation/native'

export type DadosDoEvento = {
  id: string,
  titulo: string,
  data_do_evento: string,
  descricao: string,
  horario_do_evento: string,
  valor: string,
  imagens: string[]
}

type Props = {
  dadosDoEvento: DadosDoEvento
}

export const CardEvento = (props: Props) => {
  const navigation = useNavigation<NavigationTelaDeEventos>()

  const BUTTON_COLOR = 'red.500'

  return (
    <Box
      bg='blueGray.400'
      rounded='sm'
      p='10px'
    >
      <Text color={BUTTON_COLOR}>
        {
          props.dadosDoEvento.titulo
        }
      </Text>

      <Text color='blueGray.800'>
        {
          `${props.dadosDoEvento.descricao.substring(0, 150)}...`
        }
      </Text>

      <Stack
        direction='row'
        justifyContent='center'
        space='2'
        my='10px'
      >

        {
          props.dadosDoEvento.imagens.map((_, i) => {
            return (
              i < 2
                ? <Skeleton
                  flex='1'
                  rounded='sm'
                  key={i}
                  maxW='60%'
                  h={['80px', '100px']}
                />
                : null
            )
          })
        }

      </Stack>

      <Stack
        direction='row'
        space='2'
      >
        <Button
          variant='outline'
          flex='1'
          borderColor={BUTTON_COLOR}
          _text={{
            color: BUTTON_COLOR
          }}
          onPress={() => alert('chamar toast e enviar notificação depois de x tempo')}
        >
          Lembrar mais tarde
        </Button>

        <Button
          variant='solid'
          flex='1'
          bg={BUTTON_COLOR}
          _focus={{
            bg: 'red.600'
          }}
          onPress={() => navigation.navigate('TelaDoEvento', props.dadosDoEvento)}
        >
          Acessar evento
        </Button>
      </Stack>
    </Box>
  )
}