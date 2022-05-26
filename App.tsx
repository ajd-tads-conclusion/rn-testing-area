import React from "react";
import 'react-native-url-polyfill/auto'
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from 'react-native-toast-notifications'
import { Auth } from "./src/routes/Auth";
import { Container } from "./src/components/Container";
import { COLORS } from "./src/theme/colors";
import { ErrorToast } from "./src/components/ErrorToast";

export default function App() {
  return (
    <ToastProvider
      renderType={{
        // TODO: add custom toasts
        custom_danger: (props) => <ErrorToast {...props} />
      }}
    >
      <StatusBar
        style="light"
        backgroundColor={COLORS.primary}
        translucent={false}
      />
      <Container>
        <Auth />
      </Container>
    </ToastProvider>
  );
}