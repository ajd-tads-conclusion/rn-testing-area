import React from 'react'
import { SignUp } from '../../screens/SignUp'
import { SignIn } from '../../screens/SignIn'
import { RotaPrincipal } from '../RotaPrincipal'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type TelasDaRotaAuth = {
  MainTabs: undefined,
  SignIn: undefined,
  SignUp: undefined,
  SignUpFinish: undefined
}

const Stack = createNativeStackNavigator<TelasDaRotaAuth>()

export const Auth = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: '#1e293b',
        }
      }}
    >
      <Stack.Navigator
        initialRouteName='SignIn'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen component={RotaPrincipal} name='MainTabs' />
        <Stack.Screen component={SignIn} name='SignIn' />
        <Stack.Screen component={SignUp} name='SignUp' />
      </Stack.Navigator>
    </NavigationContainer>
  )
}