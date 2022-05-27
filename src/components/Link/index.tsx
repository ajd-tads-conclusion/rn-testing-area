import React from 'react'
import { Pressable, Text } from 'react-native'
import { COLORS } from '../../theme/colors'

type Props = {
  onPress: () => void,
  title: string
}

export const Link = ({ onPress, title }: Props) => {
  return (
    <Pressable
      onPress={onPress}
    >
      <Text
        style={{
          color: COLORS.white,
          textDecorationLine: 'underline',
          textDecorationStyle: 'solid',
        }}
      >
        {title}
      </Text>
    </Pressable>
  )
}