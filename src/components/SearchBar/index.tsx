import React from 'react'
import { TextInput } from 'react-native'
import { COLORS } from '../../theme/colors'

export const SearchBar = () => {
  return (
    <TextInput
      nativeID='search'
      placeholderTextColor={COLORS.secondary}
      placeholder='Pesquisar eventos, pessoas, organizações'
      style={{
        flex: 1,
        color: COLORS.white
      }}
    />
  )
}