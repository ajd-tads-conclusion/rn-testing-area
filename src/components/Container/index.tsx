import React from 'react'
import { View, Dimensions } from 'react-native'
import { COLORS } from '../../theme/colors'

type Props = {
  children: React.ReactNode
}

export const Container = (props: Props) => {
  const { width } = Dimensions.get('screen')

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