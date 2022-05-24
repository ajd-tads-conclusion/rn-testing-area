import React from 'react'
import { Text } from 'react-native'
import { COLORS } from '../../theme/colors'

type Props = {
  campo?: {
    message?: string
  }
}

export const LabelDeErro = ({ campo }: Props) => {
  return (
    <Text
      style={{
        color: COLORS.error,
        fontSize: 12,
        marginBottom: 5
      }}
    >
      {campo?.message}
    </Text>
  )
}