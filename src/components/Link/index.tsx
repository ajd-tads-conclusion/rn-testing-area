import React from 'react'
import { Pressable, Text } from 'react-native'

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
          padding: 5,
          textDecorationLine: 'underline',
          textDecorationStyle: 'solid',
        }}
      >
        {title}
      </Text>
    </Pressable>
  )
}