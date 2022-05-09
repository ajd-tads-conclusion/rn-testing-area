import React from 'react'
import { View, Dimensions } from 'react-native'

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
        backgroundColor: '#1e293b'
      }}
    >
      <View
        style={{
          alignSelf: 'center',
          flex: 1,
          width: width < 375 ? width : 375,
          backgroundColor: '#fff',
        }}
      >
        {props.children}
      </View>
    </View>
  )
}