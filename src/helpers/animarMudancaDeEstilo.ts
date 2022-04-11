import { ViewStyle } from "react-native";
import { useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";

type StylesheetProperty = keyof ViewStyle

type AnimationProperties = {
  from: number | string, 
  to: string | number, 
  bool: boolean, 
  property: StylesheetProperty, 
  duration: number, 
  bezierValues: number[]
}

export function animarMudancaDeEstilo({ 
  from, 
  to, 
  bool, 
  property, 
  duration, 
  bezierValues 
}: AnimationProperties) {
  // se estiver ativo, anima o valor de destino para o to, senão, anima o valor para o from 
  const value = bool ? to : from

  return useAnimatedStyle(() => {
    function customAnimation(toValue: string | number) {
      // usa 4 valores de uma função bezier para demarcar a progressão ao longo do tempo
      let [x1, y1, x2, y2, _] = bezierValues

      return (
        withTiming(toValue, {
          duration,
          easing: Easing.bezier(x1, y1, x2, y2)
        })
      );
    }

    return {
      // retorna uma propriedade que irá mudar ao longo do tempo descrito conforme a função bezier
      [`${property}`]: customAnimation(value)
    }
  })
}