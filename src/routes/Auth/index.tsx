import React from 'react'
import { Main } from '../Main'
import { COLORS } from '../../theme/colors'
import { SignUp } from '../../screens/SignUp'
import { SignIn } from '../../screens/SignIn'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type AuthScreenParams = {
  MainTabs: undefined,
  SignIn: undefined,
  SignUp: undefined
}

const Stack = createNativeStackNavigator<AuthScreenParams>()

export const Auth = () => {
  return (
    <NavigationContainer
      // TODO: #24 finish theme config
      theme={{
        colors: {
          background: COLORS.primary,
          notification: COLORS.primary,
          text: COLORS.white,
          card: COLORS.primary,
          border: COLORS.primary,
          primary: COLORS.primary,
        }
      }}
    >
      <Stack.Navigator
        initialRouteName='SignIn'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen component={Main} name='MainTabs' />
        <Stack.Screen component={SignIn} name='SignIn' />
        <Stack.Screen component={SignUp} name='SignUp' />
      </Stack.Navigator>
    </NavigationContainer>
  )
}