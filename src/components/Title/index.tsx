import React from 'react'
import { COLORS } from '../../theme/colors'
import { Text, TextProps } from 'react-native'

export function Title({ children, ...props }: TextProps) {
  return (
    <Text
      style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.white
      }}
      {...props}
    >
      {children}
    </Text>
  )
}