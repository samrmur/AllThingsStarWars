/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import BottomTabNavigationView from "@nav/BottomTabNavigationView"
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <BottomTabNavigationView />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
