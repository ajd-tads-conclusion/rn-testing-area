import React from 'react'
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Pressable, View } from 'react-native';
import type { TelasDaRotaAuth } from '../../routes/Auth'
import { removeSessaoLocalmente } from '../../helpers/AsyncStorage/asyncStorage';
import { signOutUsuario } from '../../routes/Auth/supabaseAuth';
import { useToast } from 'react-native-toast-notifications'
import { COLORS } from '../../theme/colors';

type Props = NativeStackScreenProps<TelasDaRotaAuth, 'MainTabs'>

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
            (async function () {
              const error = await signOutUsuario()
              removeSessaoLocalmente()

              if (error) {
                // toast.show('Tente novamente', {})

                return
              }

              navigation.navigate('SignIn')
            })()
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: COLORS.debug
            }}
          />
        </Pressable>

      </View>
    </View>
  )
}