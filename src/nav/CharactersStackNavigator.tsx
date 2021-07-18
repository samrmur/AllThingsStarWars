import {createStackNavigator} from '@react-navigation/stack'
import {useI18n} from '@shopify/react-i18n'
import React from 'react'
import {withHeader} from './utilities'
import CharacterListScreen from '@screens/characters/CharacterListScreen'

const CharactersStackNavigator = () => {
  const [i18n] = useI18n()
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CharacterList"
        component={CharacterListScreen}
        options={withHeader(
          i18n.translate('CharactersStack.Characters.title'),
          i18n.translate('CharactersStack.Characters.subtitle')
        )}
      />
    </Stack.Navigator>
  )
}

export default React.memo(CharactersStackNavigator)
