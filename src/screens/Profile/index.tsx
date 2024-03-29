import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../../theme/colors'
import { User } from '@supabase/supabase-js'
import { supabase } from '../../api/supabase'

export const Profile = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(supabase.auth.user())
  })

  return (
    <View
      style={{
        flex: 1,
        borderColor: COLORS.error1,
        borderWidth: 1,
      }}
    >
      <View
        style={{
          margin: 10,
          padding: 10,
          borderColor: COLORS.error1,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.white
          }}
        >Olá {user?.id}</Text>
      </View>
    </View>
  )
}