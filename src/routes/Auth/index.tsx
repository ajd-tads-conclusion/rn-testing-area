import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RotaPrincipal } from '../RotaPrincipal'
import { SignUp } from '../../screens/SignUp'
import { SignUpFinish } from '../../screens/SignUpFinish'
import { SignIn } from '../../screens/SignIn'

export type TelasDaRotaAuth = {
  MainTabs: undefined,
  SignIn: undefined,
  SignUp: undefined,
  SignUpFinish: undefined
}

const Stack = createNativeStackNavigator<TelasDaRotaAuth>()

export const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName='SignIn'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={RotaPrincipal} name='MainTabs' />
      <Stack.Screen component={SignIn} name='SignIn' />
      <Stack.Screen component={SignUp} name='SignUp' />
      <Stack.Screen component={SignUpFinish} name='SignUpFinish' />
    </Stack.Navigator>
  )
}