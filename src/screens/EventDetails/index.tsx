import React, {
  useEffect,
  useState
} from 'react'
import { COLORS } from '../../theme/colors'
import { supabase } from '../../api/supabase'
import { Description, Title } from '../../components'
import { EventRouteScreens } from '../../routes/EventRoute'
import { Button, Pressable, ScrollView, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<EventRouteScreens, 'EventDetails'>

export type Event = {
  id: string,
  title: string,
  description: string,
  created_by: string,
  date: string,
  time: string,
  modality: string,
  max_participants: number,
  is_event: boolean
}

export const EventDetails = ({ route, navigation }: Props) => {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { id } = route.params

  useEffect(() => {
    let componentMounted = true

    async function fetchEvent() {
      setLoading(true)
      const { data, error } =
        await supabase
          .from<Event>('event')
          .select('title,description,date,time,modality,max_participants,created_by')
          .eq('id', id)
          .limit(1)
      if (error) {
        return
      }

      if (componentMounted) setEvent(data[0])

      setTimeout(() => {
        setLoading(false)
      }, 500)
    }

    fetchEvent()

    return () => {
      componentMounted = false
    }
  }, [])

  return (
    <View>
      <Pressable
        onPress={navigation.goBack}
      >
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: COLORS.primary,
          }}
        />
      </Pressable>
      <ScrollView>

        <Title>
          Evento
        </Title>

        <Description>
          {event?.title}
        </Description>

        <Title>
          Criado por
        </Title>

        <Description>
          {event?.created_by}
        </Description>

        <Title>
          Data
        </Title>

        <Description>
          {event?.date}
        </Description>

        <Title>
          Horário
        </Title>


        <Description>
          {event?.time}
        </Description>

        <Title>
          Modalidade
        </Title>

        <Description>
          {event?.modality}
        </Description>

        <Title>
          Participantes
        </Title>

        <Description>
          {event?.max_participants.toString()}
        </Description>

        <View>
          <Button
            title='Ver organizador'
          />

          <Button
            title='Inscrever-se'
          />
        </View>

      </ScrollView>
    </View>
  )
}