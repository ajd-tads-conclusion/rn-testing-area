import React from 'react'
import { TextInput } from 'react-native'

export const BarraDePesquisa = () => {
  return (
    <TextInput
      nativeID='search'
      placeholderTextColor='gray.400'
      placeholder='Pesquisar eventos, pessoas, organizações'
      style={{
        flex: 1,
      }}
    />
  )
}