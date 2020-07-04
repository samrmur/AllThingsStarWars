/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useMemo, useEffect} from 'react'
import {
  Provider as PaperProvider,
  DefaultTheme,
  Theme
} from 'react-native-paper'
import {NavigationContainer} from '@react-navigation/native'
import {ApolloProvider} from '@apollo/react-hooks'
import AsyncStorage from '@react-native-community/async-storage'
import StarWarsApolloClient from '@services/graphql/StarWarsApolloClient'
import {StatusBar} from 'react-native'
import ApplicationStackNavigator from '@nav/ApplicationStackNavigator'
import {EventEmitter} from 'events'

const lightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f3f2f5',
    accent: '#268ad1',
    background: '#e9e8ed',
    error: '#ed2224'
  },
  dark: false
}

const darkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#161617',
    accent: '#ffe820',
    surface: '#161617',
    text: '#FFFFFF',
    background: '#252526',
    error: '#ed2224'
  },
  dark: true
}

const darkThemeKey = 'darkThemeSet'
const themeEmitter = new EventEmitter()

export const setDarkTheme = async (dark: boolean) => {
  AsyncStorage.setItem(darkThemeKey, dark.toString())
  themeEmitter.emit('isDark', dark)
}

const isDarkThemeSet = async () => {
  return (await AsyncStorage.getItem(darkThemeKey)) === 'true'
}

const App = () => {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    isDarkThemeSet().then(value => {
      setDark(value)
    })
  }, [])

  const theme = useMemo(() => {
    return dark ? darkTheme : lightTheme
  }, [dark])

  const barContent = useMemo(() => {
    return dark ? 'light-content' : 'dark-content'
  }, [dark])

  themeEmitter.on('isDark', (dark: boolean) => {
    setDark(dark)
  })

  return (
    <ApolloProvider client={StarWarsApolloClient}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar
            barStyle={barContent}
            backgroundColor={theme.colors.background}
          />
          <ApplicationStackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  )
}

export default App
