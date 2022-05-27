import React from 'react'
import { Home } from '../../screens/Home'
import { EventRoute } from '../EventRoute'
import { COLORS } from '../../theme/colors'
import { Ionicons } from '@expo/vector-icons'
import { Profile } from '../../screens/Profile'
import { BottomBarIcon } from '../../components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

type IoniconsType = keyof typeof Ionicons.glyphMap

export type MainRouteScreenParams = {
  Home: undefined,
  EventRoute: undefined,
  Profile: undefined
}

const Tab = createBottomTabNavigator<MainRouteScreenParams>()

export type BottomNavIconProps = {
  route: keyof MainRouteScreenParams,
  component: any,
  activeIcon: IoniconsType,
  inactiveIcon: IoniconsType
}

const TabArr: BottomNavIconProps[] = [
  { route: 'EventRoute', component: EventRoute, activeIcon: 'calendar', inactiveIcon: 'calendar-outline' },
  { route: 'Home', component: Home, activeIcon: 'home', inactiveIcon: 'home-outline' },
  { route: 'Profile', component: Profile, activeIcon: 'person', inactiveIcon: 'person-outline' },
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
          <Tab.Screen key={index} name={item.route} component={item.component}
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