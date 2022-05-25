import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import { EventRouteScreens } from '../../routes/EventRoute'
import { supabase } from '../../api/supabase'
import { Button, Pressable, ScrollView, Text, View } from 'react-native'
type Props = NativeStackScreenProps<EventRouteScreens, 'EventDetails'>

export type Evento = {
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
  const [evento, setEvento] = useState<Evento | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { id } = route.params

  useEffect(() => {
    let componenteCarregado = true

    async function carregarEvento() {
      setLoading(true)
      const { data, error } =
        await supabase
          .from<Evento>('event')
          .select('title,description,date,time,modality,max_participants,created_by')
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
    <View>

      <View>
        <Pressable
          onPress={() => navigation.navigate('Events')}
        >
          <View
          />

        </Pressable>

        <Pressable
          onPress={() => alert('chamar drawer')}
        >
          <Feather name='menu' color='white' size={7} />
        </Pressable>
      </View>
      <ScrollView>

        <View>
          <Text
          >
            <Text>
              {evento?.title}
            </Text>
          </Text>

          <Text>
            <Text>
              {evento?.description}
            </Text>
          </Text>

          <View>

            <View>
              <Text>
                Criado por
              </Text>
              <Text>
                <Text>
                  {evento?.created_by}
                </Text>
              </Text>
            </View>

            <View>
              <Text>
                Data
              </Text>

              <Text>
                <Text>
                  {evento?.date}
                </Text>
              </Text>
            </View>

            <View>
              <Text>
                Horário
              </Text>

              <Text>
                <Text>
                  {evento?.time}
                </Text>
              </Text>
            </View>

            <View>
              <Text>
                Modalidade
              </Text>

              <Text>
                <Text>
                  {evento?.modality}
                </Text>
              </Text>
            </View>

            <View>
              <Text>
                Participantes
              </Text>
              <Text>
                <Text>
                  {evento?.max_participants}
                </Text>
              </Text>
            </View>

          </View>

          <View>
            <Button
              title='Ver organizador'
            />

            <Button
              title='Inscrever-se'
            />
          </View>
        </View>

      </ScrollView>
    </View>
  )
}