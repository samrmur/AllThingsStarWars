import React from "react";
import { View, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRoute, RouteProp } from "@react-navigation/native";
import FilmStackNavigationView from "./FilmStackNavigationView";
import { useTheme } from "react-native-paper";
import CharacterStackNavigationView from "./CharacterStackNavigationView";

const UnderConstruction = () => {
  const params = useRoute<RouteProp<Record<string, { name: string }>, string>>()
  const name = `${params.name} under construction`

  return (
    <View style={{ flexGrow: 1, justifyContent: 'center' }}>
      <Text style={{ fontWeight: 'bold', textAlign: "center" }}>{name}</Text>
    </View>
  )
}

const BottomTabNavigationView = () => {
  const theme = useTheme()
  const Tab = createMaterialBottomTabNavigator()

  return (
    <Tab.Navigator barStyle={{ backgroundColor: theme.colors.primary }}>
      <Tab.Screen 
        name="Films" 
        component={FilmStackNavigationView}
        options={{
          tabBarLabel: "Films",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="movie" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen 
        name="Characters" 
        component={CharacterStackNavigationView}
        options={{
          tabBarLabel: "Characters",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen 
        name="Species" 
        component={UnderConstruction} 
        initialParams={{ name: "Species" }}
        options={{
          tabBarLabel: "Species",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="alien" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen 
        name="Starships" 
        component={UnderConstruction}
        initialParams={{ name: "Starships"  }}
        options={{
          tabBarLabel: "Starships",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="space-shuttle" color={color} size={20} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigationView
