import React from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import { SignIn } from "./src/screens/SignIn";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
        style="light"
        backgroundColor="#1e293b"
        translucent={false}
      />
      <SignIn />
    </NativeBaseProvider>
  );
}