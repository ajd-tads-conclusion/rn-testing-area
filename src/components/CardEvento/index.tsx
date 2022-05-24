import React, { useEffect, useState } from 'react'
import { NavigationTelaDeEventos } from '../../screens/Events'
import { useNavigation } from '@react-navigation/native'
import { supabase } from '../../api/supabase'
import { Text, View, Pressable } from 'react-native'
import { COLORS } from '../../theme/colors'

type Props = {
  id: string
}

type DadosDoCardDeEvento = {
  id: string,
  title: string,
  description: string,
  date: string
}

export const CardEvento = (props: Props) => {
  const navigation = useNavigation<NavigationTelaDeEventos>()
  const [detalhes, setDetalhes] = useState<DadosDoCardDeEvento | null>(null)

  useEffect(() => {
    let componenteCarregado = true


    async function carregarDetalhes() {
      try {
        const { data, error } = await supabase.from<DadosDoCardDeEvento>('event').select('id,description,title,date').eq('id', props.id).limit(1)

        if (error) {
          return
        }

        if (componenteCarregado && data) setDetalhes(data[0])
      } catch (e) {
        console.error(e)
      }
    }
    carregarDetalhes()

    return () => {
      componenteCarregado = false
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
        {detalhes?.title || 'Carregando'}
      </Text>

      <Text
        style={{
          fontSize: 15,
          margin: 10,
          color: COLORS.white
        }}
      >
        {
          detalhes?.description
            ? detalhes.description.length > 100 ? detalhes.description.substring(0, 100) + '...' : detalhes.description
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
          onPress={() => navigation.navigate('TelaDoEvento', { id: props.id })}
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