import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import FilmListScreen from '@screens/films/FilmListScreen'
import {Appbar} from 'react-native-paper'
import {Route, ParamListBase} from '@react-navigation/native'
import {
  Scene,
  StackNavigationProp,
  StackHeaderProps
} from '@react-navigation/stack/lib/typescript/src/types'
import {useTranslation} from 'react-i18next'

interface FilmStackNavigationHeaderProps {
  previous: Scene<Route<string>> | undefined
  navigation: StackNavigationProp<ParamListBase>
}

const FilmStackNavigationHeader = ({
  previous,
  navigation
}: FilmStackNavigationHeaderProps) => {
  const {t} = useTranslation()

  return (
    <Appbar.Header accessibilityStates>
      {previous ? (
        <Appbar.BackAction
          accessibilityStates
          onPress={() => {
            navigation.pop()
          }}
        />
      ) : null}
      <Appbar.Content
        title={t('films.title')}
        subtitle={t('films.subtitle')}
        accessibilityStates
      />
    </Appbar.Header>
  )
}

const FilmStackNavigationView = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      screenOptions={{
        header: ({previous, navigation}: StackHeaderProps) => (
          <FilmStackNavigationHeader
            previous={previous}
            navigation={navigation}
          />
        )
      }}
    >
      <Stack.Screen name="FilmsList" component={FilmListScreen} />
    </Stack.Navigator>
  )
}

export default FilmStackNavigationView
