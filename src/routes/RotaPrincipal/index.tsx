import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'

import { Home } from "../../screens/Home";
import { Tela1 } from "../../screens/Tela1";
import { Tela2 } from "../../screens/Tela2";

type IconName = keyof typeof Ionicons.glyphMap

export type TelasDaRotaPrincipal = {
  Home: undefined,
  Tela1: undefined,
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
            bottom: 10,
            left: 10,
            right: 10,
            elevation: 0,
            backgroundColor: '#ff6868',
            borderRadius: 15,
            borderTopWidth: 0,
            height: 100,
          },
          tabBarIcon: ({ color, focused }) => {
            let iconName: IconName | undefined

            if (!focused) {
              switch (route.route.name) {
                case "Home":
                  iconName = 'add-circle'
                  break
                case "Tela1":
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
                case "Tela1":
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
      initialRouteName='Home'
    >
      <Tab.Screen component={Tela1} name="Tela1" />
      <Tab.Screen component={Home} name="Home" />
      <Tab.Screen component={Tela2} name="Tela2" />
    </Tab.Navigator>
  )
}