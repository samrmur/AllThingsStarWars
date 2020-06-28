import React from 'react'
import {View, Text, StyleProp, TextStyle, ViewStyle} from 'react-native'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {useRoute, RouteProp} from '@react-navigation/native'
import FilmStackNavigationView from './FilmStackNavigationView'
import {useTheme} from 'react-native-paper'
import CharacterStackNavigationView from './CharacterStackNavigationView'

const underConstructionViewStyle: StyleProp<ViewStyle> = {
  flexGrow: 1,
  justifyContent: 'center'
}

const underConstructionTextStyle: StyleProp<TextStyle> = {
  fontWeight: 'bold',
  textAlign: 'center'
}

const UnderConstruction = () => {
  const params = useRoute<RouteProp<Record<string, {name: string}>, string>>()
  const name = `${params.name} under construction`

  return (
    <View style={underConstructionViewStyle}>
      <Text style={underConstructionTextStyle}>{name}</Text>
    </View>
  )
}

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
        name="Species"
        component={UnderConstruction}
        initialParams={{name: 'Species'}}
        options={{
          tabBarLabel: 'Species',
          tabBarIcon: ({color}: {color: string}) => (
            <MaterialCommunityIcons name="alien" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name="Starships"
        component={UnderConstruction}
        initialParams={{name: 'Starships'}}
        options={{
          tabBarLabel: 'Starships',
          tabBarIcon: ({color}: {color: string}) => (
            <FontAwesome name="space-shuttle" color={color} size={20} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigationView
