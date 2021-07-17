/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import ApplicationStackNavigator from '@nav/ApplicationStackNavigator'
import {CustomPaperProvider} from '@services/theme/CustomPaperProvider'
import {ApolloProvider, HttpLink} from '@apollo/client'
import createStarWarsConfiguredClient from './services/graphql/createStarWarsConfiguredClient'
import {networkUrl} from '../app.json'
import {createPaperThemeManager} from './services/theme/manager/PaperThemeManager'
import {darkTheme, lightTheme} from '@services/theme/themes'

const manager = createPaperThemeManager({
  lightTheme: lightTheme,
  darkTheme: darkTheme
})

const client = createStarWarsConfiguredClient(new HttpLink({uri: networkUrl}))

const App = () => {
  return (
    <ApolloProvider client={client}>
      <CustomPaperProvider manager={manager}>
        <NavigationContainer>
          <ApplicationStackNavigator />
        </NavigationContainer>
      </CustomPaperProvider>
    </ApolloProvider>
  )
}

export default App
