import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import MainBottomTabNavigator from './MainBottomTabNavigator'

const noHeaderOptions = {
  headerShown: false
}

const ApplicationStackNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EntryScreen"
        component={MainBottomTabNavigator}
        options={noHeaderOptions}
      />
    </Stack.Navigator>
  )
}

export default React.memo(ApplicationStackNavigator)
