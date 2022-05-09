import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'

import { Home } from "../../screens/Home";
import { Tela2 } from "../../screens/Tela2";
import { RotaDoEvento } from '../RotaDoEvento'
import { IconeDaBarraInferior } from '../../components/IconeDaBarraInferior'

type IconeDoIonicons = keyof typeof Ionicons.glyphMap

export type TelasDaRotaPrincipal = {
  Home: undefined,
  RotaDoEvento: undefined,
  Tela2: undefined
}

const Tab = createBottomTabNavigator<TelasDaRotaPrincipal>()

export type PropsIconeBarraInferior = {
  rota: keyof TelasDaRotaPrincipal,
  componente: any,
  iconeAtivo: IconeDoIonicons,
  iconeInativo: IconeDoIonicons
}

const TabArr: PropsIconeBarraInferior[] = [
  { rota: 'RotaDoEvento', componente: RotaDoEvento, iconeAtivo: 'calendar', iconeInativo: 'calendar-outline' },
  { rota: 'Home', componente: Home, iconeAtivo: 'home', iconeInativo: 'home-outline' },
  { rota: 'Tela2', componente: Tela2, iconeAtivo: 'person', iconeInativo: 'person-outline' },
]

export const RotaPrincipal = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 44,
          backgroundColor: 'white',
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
              tabBarButton: (props) => <IconeDaBarraInferior {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}