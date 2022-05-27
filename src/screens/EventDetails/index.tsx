import React, {
  useEffect,
  useState
} from 'react'
import { COLORS } from '../../theme/colors'
import { supabase } from '../../api/supabase'
import { EventRouteScreens } from '../../routes/EventRoute'
import { Description, Title, BackButton } from '../../components'
import { Button, ScrollView, View } from 'react-native'
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

export const EventDetails = ({ route }: Props) => {
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

      // setTimeout(() => {
      // }, 500)
      setLoading(false)
    }

    fetchEvent()

    return () => {
      componentMounted = false
    }
  }, [])

  return (
    <View
      style={{
        flex: 1,
        borderColor: COLORS.white,
        borderWidth: 1,
      }}
    >

      <ScrollView>

        <BackButton />

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
          Máximo de participantes
        </Title>

        <Description>
          {event?.max_participants}
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