import React from 'react'
import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../theme/colors'

export const BackButton = () => {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={navigation.goBack}
    >
      <Ionicons
        name='arrow-back-circle-sharp'
        size={35}
        color={COLORS.white}
      />
    </Pressable>
  )
}