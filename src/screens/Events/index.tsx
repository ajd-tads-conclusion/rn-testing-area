import React from 'react'
import {
  Pressable,
  Input,
  Stack,
  Icon,
  FlatList,
  Divider
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import { CardEvento, DadosDoEvento } from '../../components/CardEvento'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TelasDaRotaDeEvento } from '../../routes/RotaDoEvento'

const eventosFake: DadosDoEvento[] = [
  {
    id: '1',
    titulo: '1ª CORRIDA DO 5º BPM - 40 ANOS EU PRECISO DE UM TITULO GRANDE PARA TESTAR',
    data_do_evento: '13-03-2022',
    autor: 'aaa',
    modalidade: 'sjdbf',
    descricao: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
    horario_do_evento: '06:00',
    valor: 'R$50.00',
    imagens: ['', '']
  },
  {
    id: '2',
    titulo: 'VIII VOLTA DE SÃO JOSÉ',
    data_do_evento: '20-03-2022',
    autor: 'aaa',
    modalidade: 'sjdbf',
    descricao: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
    horario_do_evento: '06:00',
    valor: 'R$55.00',
    imagens: ['', '', '']
  },
  {
    id: '3',
    titulo: '2ª CORRIDA DA GAOPA',
    data_do_evento: '10-04-2022',
    autor: 'aaa',
    modalidade: 'sjdbf',
    descricao: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
    horario_do_evento: '06:00',
    valor: 'R$70.00',
    imagens: ['']
  },
  {
    id: '4',
    titulo: '2ª CORRIDA DA GAOPA',
    data_do_evento: '10-04-2022',
    autor: 'aaa',
    modalidade: 'sjdbf',
    descricao: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
    horario_do_evento: '06:00',
    valor: 'R$70.00',
    imagens: ['']
  },
  {
    id: '5',
    titulo: 'MEIA MARATONA DE CASTANHAL',
    data_do_evento: '13-03-2022',
    autor: 'aaa',
    modalidade: 'sjdbf',
    descricao: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
    horario_do_evento: '05:30',
    valor: 'R$90.00',
    imagens: ['', '', '', '', '', '']
  }
]

export type NavigationTelaDeEventos = NativeStackScreenProps<TelasDaRotaDeEvento, 'Events'>['navigation']

export const Events = (navigation: NavigationTelaDeEventos) => {
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
        data={eventosFake}
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
          ({ item }) => <CardEvento dadosDoEvento={item}/>
        }
      />

    </Stack>
  )
}