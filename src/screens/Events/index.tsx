import React, {
  useEffect,
  useCallback,
  useState
} from 'react'
import { COLORS } from '../../theme/colors'
import { Feather } from '@expo/vector-icons'
import { supabase } from '../../api/supabase'
import { EventCardData } from '../../../types/types'
import { EventCard, SearchBar } from '../../components'
import { EventRouteScreens } from '../../routes/EventRoute'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View, FlatList, Pressable, RefreshControl } from 'react-native'

export type EventScreenNavigation = NativeStackScreenProps<EventRouteScreens, 'Events'>['navigation']

export const Events = () => {
  const [events, setEvents] = useState<EventCardData[] | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    console.log('refreshing')
    setRefreshing(false)
  }, []);

  useEffect(() => {
    let componentMounted = true

    async function fetchPosts() {
      const { data, error } = await supabase.from<EventCardData>('event').select('title,description,date,id')

      if (error) {
        return
      }

      if (componentMounted) setEvents(data)
    }

    fetchPosts()

    return () => {
      componentMounted = false
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
        data={events}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
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