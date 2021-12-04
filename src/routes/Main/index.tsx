import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Events } from "../../screens/Events";
import { Home } from "../../screens/Home";
import { Profile } from "../../screens/Profile";
import { TabBar } from "../../components/TabBar";

import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator()

export function MainTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                screenOptions={
                    {
                        headerShown: false,
                    }
                }
                initialRouteName="Home" 
                backBehavior="initialRoute"
                detachInactiveScreens
                tabBar={(props)=> <TabBar {...props}/>}
            >
                <Tab.Screen name="Events" component={Events}/>
                <Tab.Screen name="Home" component={Home}/>
                <Tab.Screen name="Profile" component={Profile}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}