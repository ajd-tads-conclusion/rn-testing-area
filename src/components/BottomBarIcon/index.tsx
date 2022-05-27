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
import { COLORS } from '../../theme/colors'
import { Ionicons } from '@expo/vector-icons'
import Animated from 'react-native-reanimated'
import { BottomNavIconProps } from '../../routes/Main'
import { animateStyleChange } from '../../helpers/animateStyleChange'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

type Props = {
  item: BottomNavIconProps,
  onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void,
  accessibilityState?: any
}

export const BottomBarIcon = ({ item, onPress, accessibilityState }: Props) => {
  const focused = accessibilityState.selected
  const [isActive, setActiviness] = useState<boolean>(false)

  useEffect(() => {
    setActiviness(focused)
  }, [focused])

  const initialStyle: ViewStyle = {
    width: 30,
    height: 30,
    borderColor: COLORS.white,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

  const animatedPosition = animateStyleChange({
    from: 0,
    to: -20,
    bool: isActive,
    duration: 350,
    property: 'marginTop',
    bezierValues: [0.17, 0.67, 0.74, 1.58]
  })

  const animatedBorder = animateStyleChange({
    from: 4,
    to: 10,
    bool: isActive,
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
      <Animated.View style={[initialStyle, animatedPosition, animatedBorder]}>
        <Ionicons size={13} color={'white'} name={isActive ? item.activeIcon : item.inactiveIcon} />
      </Animated.View>
    </TouchableOpacity>
  )
}