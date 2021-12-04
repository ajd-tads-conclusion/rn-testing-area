import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { RectButton } from 'react-native-gesture-handler'

export const TabBar = ({ navigation }: BottomTabBarProps) => {
    return (
        <View style={styles.container}>
            <RectButton  
                style={styles.buttonContainer}
                onPress={()=>{
                    navigation.navigate('Events')
                }}
            >
                <View
                    style={styles.button}
                />

                
                <Text style={styles.label}>
                    Events
                </Text>
            </RectButton>
            
            <RectButton  
                style={styles.buttonContainer}
                onPress={()=>{
                    navigation.navigate('Home')
                }}
            >
                <View
                    style={styles.button}
                />

                
                <Text style={styles.label}>
                    Home
                </Text>
            </RectButton>
            
            <RectButton  
                style={styles.buttonContainer}
                onPress={()=>{
                    navigation.navigate('Profile')
                }}
            >
                <View
                    style={styles.button}
                />

                
                <Text style={styles.label}>
                    Profile
                </Text>
            </RectButton>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a7ceff',
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        borderTopWidth: 3,
        borderTopColor: '#000000'
    },
    buttonContainer: {
        display: 'flex',
        marginTop: -15,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#3c94ff',
        height: 45,
        width: 45,
        borderRadius: 50,
        // borderTopWidth: 3,
        // borderTopColor: '#000000'
    },
    label: {
        color: '#022a5b'
    }
})