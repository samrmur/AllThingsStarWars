import {createStackNavigator} from '@react-navigation/stack'
import {useI18n} from '@shopify/react-i18n'
import React from 'react'
import {withHeader} from './utilities'
import FilmListScreen from '@screens/films/FilmListScreen'

const FilmsStackNavigator = () => {
  const [i18n] = useI18n()
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FilmList"
        component={FilmListScreen}
        options={withHeader(
          i18n.translate('FilmsStack.Films.title'),
          i18n.translate('FilmsStack.Films.subtitle')
        )}
      />
    </Stack.Navigator>
  )
}

export default React.memo(FilmsStackNavigator)
