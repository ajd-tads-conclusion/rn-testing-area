import React, { useEffect, useState } from 'react'
import { Box, Text, Stack, Button } from 'native-base'
import { NavigationTelaDeEventos } from '../../screens/Events'
import { useNavigation } from '@react-navigation/native'
import { supabase } from '../../api/supabase'

type Props = {
  id: string
}

type DadosDoCardDeEvento = {
  id: string,
  titulo: string,
  descricao: string,
  data: string
}

export const CardEvento = (props: Props) => {
  const navigation = useNavigation<NavigationTelaDeEventos>()
  const [detalhes, setDetalhes] = useState<DadosDoCardDeEvento | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const BUTTON_COLOR = 'red.500'

  useEffect(() => {
    let componenteCarregado = true


    async function carregarDetalhes() {
      try {
        const { data, error } = await supabase.from<DadosDoCardDeEvento>('evento').select('id,descricao,titulo,data').eq('id', props.id).limit(1)

        if (error) {
          return
        }

        if (componenteCarregado && data) setDetalhes(data[0])
      } catch (e) {
        console.error(e)
      }
    }
    setLoading(true)
    carregarDetalhes()
    setLoading(false)

    return () => {
      componenteCarregado = false
    }
  }, [])

  return (
    <Box
      bg='blueGray.300'
      rounded='sm'
      p='10px'
    >
      <Text color={BUTTON_COLOR}>
        {detalhes?.titulo || 'Carregando'}
      </Text>

      <Text color='blueGray.800'>
        {
          detalhes?.descricao
            ? detalhes.descricao.length > 100 ? detalhes.descricao.substring(0, 100) + '...' : detalhes.descricao
            : 'Carregando'
        }
      </Text>

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
          onPress={() => navigation.navigate('TelaDoEvento', { id: props.id })}
        >
          Acessar evento
        </Button>
      </Stack>
    </Box>
  )
}