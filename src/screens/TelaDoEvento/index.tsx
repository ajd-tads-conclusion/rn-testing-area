import React, { useEffect, useState } from 'react'
import { Box, Stack, Text, Pressable, Circle, Icon, Button, ScrollView, Skeleton } from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import { TelasDaRotaDeEvento } from '../../routes/RotaDoEvento'
import { supabase } from '../../api/supabase'

type Props = NativeStackScreenProps<TelasDaRotaDeEvento, 'TelaDoEvento'>

type Evento = {
  id: string,
  titulo: string,
  descricao: string,
  criado_por: string,
  data: string,
  horario: string,
  modalidade: string,
  max_participantes: number
}

export const TelaDoEvento = ({ route, navigation }: Props) => {
  const [evento, setEvento] = useState<Evento | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { id } = route.params
  const BUTTON_COLOR = 'red.500'

  useEffect(() => {
    let componenteCarregado = true

    async function carregarEvento() {
      setLoading(true)
      const { data, error } =
        await supabase
          .from<Evento>('evento')
          .select('titulo,descricao,data,horario,modalidade,max_participantes,criado_por')
          .eq('id', id)
          .limit(1)
      if (error) {
        return
      }

      if (componenteCarregado) setEvento(data[0])

      setTimeout(() => {
        setLoading(false)
      }, 500)
    }

    carregarEvento()

    return () => {
      componenteCarregado = false
    }
  }, [])

  return (
    <Box
      flex='1'
      bg='blueGray.800'
      alignContent='center'
      justifyContent='center'
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
          <Skeleton.Text
            isLoaded={!loading}
            lines={1}
          >
            <Text color={BUTTON_COLOR}>
              {evento?.titulo}
            </Text>
          </Skeleton.Text>

          <Skeleton.Text
            isLoaded={!loading}
            lines={1}
          >
            <Text>
              {evento?.descricao}
            </Text>
          </Skeleton.Text>

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
              <Skeleton.Text
                isLoaded={!loading}
                lines={1}
                flex={0.8}
              >
                <Text
                  textAlign={'right'}
                >
                  {evento?.criado_por}
                </Text>
              </Skeleton.Text>
            </Stack>

            <Stack
              direction='row'
              justifyContent='space-between'
            >
              <Text>
                Data
              </Text>

              <Skeleton.Text
                isLoaded={!loading}
                lines={1}
                flex={0.8}
              >
                <Text>
                  {evento?.data}
                </Text>
              </Skeleton.Text>
            </Stack>

            <Stack
              direction='row'
              justifyContent='space-between'
            >
              <Text>
                Horário
              </Text>

              <Skeleton.Text
                isLoaded={!loading}
                lines={1}
                flex={0.8}
              >
                <Text>
                  {evento?.horario}
                </Text>
              </Skeleton.Text>
            </Stack>

            <Stack
              direction='row'
              justifyContent='space-between'
            >
              <Text>
                Modalidade
              </Text>

              <Skeleton.Text
                isLoaded={!loading}
                lines={1}
                flex={0.8}
              >
                <Text>
                  {evento?.modalidade}
                </Text>
              </Skeleton.Text>
            </Stack>

            <Stack
              direction='row'
              justifyContent='space-between'
            >
              <Text>
                Participantes
              </Text>
              <Skeleton.Text
                isLoaded={!loading}
                lines={1}
                flex={0.8}
              >
                <Text>
                  {evento?.max_participantes}
                </Text>
              </Skeleton.Text>
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