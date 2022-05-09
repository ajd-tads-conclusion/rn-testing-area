import React, { useEffect, useState } from 'react'
import { NavigationTelaDeEventos } from '../../screens/Events'
import { useNavigation } from '@react-navigation/native'
import { supabase } from '../../api/supabase'
import { Text, View, Button } from 'react-native'

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
    <View>
      <Text>
        {detalhes?.title || 'Carregando'}
      </Text>

      <Text>
        {
          detalhes?.description
            ? detalhes.description.length > 100 ? detalhes.description.substring(0, 100) + '...' : detalhes.description
            : 'Carregando'
        }
      </Text>

      <View>
        <Button
          title="Lembrar mais tarde"
          onPress={() => alert('chamar toast e enviar notificação depois de x tempo')}
        />

        <Button
          title="Ver mais"
          onPress={() => navigation.navigate('TelaDoEvento', { id: props.id })}
        />
      </View>
    </View>
  )
}