import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'

import { Home } from "../../screens/Home";
import { Profile } from "../../screens/Profile";
import { EventRoute } from '../EventRoute'
import { BottomBarIcon } from '../../components/BottomBarIcon'
import { COLORS } from "../../theme/colors";

type IconeDoIonicons = keyof typeof Ionicons.glyphMap

export type TelasDaRotaPrincipal = {
  Home: undefined,
  EventRoute: undefined,
  Profile: undefined
}

const Tab = createBottomTabNavigator<TelasDaRotaPrincipal>()

export type PropsIconeBarraInferior = {
  rota: keyof TelasDaRotaPrincipal,
  componente: any,
  iconeAtivo: IconeDoIonicons,
  iconeInativo: IconeDoIonicons
}

const TabArr: PropsIconeBarraInferior[] = [
  { rota: 'EventRoute', componente: EventRoute, iconeAtivo: 'calendar', iconeInativo: 'calendar-outline' },
  { rota: 'Home', componente: Home, iconeAtivo: 'home', iconeInativo: 'home-outline' },
  { rota: 'Profile', componente: Profile, iconeAtivo: 'person', iconeInativo: 'person-outline' },
]

export const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 44,
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 8,
          right: 8,
          left: 8,
          borderRadius: 4,
          flex: 1,
          display: 'flex'
        }
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.rota} component={item.componente}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <BottomBarIcon {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}