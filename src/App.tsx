/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react'
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper'
import {NavigationContainer} from '@react-navigation/native'
import {ApolloProvider} from '@apollo/react-hooks'
import StarWarsApolloClient from '@services/graphql/StarWarsApolloClient'
import {StatusBar} from 'react-native'
import ApplicationStackNavigator from '@nav/ApplicationStackNavigator'
import {EventEmitter} from 'events'

const barStyle = (dark: boolean) => {
  return dark ? 'dark-content' : 'light-content'
}

const themeEmitter = new EventEmitter()

export const setDarkTheme = (dark: boolean) => {
  themeEmitter.emit('isDark', dark)
}

const App = () => {
  const [dark, setDark] = useState(false)

  const theme = {
    ...DefaultTheme,
    dark: dark
  }

  const barContent = barStyle(theme.dark)

  themeEmitter.on('isDark', (dark: boolean) => {
    setDark(dark)
  })

  // Temporary solution for status bar, background colors needs to be based on theme
  return (
    <ApolloProvider client={StarWarsApolloClient}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar barStyle={barContent} backgroundColor="#3700b3" />
          <ApplicationStackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  )
}

export default App
