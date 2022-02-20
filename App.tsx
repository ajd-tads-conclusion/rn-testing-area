import React from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import { Home } from "./src/screens/Home";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
        style="light"
        backgroundColor="#1e293b"
        translucent={false}
      />
      <Home />
    </NativeBaseProvider>
  );
}