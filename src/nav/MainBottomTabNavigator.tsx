import React from 'react'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {useTheme} from 'react-native-paper'
import FilmsStackNavigator from './FilmsStackNavigator'
import CharactersStackNavigator from './CharactersStackNavigator'
import MoreStackNavigator from './MoreStackNavigator'
import {useI18n} from '@shopify/react-i18n'

const MainBottomTabNavigator = () => {
  const [i18n] = useI18n()
  const theme = useTheme()
  const Tab = createMaterialBottomTabNavigator()

  return (
    <Tab.Navigator barStyle={{backgroundColor: theme.colors.primary}}>
      <Tab.Screen
        name="Films"
        component={FilmsStackNavigator}
        options={{
          tabBarLabel: i18n.translate('FilmsStack.Films.title'),
          tabBarIcon: ({color}: {color: string}) => (
            <MaterialIcons name="movie" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name="Characters"
        component={CharactersStackNavigator}
        options={{
          tabBarLabel: i18n.translate('CharactersStack.Characters.title'),
          tabBarIcon: ({color}: {color: string}) => (
            <MaterialIcons name="person" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreStackNavigator}
        options={{
          tabBarLabel: i18n.translate('MoreStack.More.title'),
          tabBarIcon: ({color}: {color: string}) => (
            <FontAwesome5 name="list-ul" color={color} size={22} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default React.memo(MainBottomTabNavigator)
