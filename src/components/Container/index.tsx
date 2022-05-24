import React from 'react'
import { View } from 'react-native'
import { COLORS } from '../../theme/colors'
import { useWindowDimensions } from 'react-native'

type Props = {
  children: React.ReactNode
}

export const Container = (props: Props) => {
  const { width } = useWindowDimensions()

  return (
    <View
      style={{
        flex: 1,
        width: width,
        backgroundColor: COLORS.primary
      }}
    >
      <View
        style={{
          alignSelf: 'center',
          flex: 1,
          width: width < 375 ? width : 375,
          backgroundColor: COLORS.white,
        }}
      >
        {props.children}
      </View>
    </View>
  )
}