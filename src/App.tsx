import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {CustomPaperProvider} from '@services/theme/CustomPaperProvider'
import {ApolloProvider, HttpLink} from '@apollo/client'
import createStarWarsConfiguredClient from './services/graphql/createStarWarsConfiguredClient'
import {networkUrl} from '../app.json'
import {createPaperThemeManager} from './services/theme/manager/PaperThemeManager'
import {darkTheme, lightTheme} from '@services/theme/themes'
import getDeviceLocale from '@services/locale/getDeviceLocale'
import {I18nManager, I18nContext} from '@shopify/react-i18n'
import MainBottomTabNavigator from '@nav/MainBottomTabNavigator'

const themeManager = createPaperThemeManager({
  lightTheme: lightTheme,
  darkTheme: darkTheme
})

const i18nManager = new I18nManager({
  locale: getDeviceLocale().languageCode,
  fallbackLocale: 'en',
  onError(error) {
    throw Error(error.message)
  }
})

const link = new HttpLink({uri: networkUrl})
const client = createStarWarsConfiguredClient(link)

const App = () => {
  return (
    <ApolloProvider client={client}>
      <I18nContext.Provider value={i18nManager}>
        <CustomPaperProvider manager={themeManager}>
          <NavigationContainer>
            <MainBottomTabNavigator />
          </NavigationContainer>
        </CustomPaperProvider>
      </I18nContext.Provider>
    </ApolloProvider>
  )
}

export default App
