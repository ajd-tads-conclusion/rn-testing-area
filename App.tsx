import React from "react";
import 'react-native-url-polyfill/auto'
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import { Auth } from "./src/routes/Auth";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <StatusBar
          style="light"
          backgroundColor="#1e293b"
          translucent={false}
        />
        <Auth />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}