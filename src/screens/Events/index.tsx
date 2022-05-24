import React, { useEffect } from 'react'
import { View, FlatList, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { CardEvento } from '../../components/CardEvento'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TelasDaRotaDeEvento } from '../../routes/RotaDoEvento'
import { supabase } from '../../api/supabase'
import { BarraDePesquisa } from '../../components/BarraDePesquisa'
import { COLORS } from '../../theme/colors'

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
      const { data, error } = await supabase.from<DadosDoCardDeEvento>('event').select('title,description,date,id')
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
    <View
      style={{
        // backgroundColor: COLORS.debug
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <BarraDePesquisa />
        <Pressable
          onPress={() => alert('chamar drawer')}
        >
          <Feather name='menu' color='black' size={25} />
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
                backgroundColor: COLORS.debug
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