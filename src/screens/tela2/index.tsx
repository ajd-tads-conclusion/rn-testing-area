import React from 'react'
import * as yup from 'yup'
import { Evento } from '../TelaDoEvento'
import { User } from '@supabase/supabase-js'
import { supabase } from '../../api/supabase'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { dateRegex, timeRegex } from '../../helpers/regex'
import { View, TextInput, Button, Text } from 'react-native'

type InputEvento = Omit<Evento, 'id'>

const schema = yup.object({
  titulo: yup.string()
    .required('O título é obrigatório'),
  descricao: yup.string()
    .required('A descrição é obrigatória'),
  data: yup.string()
    .matches(dateRegex, 'A data deve estar no formato DD/MM/AAAA')
    .required('A data é obrigatória'),
  horario: yup.string()
    .matches(timeRegex, 'O horário deve estar no formato HH:MM')
    .required('O horário é obrigatório'),
  modalidade: yup.string()
    .required('A modalidade é obrigatória'),
  max_participantes: yup.number()
    .required('O número máximo de participantes é obrigatório')
    .min(2, 'O número máximo de participantes deve ser maior que 1')
    .typeError('Apenas dígitos são aceitos neste campo')
})

export const Tela2 = () => {
  const { control, handleSubmit, reset } = useForm<InputEvento>({
    defaultValues: {
      titulo: '',
      descricao: '',
      data: '',
      modalidade: '',
      max_participantes: 0,
      is_event: false,
    },
    resolver: yupResolver(schema)
  })

  const { id: userId } = supabase.auth.user() as User

  const podeCriarEvento = async (): Promise<boolean> => {
    const { data, error } = await supabase.from('perfil_usuario').select('pode_criar_evento').eq('id', userId).limit(1)
    if (data) return data[0].pode_criar_evento

    return false
  }

  const criaNovoEvento = async (evento: InputEvento) => {
    const data = evento.data.split('/').reverse().join('-')

    const { error } = await supabase.from<InputEvento>('evento').insert({
      ...evento,
      data,
      criado_por: userId
    })

    if (!error) {
      reset()
    } else {
      console.log(error)
    }
  }

  return (
    <View>
      <Controller
        control={control}
        name={'titulo'}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              <TextInput
                placeholder='Título'
                value={value}
                onChangeText={onChange}
              />
              {errors.titulo && <Text>{errors.titulo.message}</Text>}
            </>
          )
        }}
      />
      <Controller
        control={control}
        name={'descricao'}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              <TextInput
                placeholder='Descrição'
                value={value}
                onChangeText={onChange}
              />
              {errors.descricao && <Text>{errors.descricao.message}</Text>}
            </>
          )
        }}
      />
      <Controller
        control={control}
        name={'data'}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              <TextInput
                placeholder='Data'
                value={value}
                onChangeText={onChange}
              />
              {errors.data && <Text>{errors.data.message}</Text>}
            </>
          )
        }}
      />
      <Controller
        control={control}
        name={'horario'}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              <TextInput
                placeholder='Horário'
                value={value}
                onChangeText={onChange}
              />
              {errors.horario && <Text>{errors.horario.message}</Text>}
            </>
          )
        }}
      />
      <Controller
        control={control}
        name={'modalidade'}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              <TextInput
                placeholder='Modalidade'
                value={value}
                onChangeText={onChange}
              />
              {errors.modalidade && <Text>{errors.modalidade.message}</Text>}
            </>
          )
        }}
      />
      <Controller
        control={control}
        name={'max_participantes'}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              <TextInput
                placeholder='Máximo de participantes'
                value={!value ? '' : String(value)}
                keyboardType={'numeric'}
                onChangeText={onChange}
              />
              {errors.max_participantes && <Text>{errors.max_participantes.message}</Text>}
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