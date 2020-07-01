import React from 'react'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FilmStackNavigationView from './FilmStackNavigationView'
import {useTheme} from 'react-native-paper'
import CharacterStackNavigationView from './CharacterStackNavigationView'
import MoreStackNavigationView from './MoreStackNavigationView'

const BottomTabNavigationView = () => {
  const theme = useTheme()
  const Tab = createMaterialBottomTabNavigator()

  return (
    <Tab.Navigator barStyle={{backgroundColor: theme.colors.primary}}>
      <Tab.Screen
        name="Films"
        component={FilmStackNavigationView}
        options={{
          tabBarLabel: 'Films',
          tabBarIcon: ({color}: {color: string}) => (
            <MaterialIcons name="movie" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name="Characters"
        component={CharacterStackNavigationView}
        options={{
          tabBarLabel: 'Characters',
          tabBarIcon: ({color}: {color: string}) => (
            <MaterialIcons name="person" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreStackNavigationView}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({color}: {color: string}) => (
            <FontAwesome5 name="list-ul" color={color} size={22} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigationView
