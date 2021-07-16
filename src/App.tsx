/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {ApolloProvider} from '@apollo/react-hooks'
import StarWarsApolloClient from '@services/graphql/StarWarsApolloClient'
import ApplicationStackNavigator from '@nav/ApplicationStackNavigator'
import {CustomPaperProvider} from '@services/theme/CustomPaperProvider'
import {lightTheme, darkTheme} from '@services/theme/themes'
import {PaperThemeManager} from '@services/theme/manager/PaperThemeManager'

const manager = new PaperThemeManager(lightTheme, darkTheme)

const App = () => {
  return (
    <ApolloProvider client={StarWarsApolloClient}>
      <CustomPaperProvider manager={manager}>
        <NavigationContainer>
          <ApplicationStackNavigator />
        </NavigationContainer>
      </CustomPaperProvider>
    </ApolloProvider>
  )
}

export default App
