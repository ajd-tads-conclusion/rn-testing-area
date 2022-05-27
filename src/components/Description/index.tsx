import React from 'react'
import { COLORS } from '../../theme/colors'
import { Text, TextProps } from 'react-native'

export function Description({ children, ...props }: TextProps) {
  return (
    <Text
      style={{
        fontSize: 15,
        margin: 10,
        color: COLORS.white
      }}
      {...props}
    >
      {children}
    </Text>
  )
}
