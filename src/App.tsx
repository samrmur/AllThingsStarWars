/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {Provider as PaperProvider, useTheme} from 'react-native-paper'
import {NavigationContainer} from '@react-navigation/native'
import {ApolloProvider} from '@apollo/react-hooks'
import StarWarsApolloClient from '@services/graphql/StarWarsApolloClient'
import {StatusBar} from 'react-native'
import ApplicationStackNavigator from '@nav/ApplicationStackNavigator'

const barStyle = (dark: boolean) => {
  return dark ? 'dark-content' : 'light-content'
}

const App = () => {
  const theme = useTheme()
  const barContent = barStyle(theme.dark)

  // Temporary solution for status bar, background colors needs to be based on theme
  return (
    <ApolloProvider client={StarWarsApolloClient}>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar barStyle={barContent} backgroundColor="#3700b3" />
          <ApplicationStackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  )
}

export default App
