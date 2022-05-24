import React, { useEffect, useRef, useState } from 'react';
import {
  Center,
  FormControl,
  Input,
  Button,
  Stack,
  Text,
  useToast,
  FlatList,
  IconButton,
  Icon,
} from 'native-base';
import { View, SafeAreaView } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { AuthResponse, criarUsuario } from '../../routes/Auth/supabaseAuth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { TelasDaRotaAuth } from '../../routes/Auth';
import Wizard from "react-native-wizard";
import { COLORS } from '../../theme/colors';

type Props = NativeStackScreenProps<TelasDaRotaAuth, 'SignUpFinish'>

export const SignUpFinish = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [cpf, setCPF] = useState<string>('')
  const [date, setDateNasc] = useState<string>('')
  const [altura, setAltura] = useState<string>('')
  const [peso, setPeso] = useState<string>('')
  const [logradouro, setLogradouro] = useState<string>('')
  const [nCasa, setnCasa] = useState<string>('')
  const [bairro, setBairro] = useState<string>('')
  const [cidade, setCidade] = useState<string>('')
  const [estado, setEstado] = useState<string>('')
  const [complemento, setComplemento] = useState<string>('')
  const [cep, setCEP] = useState<string>('')
  const [fone, setFone] = useState<string>('')
  const [respostaDoSupabase, setRespostaDoSupabase] = useState<AuthResponse>({ user: null, error: null })
  const toast = useToast()
  const wizard = useRef()
  const [_isFirstStep, setIsFirstStep] = useState(true)
  const [_isLastStep, setIsLastStep] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  function AppDrawer() {
    const icons = require('../../../sports.json');
    return <FlatList numColumns={3} m={"15px"} data={icons} renderItem={({
      item
    }) => {
      return <Center width={'35%'} marginBottom={'5px'} marginTop={'10px'}>
        <IconButton borderRadius="full" bg={item.bg} variant="solid" p="3" icon={<Icon color="white" name={item.name} as={MaterialIcons} size="24" />} _icon={{

          size: "md"
        }} _hover={{
          bg: "orange.600:alpha.20"
        }} _pressed={{
          bg: "blue.600:alpha.20"
        }} />
        <Text textAlign={'center'} width={'100%'} color={'#fff'}>{item.tag}</Text>
      </Center>;
    }} />
  }
  function Example() {
    return <AppDrawer />
  }
  const stepList = [
    {
      content:
        <Center
          flex={1}
        >
          <Text
            color={'white'}
            fontSize='2em'
          > {currentStep + 1}. Autenticação</Text>
          <FormControl
            p='3'
            w={{
              base: '100%',
              sm: 400
            }}>
            <Stack space='3'>
              <FormControl.Label _text={{
                color: 'white',
                fontSize: 'xl'
              }}>
                E-mail
              </FormControl.Label>
              <Input
                nativeID='email'
                placeholderTextColor='gray.400'
                placeholder='Insira o seu e-mail'
                color='white'
                type='e-mail'
                _hover={{
                  color: 'black'
                }}
                value={email}
                onChangeText={t => setEmail(t)}
              />
              <FormControl.Label _text={{
                color: 'white',
                fontSize: 'xl'
              }}
                flex={'1'}
              >
                Senha
              </FormControl.Label>
              <Input
                flex={'1'}
                nativeID='pass'
                placeholderTextColor='gray.400'
                placeholder='Insira sua senha'
                color='white'
                type='password'
                _hover={{
                  color: 'black'
                }}
                value={password}
                onChangeText={t => setPassword(t)}
              />
              <Button
                onPress={() => wizard.current.next()}
                flex={'1'}
              >
                Próximo
              </Button>
            </Stack>
          </FormControl>
        </Center>,
    },
    {
      content:
        <Center
          flex={1}
        >
          <Text
            color={'white'}
            fontSize='2em'
          > {currentStep + 1}. Dados Pessoais</Text>
          <FormControl
            p='3'
            w={{
              base: '100%',
              sm: 400
            }}>
            <Stack space='3'>

              <FormControl.Label _text={{
                color: 'white',
                fontSize: 'xl'
              }}>
                Nome Completo
              </FormControl.Label>
              <Input
                nativeID='name'
                placeholderTextColor='gray.400'
                placeholder='Insira o seu nome completo'
                color='white'
                type='text'
                _hover={{
                  color: 'black'
                }}
                value={name}
                onChangeText={t => setName(t)}
              />
              <FormControl.Label _text={{
                color: 'white',
                fontSize: 'xl'
              }}>
                CPF
              </FormControl.Label>
              <Input
                nativeID='cpf'
                placeholderTextColor='gray.400'
                placeholder='Insira seu CPF'
                color='white'
                type='numeric'
                _hover={{
                  color: 'black'
                }}
                value={cpf}
                onChangeText={t => setCPF(t)}
              />
              <FormControl.Label _text={{
                color: 'white',
                fontSize: 'xl'
              }}>
                Data de Nascimento
              </FormControl.Label>
              <Input
                nativeID='dateNasc'
                placeholderTextColor='gray.400'
                placeholder='Insira sua data de nascimento'
                color='white'
                type='date'
                _hover={{
                  color: 'black'
                }}
                value={date}
                onChangeText={t => setDateNasc(t)}
              />

              <Stack
                direction={'row'}
                flex={'1'}
                justifyContent={"space-between"}
                space={'10%'}
                marginTop={'15px'}
              >
                <FormControl.Label _text={{
                  color: 'white',
                  fontSize: 'xl'
                }}
                  marginRight={'0'}
                  width={'45%'}
                >
                  Altura
                </FormControl.Label>
                <FormControl.Label _text={{
                  color: 'white',
                  fontSize: 'xl'
                }}
                  marginRight={'0'}
                  width={'45%'}
                >
                  Peso
                </FormControl.Label>
              </Stack>
              <Stack
                direction={'row'}
                flex={'1'}
                justifyContent={"space-around"}
                space={'10%'}
              >
                <Input
                  width={'45%'}
                  nativeID='altura'
                  placeholderTextColor='gray.400'
                  placeholder='Insira sua altura'
                  color='white'
                  type='numeric'
                  _hover={{
                    color: 'black'
                  }}
                  value={altura}
                  onChangeText={t => setAltura(t)}
                />
                <Input
                  width={'45%'}
                  nativeID='peso'
                  placeholderTextColor='gray.400'
                  placeholder='Insira seu peso'
                  color='white'
                  type='numeric'
                  _hover={{
                    color: 'black'
                  }}
                  value={peso}
                  onChangeText={t => setPeso(t)}
                />
              </Stack>
              <Stack
                direction={'row'}
                flex={'1'}
                justifyContent={"space-between"}
                space={'20px'}
                marginTop={'20px'}
              >
                <Button
                  onPress={() => wizard.current.prev()}
                  flex={'1'}
                >
                  Anterior
                </Button>
                <Button
                  onPress={() => wizard.current.next()}
                  flex={'1'}
                >
                  Próximo
                </Button>
              </Stack>
            </Stack>
          </FormControl>
        </Center>,
    },
    {
      content:
        <Center
          flex={1}
        >
          <Text
            color={'white'}
            fontSize='2em'
          > {currentStep}. Dados Pessoais</Text>
          <FormControl
            p='3'
            w={{
              base: '100%',
              sm: 400
            }}>
            <Stack space='3'>
              <FormControl.Label _text={{
                color: 'white',
                fontSize: 'xl'
              }}>
                Logradouro
              </FormControl.Label>
              <Input
                nativeID='logradouro'
                placeholderTextColor='gray.400'
                placeholder='Insira o logradouro'
                color='white'
                type='text'
                _hover={{
                  color: 'black'
                }}
                value={logradouro}
                onChangeText={t => setLogradouro(t)}
              />
              <Stack
                direction={'row'}
                flex={'1'}
                justifyContent={"space-between"}
                space={'10%'}
                marginTop={'15px'}
              >
                <FormControl.Label _text={{
                  color: 'white',
                  fontSize: 'xl'
                }}
                  marginRight={'0'}
                  width={'20%'}
                >
                  Nº
                </FormControl.Label>
                <FormControl.Label _text={{
                  color: 'white',
                  fontSize: 'xl'
                }}
                  marginRight={'0'}
                  width={'70%'}
                >
                  Bairro
                </FormControl.Label>

              </Stack>
              <Stack
                direction={'row'}
                flex={'1'}
                justifyContent={"space-between"}
                space={'10%'}
              >
                <Input
                  width={'20%'}
                  nativeID='nCasa'
                  placeholderTextColor='gray.400'
                  placeholder='Insira o número da casa'
                  color='white'
                  type='numeric'
                  _hover={{
                    color: 'black'
                  }}
                  value={nCasa}
                  onChangeText={t => setnCasa(t)}
                />
                <Input
                  width={'70%'}
                  nativeID='bairro'
                  placeholderTextColor='gray.400'
                  placeholder='Insira o bairro'
                  color='white'
                  type='numeric'
                  _hover={{
                    color: 'black'
                  }}
                  value={bairro}
                  onChangeText={t => setBairro(t)}
                />
              </Stack>
              <Stack
                direction={'row'}
                flex={'1'}
                justifyContent={"space-between"}
                space={'10%'}
                marginTop={'15px'}
              >
                <FormControl.Label _text={{
                  color: 'white',
                  fontSize: 'xl'
                }}
                  marginRight={'0'}
                  width={'45%'}
                >
                  Cidade
                </FormControl.Label>
                <FormControl.Label _text={{
                  color: 'white',
                  fontSize: 'xl'
                }}
                  marginRight={'0'}
                  width={'45%'}
                >
                  Estado
                </FormControl.Label>
              </Stack>
              <Stack
                direction={'row'}
                flex={'1'}
                justifyContent={"space-between"}
                space={'10%'}
              >
                <Input
                  width={'45%'}
                  nativeID='cidade'
                  placeholderTextColor='gray.400'
                  placeholder='Insira a cidade'
                  color='white'
                  type='numeric'
                  _hover={{
                    color: 'black'
                  }}
                  value={cidade}
                  onChangeText={t => setCidade(t)}
                />
                <Input
                  width={'45%'}
                  nativeID='estado'
                  placeholderTextColor='gray.400'
                  placeholder='Insira o estado'
                  color='white'
                  type='numeric'
                  _hover={{
                    color: 'black'
                  }}
                  value={estado}
                  onChangeText={t => setEstado(t)}
                />
              </Stack>
              <FormControl.Label _text={{
                color: 'white',
                fontSize: 'xl'
              }}>
                Complemento
              </FormControl.Label>
              <Input
                nativeID='complemento'
                placeholderTextColor='gray.400'
                placeholder='Insira complemento. Ex.: Casa, Apt...'
                color='white'
                type='text'
                _hover={{
                  color: 'black'
                }}
                value={complemento}
                onChangeText={t => setComplemento(t)}
              />
              <FormControl.Label _text={{
                color: 'white',
                fontSize: 'xl'
              }}>
                CEP
              </FormControl.Label>
              <Input
                nativeID='cep'
                placeholderTextColor='gray.400'
                placeholder='Insira o CEP'
                color='white'
                type='cep'
                _hover={{
                  color: 'black'
                }}
                value={cep}
                onChangeText={t => setCEP(t)}
              />
              <FormControl.Label _text={{
                color: 'white',
                fontSize: 'xl'
              }}>
                Celular
              </FormControl.Label>
              <Input
                nativeID='fone'
                placeholderTextColor='gray.400'
                placeholder='Insira o seu número de celular'
                color='white'
                type='fone'
                _hover={{
                  color: 'black'
                }}
                value={fone}
                onChangeText={t => setFone(t)}
              />
              <Stack
                direction={'row'}
                flex={'1'}
                justifyContent={"space-between"}
                space={'20px'}
              >
                <Button
                  onPress={() => wizard.current.prev()}
                  flex={'1'}
                >
                  Anterior
                </Button>
                <Button
                  onPress={() => wizard.current.next()}
                  flex={'1'}
                >
                  Próximo
                </Button>
              </Stack>
            </Stack>
          </FormControl>
        </Center>,
    },
    {
      content:
        <Center
          flex={1}
          minWidth={'100%'}
        >
          <Text
            color={'white'}
            fontSize='2em'
          > {currentStep}. Preferências</Text>

          <FormControl
            p='3'
            w={{
              base: '100%',
              sm: 400,
            }}>
            <Stack
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              flexDirection={'row'}
              flex={1}
              minWidth={'100%'}
            >
            </Stack>
            <Example />
            <Stack
              direction={'row'}
              justifyContent={"space-between"}
              space={'20px'}
            >
              <Button
                onPress={() => wizard.current.prev()}
                flex={'1'}
              >
                Anterior
              </Button>

              <Button
                onPress={async () => {
                  const res = await criarUsuario(email, password)
                  setRespostaDoSupabase(res)
                }}
                flex={'1'}
              >
                Cadastrar-se
              </Button>
            </Stack>
          </FormControl>
        </Center>,
    },
  ]

  useEffect(() => {
    if (respostaDoSupabase.user !== null) {
      toast.show({
        status: 'success',
        title: 'Confirme o e-mail',
        description: 'Clique no link que enviamos ao seu e-mail'
      })
      navigation.navigate('SignIn')
      return
    }

    if (respostaDoSupabase.error?.status === 429) {
      toast.show({
        status: 'error',
        title: 'Tente novamente mais tarde'
      })

      return
    }

    if (respostaDoSupabase.error !== null) {
      toast.show({
        status: 'error',
        title: 'Credenciais inválidas',
        description: 'Verifique os campos e tente novamente'
      })

      return
    }
  }, [respostaDoSupabase])

  return (
    <Center
      flex={1}
      bg='blueGray.800'
      minHeight={'initial'}
      minWidth={'100%'}
    >
      <SafeAreaView style={{ backgroundColor: COLORS.white }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: COLORS.white,
            // borderBottomColor: "#dedede",
            borderBottomWidth: 1,
          }}>
        </View>
      </SafeAreaView>
      <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Wizard
          ref={wizard}
          steps={stepList}
          isFirstStep={val => setIsFirstStep(val)}
          isLastStep={val => setIsLastStep(val)}
          currentStep={({ currentStep }) => {
            setCurrentStep(currentStep)
          }}
        />
        <View style={{ flexDirection: "row", margin: 18, }}>
          {stepList.map((_val, index) => (
            <View
              key={"step-indicator-" + index}
              style={{
                width: 10,
                marginHorizontal: 6,
                height: 10,
                borderRadius: 5,
                backgroundColor: index === currentStep ? COLORS.white : COLORS.black,
              }}
            />
          ))}
        </View>
      </View>
      <Stack direction='row' alignItems='center' alignSelf='center'
        marginBottom={'20px'}>
        <Text color={'white'}>
          Já possui uma conta?
        </Text>
        <Button
          variant='link'
          onPress={() => navigation.navigate('SignIn')}
        >
          Faça login
        </Button>
      </Stack>
    </Center>
  )
}