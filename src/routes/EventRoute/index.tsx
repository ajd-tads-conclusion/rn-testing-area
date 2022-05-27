import React from 'react'
import { Events } from '../../screens/Events'
import { EventDetails } from '../../screens/EventDetails'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type EventRouteScreens = {
  Events: undefined,
  EventDetails: {
    id: string
  }
}

const EventoStack = createNativeStackNavigator<EventRouteScreens>()

export const EventRoute = () => {
  return (
    <EventoStack.Navigator
      initialRouteName='Events'
      screenOptions={{ headerShown: false }}
    >
      <EventoStack.Screen name='Events' component={Events} />
      <EventoStack.Screen name='EventDetails' component={EventDetails} />
    </EventoStack.Navigator>
  )
}