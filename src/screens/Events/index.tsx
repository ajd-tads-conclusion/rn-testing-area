import React, { useEffect } from 'react'
import { COLORS } from '../../theme/colors'
import { Feather } from '@expo/vector-icons'
import { supabase } from '../../api/supabase'
import { EventCard, SearchBar } from '../../components'
import { View, FlatList, Pressable } from 'react-native'
import { EventRouteScreens } from '../../routes/EventRoute'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type NavigationTelaDeEventos = NativeStackScreenProps<EventRouteScreens, 'Events'>['navigation']

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
        flex: 1
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
          padding: 10,
          borderRadius: 5,
          backgroundColor: COLORS.secondary,
          borderColor: COLORS.white,
          borderWidth: 1
        }}
      >
        <SearchBar />
        <Pressable
          onPress={() => alert('fazer pesquisa')}
          style={{
            marginLeft: 10
          }}
        >
          <Feather name='search' color={COLORS.white} size={20} />
        </Pressable>
      </View>

      <FlatList
        data={eventos}
        style={{
          borderColor: COLORS.error1,
          borderWidth: 1,
          paddingBottom: 44 + 16
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 2,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 5,
                marginVertical: 10,
                backgroundColor: COLORS.secondary
              }}
            />
          )
        }}
        renderItem={
          ({ item }) => <EventCard id={item.id} />
        }
      />

    </View>
  )
}