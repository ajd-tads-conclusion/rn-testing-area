import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'

import { Home } from "../../screens/Home";
import { Tela2 } from "../../screens/Tela2";
import { RotaDoEvento } from '../RotaDoEvento'

type IconName = keyof typeof Ionicons.glyphMap

export type TelasDaRotaPrincipal = {
  Home: undefined,
  RotaDoEvento: undefined,
  Tela2: undefined
}

const Tab = createBottomTabNavigator<TelasDaRotaPrincipal>()

export const RotaPrincipal = () => {
  return (
    <Tab.Navigator
      screenOptions={(route) => {
        return {
          headerShown: false,
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'yellow',
          tabBarStyle: {
            position: 'absolute',
            bottom: 5,
            left: 5,
            right: 5,
            elevation: 0,
            backgroundColor: '#ff6868',
            borderRadius: 4,
            borderTopWidth: 0,
            height: 50,
          },
          tabBarIcon: ({ color, focused }) => {
            let iconName: IconName | undefined

            if (!focused) {
              switch (route.route.name) {
                case "Home":
                  iconName = 'add-circle'
                  break
                case "RotaDoEvento":
                  iconName = 'alarm'
                  break
                case "Tela2":
                  iconName = 'airplane'
                  break
              }
            }

            if (focused) {
              switch (route.route.name) {
                case "Home":
                  iconName = 'add-circle-outline'
                  break
                case "RotaDoEvento":
                  iconName = 'alarm-outline'
                  break
                case "Tela2":
                  iconName = 'airplane-outline'
                  break
              }
            }
            return (
              <Ionicons
                name={iconName}
                size={30}
              />
            )
          }
        }
      }}
      initialRouteName='RotaDoEvento'
    >
      <Tab.Screen component={RotaDoEvento} name="RotaDoEvento" />
      <Tab.Screen component={Home} name="Home" />
      <Tab.Screen component={Tela2} name="Tela2" />
    </Tab.Navigator>
  )
}