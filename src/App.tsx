/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {Provider as PaperProvider} from 'react-native-paper'
import BottomTabNavigationView from '@nav/BottomTabNavigationView'
import {NavigationContainer} from '@react-navigation/native'
import {ApolloProvider} from '@apollo/react-hooks'
import StarWarsApolloClient from '@services/graphql/StarWarsApolloClient'

const App = () => {
  return (
    <ApolloProvider client={StarWarsApolloClient}>
      <PaperProvider>
        <NavigationContainer>
          <BottomTabNavigationView />
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  )
}

export default App
