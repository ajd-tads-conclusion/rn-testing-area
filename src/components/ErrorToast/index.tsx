import React from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../../theme/colors'
import { AntDesign } from '@expo/vector-icons'
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast'

export const ErrorToast = (props: ToastProps) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 5,
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.error1,
          width: 10,
          borderRadius: 5,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        }}
      />
      <View
        style={{
          padding: 10
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <AntDesign
            name='closecircle'
            size={15}
            color={COLORS.error2}
          />
          <Text
            style={{
              fontSize: 15,
              marginLeft: 10,
              fontWeight: 'bold',
              color: COLORS.error2
            }}
          >{props.message}</Text>

        </View>

        <View
          style={{
            height: 1,
            backgroundColor: COLORS.error2,
            marginVertical: 10
          }}
        />

        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            color: COLORS.error2
          }}
        >{props.data.description}</Text>
      </View>
    </View>
  )
}

{/* <Text
  style={{
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white
  }}
>{props.message}</Text>
<View
  style={{
    height: 1,
    backgroundColor: COLORS.white,
    marginVertical: 10
  }}
/>
<Text
  style={{
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white
  }}
>{props.data.description}</Text> */}