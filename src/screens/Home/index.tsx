import React from 'react'
import { COLORS } from '../../theme/colors'
import { Feather } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'
import type { AuthScreenParams } from '../../routes/Auth'
import { signOutUser } from '../../routes/Auth/supabaseAuth'
import { useToast } from 'react-native-toast-notifications'
import { deleteLocalSession } from '../../helpers/AsyncStorage/asyncStorage'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<AuthScreenParams, 'MainTabs'>

export const Home = ({ navigation }: Props) => {
  const toast = useToast()

  return (
    <View>
      <View>
        <Pressable
          onPress={() => alert('a')}
        >
          <Feather name='menu' color='white' size={7} />
        </Pressable>

        <Pressable
          onPress={() => {
            async function handleSignOut() {
              const error = await signOutUser()
              deleteLocalSession()

              if (error) {
                // toast.show('Tente novamente', {})

                return
              }

              navigation.navigate('SignIn')
            }

            handleSignOut()
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: COLORS.error1
            }}
          />
        </Pressable>

      </View>
    </View>
  )
}