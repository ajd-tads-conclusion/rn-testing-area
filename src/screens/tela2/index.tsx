import React from 'react'
import * as yup from 'yup'
import { Evento } from '../TelaDoEvento'
import { User } from '@supabase/supabase-js'
import { supabase } from '../../api/supabase'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { Text, Stack, Input, Button, Radio } from 'native-base'
import { dateRegex, timeRegex } from '../../helpers/regex'

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
    .typeError('Apenas dígitos são aceitos neste campo'),
  is_event: yup.boolean().required('A opção de encontro é obrigatória'),
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
    <Stack
      bg='blueGray.800'
      flex='1'
      alignItems='center'
    >
      <Controller
        control={control}
        name={'titulo'}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              <Input
                placeholder='Título'
                bgColor={errors.titulo ? 'danger.300' : 'white'}
                color={errors.titulo ? 'white' : 'black'}
                value={value}
                onChangeText={onChange}
              />
              {errors.titulo && <Text color={'danger.500'}>{errors.titulo.message}</Text>}
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
              <Input
                placeholder='Descrição'
                bgColor={errors.descricao ? 'danger.300' : 'white'}
                color={errors.descricao ? 'white' : 'black'}
                value={value}
                onChangeText={onChange}
              />
              {errors.descricao && <Text color={'danger.500'}>{errors.descricao.message}</Text>}
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
              <Input
                placeholder='Data'
                bgColor={errors.data ? 'danger.300' : 'white'}
                color={errors.data ? 'white' : 'black'}
                value={value}
                onChangeText={onChange}
              />
              {errors.data && <Text color={'danger.500'}>{errors.data.message}</Text>}
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
              <Input
                placeholder='Horário'
                bgColor={errors.horario ? 'danger.300' : 'white'}
                color={errors.horario ? 'white' : 'black'}
                value={value}
                onChangeText={onChange}
              />
              {errors.horario && <Text color={'danger.500'}>{errors.horario.message}</Text>}
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
              <Input
                placeholder='Modalidade'
                bgColor={errors.modalidade ? 'danger.300' : 'white'}
                color={errors.modalidade ? 'white' : 'black'}
                value={value}
                onChangeText={onChange}
              />
              {errors.modalidade && <Text color={'danger.500'}>{errors.modalidade.message}</Text>}
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
              <Input
                placeholder='Máximo de participantes'
                bgColor={errors.max_participantes ? 'danger.300' : 'white'}
                color={errors.max_participantes ? 'white' : 'black'}
                value={!value ? '' : String(value)}
                keyboardType={'numeric'}
                onChangeText={onChange}
              />
              {errors.max_participantes && <Text color={'danger.500'}>{errors.max_participantes.message}</Text>}
            </>
          )
        }}
      />

      <Controller
        control={control}
        name={'is_event'}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              <Radio.Group
                name='eEncontro'
                value={String(value)}
                onChange={onChange}
              // isDisabled={false}
              >
                <Radio value={'true'} >
                  Sim
                </Radio>
                <Radio value={'false'}>
                  Não
                </Radio>
              </Radio.Group>
              {errors.is_event && <Text color={'danger.500'}>{errors.is_event.message}</Text>}
            </>
          )
        }}
      />

      <Button
        variant={'solid'}
        onPress={handleSubmit(criaNovoEvento)}
      >
        Criar evento
      </Button>
    </Stack>
  )
}