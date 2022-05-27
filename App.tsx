import React from 'react'
import 'react-native-url-polyfill/auto'
import { Auth } from './src/routes/Auth'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from './src/theme/colors'
import { Container, ErrorToast } from './src/components'
import { ToastProvider } from 'react-native-toast-notifications'


export default function App() {
  return (
    <ToastProvider
      renderType={{
        // TODO: add custom toasts
        custom_danger: (props) => <ErrorToast {...props} />
      }}
    >
      <StatusBar
        style='light'
        backgroundColor={COLORS.primary}
        translucent={false}
      />
      <Container>
        <Auth />
      </Container>
    </ToastProvider>
  )
}