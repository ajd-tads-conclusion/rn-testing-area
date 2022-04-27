import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import { TelasDaRotaDeEvento } from '../../routes/RotaDoEvento'
import { supabase } from '../../api/supabase'
import { Button, Pressable, ScrollView, Text, View } from 'react-native'
type Props = NativeStackScreenProps<TelasDaRotaDeEvento, 'TelaDoEvento'>

export type Evento = {
  id: string,
  titulo: string,
  descricao: string,
  criado_por: string,
  data: string,
  horario: string,
  modalidade: string,
  max_participantes: number,
  is_event: boolean
}

export const TelaDoEvento = ({ route, navigation }: Props) => {
  const [evento, setEvento] = useState<Evento | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { id } = route.params
  const BUTTON_COLOR = 'red.500'

  useEffect(() => {
    let componenteCarregado = true

    async function carregarEvento() {
      setLoading(true)
      const { data, error } =
        await supabase
          .from<Evento>('evento')
          .select('titulo,descricao,data,horario,modalidade,max_participantes,criado_por')
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
              {evento?.titulo}
            </Text>
          </Text>

          <Text>
            <Text>
              {evento?.descricao}
            </Text>
          </Text>

          <View>

            <View>
              <Text>
                Criado por
              </Text>
              <Text>
                <Text>
                  {evento?.criado_por}
                </Text>
              </Text>
            </View>

            <View>
              <Text>
                Data
              </Text>

              <Text>
                <Text>
                  {evento?.data}
                </Text>
              </Text>
            </View>

            <View>
              <Text>
                Horário
              </Text>

              <Text>
                <Text>
                  {evento?.horario}
                </Text>
              </Text>
            </View>

            <View>
              <Text>
                Modalidade
              </Text>

              <Text>
                <Text>
                  {evento?.modalidade}
                </Text>
              </Text>
            </View>

            <View>
              <Text>
                Participantes
              </Text>
              <Text>
                <Text>
                  {evento?.max_participantes}
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