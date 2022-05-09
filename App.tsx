import React from "react";
import 'react-native-url-polyfill/auto'
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from 'react-native-toast-notifications'

import { Auth } from "./src/routes/Auth";
import { Container } from "./src/components/Container";

export default function App() {
  return (
    <ToastProvider>
      <StatusBar
        style="light"
        backgroundColor="#1e293b"
        translucent={false}
      />
      <Container>
        <Auth />
      </Container>
    </ToastProvider>
  );
}