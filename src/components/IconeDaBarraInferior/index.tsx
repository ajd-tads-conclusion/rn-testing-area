import React, {
  useEffect,
  useState
} from 'react'
import {
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  GestureResponderEvent
} from 'react-native'
import Animated from 'react-native-reanimated'
import { animarMudancaDeEstilo } from '../../helpers/animarMudancaDeEstilo'
import { PropsIconeBarraInferior } from '../../routes/RotaPrincipal'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../theme/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

type Props = {
  item: PropsIconeBarraInferior,
  onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void,
  accessibilityState?: any
}

export const IconeDaBarraInferior = ({ item, onPress, accessibilityState }: Props) => {
  const focused = accessibilityState.selected
  const [iconeEstaAtivo, setIconeAtivo] = useState<boolean>(false)

  useEffect(() => {
    setIconeAtivo(focused)
  }, [focused])

  const estiloInicial: ViewStyle = {
    width: 30,
    height: 30,
    borderColor: COLORS.white,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

  const posicaoAnimada = animarMudancaDeEstilo({
    from: 0,
    to: -20,
    bool: iconeEstaAtivo,
    duration: 350,
    property: 'marginTop',
    bezierValues: [0.17, 0.67, 0.74, 1.58]
  })

  const bordaAnimada = animarMudancaDeEstilo({
    from: 4,
    to: 10,
    bool: iconeEstaAtivo,
    duration: 350,
    property: 'borderRadius',
    bezierValues: [0.17, 0.67, 0.74, 1.58]
  })

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animated.View style={[estiloInicial, posicaoAnimada, bordaAnimada]}>
        <Ionicons size={13} color={'white'} name={iconeEstaAtivo ? item.iconeAtivo : item.iconeInativo} />
      </Animated.View>
    </TouchableOpacity>
  )
}