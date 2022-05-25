import React from 'react'
import { TextInput as TI } from 'react-native'
import { COLORS } from '../theme/colors'
import { ErrorLabel } from './ErrorLabel'

type Props = {
  value: string,
  onChange: (text: string) => void,
  errors?: {
    message?: string
  }
}

export const TextInput = ({ value, onChange, errors: field }: Props) => {
  return (
    <>
      <TI
        placeholder='E-mail'
        value={value}
        onChangeText={onChange}
        placeholderTextColor={COLORS.white + '9C'}
        style={{
          backgroundColor: COLORS.tertiary,
          borderColor: field && COLORS.error,
          borderWidth: field && 1,
          borderRadius: 5,
          marginBottom: 10,
          padding: 10,
          color: field ? COLORS.error : COLORS.white,
          fontWeight: 'bold'
        }}
      />
      {
        field && <ErrorLabel campo={field} />
      }
    </>
  )
}