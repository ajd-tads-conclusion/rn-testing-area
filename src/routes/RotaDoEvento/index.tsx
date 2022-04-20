import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Events } from '../../screens/Events'
import { TelaDoEvento } from '../../screens/TelaDoEvento'

export type TelasDaRotaDeEvento = {
  Events: undefined,
  TelaDoEvento: {
    id: string
  }
}

const EventoStack = createNativeStackNavigator<TelasDaRotaDeEvento>()

export const RotaDoEvento = () => {
  return (
    <EventoStack.Navigator
      initialRouteName='Events'
      screenOptions={{ headerShown: false }}
    >
      <EventoStack.Screen name='Events' component={Events} />
      <EventoStack.Screen name='TelaDoEvento' component={TelaDoEvento} />
    </EventoStack.Navigator>
  )
}