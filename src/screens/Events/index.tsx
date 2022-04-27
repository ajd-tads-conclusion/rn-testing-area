import React, { useEffect } from 'react'
import { View, FlatList, TextInput, Pressable } from 'react-native'
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
    <View>
      <View>
        <TextInput
          nativeID='search'
          placeholderTextColor='gray.400'
          placeholder='Pesquisar eventos, pessoas, organizações'
        />

        <Pressable
          onPress={() => alert('chamar drawer')}
        >
          <Feather name='menu' color='white' size={7} />
        </Pressable>
      </View>

      <FlatList
        data={eventos}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 5,
                width: '100%',
                backgroundColor: 'red'
              }}
            />
          )
        }}
        renderItem={
          ({ item }) => <CardEvento id={item.id} />
        }
      />

    </View>
  )
}