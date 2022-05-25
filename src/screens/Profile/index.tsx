import React from 'react'
import * as yup from 'yup'
import { Evento } from '../EventDetails'
import { User } from '@supabase/supabase-js'
import { supabase } from '../../api/supabase'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { dateRegex, timeRegex } from '../../helpers/regex'
import { View, TextInput, Button, Text } from 'react-native'

type InputEvento = Omit<Evento, 'id'>

const schema = yup.object({
  title: yup.string()
    .required('O título é obrigatório'),
  description: yup.string()
    .required('A descrição é obrigatória'),
  data: yup.string()
    .matches(dateRegex, 'A data deve estar no formato DD/MM/AAAA')
    .required('A data é obrigatória'),
  horario: yup.string()
    .matches(timeRegex, 'O horário deve estar no formato HH:MM')
    .required('O horário é obrigatório'),
  modality: yup.string()
    .required('A modality é obrigatória'),
  max_participants: yup.number()
    .required('O número máximo de participantes é obrigatório')
    .min(2, 'O número máximo de participantes deve ser maior que 1')
    .typeError('Apenas dígitos são aceitos neste campo')
})

export const Profile = () => {
  const { control, handleSubmit, reset } = useForm<InputEvento>({
    defaultValues: {
      title: '',
      description: '',
      date: '',
      modality: '',
      max_participants: 0,
      is_event: false,
    },
    resolver: yupResolver(schema)
  })

  const { id: userId } = supabase.auth.user() as User

  const podeCriarEvento = async (): Promise<boolean> => {
    const { data, error } = await supabase.from('user_profile').select('can_create_event').eq('id', userId).limit(1)
    if (data) return data[0].pode_criar_evento

    return false
  }

  const criaNovoEvento = async (evento: InputEvento) => {
    const date = evento.date.split('/').reverse().join('-')

    const { error } = await supabase.from<InputEvento>('event').insert({
      ...evento,
      date,
      created_by: userId
    })

    if (!error) {
      reset()
    } else {
      console.log(error)
    }
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Controller
        control={control}
        name={'title'}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              <TextInput
                placeholder='Título'
                value={value}
                onChangeText={onChange}
              />
              {errors.title && <Text>{errors.title.message}</Text>}
            </>
          )
        }}
      />
      <Controller
        control={control}
        name={'description'}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              <TextInput
                placeholder='Descrição'
                value={value}
                onChangeText={onChange}
              />
              {errors.description && <Text>{errors.description.message}</Text>}
            </>
          )
        }}
      />
      <Controller
        control={control}
        name={'date'}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              <TextInput
                placeholder='Data'
                value={value}
                onChangeText={onChange}
              />
              {errors.date && <Text>{errors.date.message}</Text>}
            </>
          )
        }}
      />
      <Controller
        control={control}
        name={'time'}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              <TextInput
                placeholder='Horário'
                value={value}
                onChangeText={onChange}
              />
              {errors.time && <Text>{errors.time.message}</Text>}
            </>
          )
        }}
      />
      <Controller
        control={control}
        name={'modality'}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              <TextInput
                placeholder='Modalidade'
                value={value}
                onChangeText={onChange}
              />
              {errors.modality && <Text>{errors.modality.message}</Text>}
            </>
          )
        }}
      />
      <Controller
        control={control}
        name={'max_participants'}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              <TextInput
                placeholder='Máximo de participantes'
                value={!value ? '' : String(value)}
                keyboardType={'numeric'}
                onChangeText={onChange}
              />
              {errors.max_participants && <Text>{errors.max_participants.message}</Text>}
            </>
          )
        }}
      />
      <Button
        title='Criar evento'
        onPress={handleSubmit(criaNovoEvento)}
      />
    </View>
  )
}