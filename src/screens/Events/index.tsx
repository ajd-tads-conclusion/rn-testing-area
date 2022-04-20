import React, { useEffect } from 'react'
import {
  Pressable,
  Input,
  Stack,
  Icon,
  FlatList,
  Divider
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import { CardEvento } from '../../components/CardEvento'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TelasDaRotaDeEvento } from '../../routes/RotaDoEvento'
import { supabase } from '../../api/supabase'

export type NavigationTelaDeEventos = NativeStackScreenProps<TelasDaRotaDeEvento, 'Events'>['navigation']

type DadosDoCardDeEvento = {
  id: string,
  titulo: string,
  descricao: string,
  data: string
}

export const Events = () => {
  const [eventos, setEventos] = React.useState<DadosDoCardDeEvento[] | null>(null)

  useEffect(() => {
    let componenteCarregado = true

    async function carregarPosts() {
      const { data, error } = await supabase.from<DadosDoCardDeEvento>('evento').select('titulo,descricao,data,id')
      if (error) {
        return
      }

      if (componenteCarregado) setEventos(data)
    }

    carregarPosts()

    return () => {
      componenteCarregado = false
    }
  }, [])

  return (
    <Stack
      bg='blueGray.800'
      flex='1'
      alignItems='center'
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
        <Input
          flex='1'
          nativeID='search'
          placeholderTextColor='gray.400'
          placeholder='Pesquisar eventos, pessoas, organizações'
          color='blueGray.800'
          bg='blueGray.100'

          type='e-mail'
          _hover={{
            color: 'blueGray.800'
          }}
        />

        <Pressable
          onPress={() => alert('chamar drawer')}
        >
          <Icon as={Feather} name='menu' color='white' size='7' />
        </Pressable>
      </Stack>

      <FlatList
        px='5px'
        marginBottom='60px'
        w={{
          base: '100%',
          sm: '450'
        }}
        data={eventos}
        ItemSeparatorComponent={() => {
          return (
            <Divider
              bg='blueGray.500'
              my='5px'
              w='95%'
              alignSelf='center'
            />
          )
        }}
        renderItem={
          ({ item }) => <CardEvento id={item.id} />
        }
      />

    </Stack>
  )
}