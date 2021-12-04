import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MainTabs } from './src/routes/Main';

export default function App() {
  return (
    <MainTabs/>
  );
}