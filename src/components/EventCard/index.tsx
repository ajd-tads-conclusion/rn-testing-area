import React, {
  useEffect,
  useState
} from 'react'
import { COLORS } from '../../theme/colors'
import { supabase } from '../../api/supabase'
import { Text, View, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigationTelaDeEventos } from '../../screens/Events'

type Props = {
  id: string
}

type EventCardData = {
  id: string,
  title: string,
  description: string,
  date: string
}

export const EventCard = (props: Props) => {
  const navigation = useNavigation<NavigationTelaDeEventos>()
  const [details, setDetails] = useState<EventCardData | null>(null)

  useEffect(() => {
    let componentMounted = true

    async function fetchDetails() {
      try {
        const { data, error } = await supabase.from<EventCardData>('event').select('id,description,title,date').eq('id', props.id).limit(1)

        if (error) {
          return
        }

        if (componentMounted && data) setDetails(data[0])
      } catch (e) {
        console.error(e)
      }
    }

    fetchDetails()

    return () => {
      componentMounted = false
    }
  }, [])

  return (
    <View
      style={{
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.white,
        borderWidth: 1,
        margin: 10,
        marginVertical: 0,
        borderRadius: 5
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          margin: 10,
          color: COLORS.white
        }}
      >
        {details?.title || 'Carregando'}
      </Text>

      <Text
        style={{
          fontSize: 15,
          margin: 10,
          color: COLORS.white
        }}
      >
        {
          details?.description
            ? details.description.length > 100 ? details.description.substring(0, 100) + '...' : details.description
            : 'Carregando'
        }
      </Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          // alignItems: 'center',
          justifyContent: 'space-between',
          margin: 10
        }}
      >
        <Pressable
          onPress={() => alert('chamar toast e enviar notificação depois de x tempo')}
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 5,
            flex: 1,
            flexShrink: 0,
            padding: 10
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              textAlign: 'center',
              color: COLORS.secondary
            }}
          >
            Lembrar mais tarde
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('EventDetails', { id: props.id })}
          style={{
            backgroundColor: COLORS.tertiary,
            borderRadius: 5,
            borderColor: COLORS.white,
            borderWidth: 1,
            flexShrink: 1,
            padding: 10,
            marginLeft: 10
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: COLORS.white,
              textAlign: 'center'
            }}
          >
            Ver evento
          </Text>
        </Pressable>
      </View>
    </View>
  )
}