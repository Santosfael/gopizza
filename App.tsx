import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';

import { AuthProvide } from '@hooks/auth';
import { Order } from '@screens/Order';
import { Routes } from './src/routes';
import theme from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  });

  if (!fontsLoaded)
    return <AppLoading />

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style='light' translucent backgroundColor='transparent' />
        <AuthProvide>
          <Order />
        </AuthProvide>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}