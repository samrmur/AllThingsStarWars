import React from 'react'
import {
  StackNavigationOptions,
  createStackNavigator,
  StackHeaderProps
} from '@react-navigation/stack'
import MainBottomTabNavigator from './MainBottomTabNavigator'
import SpeciesListScreen from '@screens/species/SpeciesListScreen'
import {Appbar} from 'react-native-paper'
import {useTranslation} from 'react-i18next'
import StarshipListScreen from '@screens/starships/StarshipListScreen'
import PlanetListScreen from '@screens/planets/PlanetListScreen'

const noHeaderOptions = {
  headerShown: false
}

const withHeader: (
  title: string,
  subtitle?: string
) => StackNavigationOptions = (title, subtitle) => {
  return {
    header: ({navigation}: StackHeaderProps) => (
      <Appbar.Header accessibilityStates>
        <Appbar.BackAction
          onPress={() => navigation.pop()}
          accessibilityStates
        />
        <Appbar.Content title={title} subtitle={subtitle} accessibilityStates />
      </Appbar.Header>
    )
  }
}

const ApplicationStackNavigator = () => {
  const {t} = useTranslation()
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EntryScreen"
        component={MainBottomTabNavigator}
        options={noHeaderOptions}
      />
      <Stack.Screen
        name="SpeciesList"
        component={SpeciesListScreen}
        options={withHeader(t('species.title'), t('species.subtitle'))}
      />
      <Stack.Screen
        name="StarshipList"
        component={StarshipListScreen}
        options={withHeader(t('starships.title'), t('starships.subtitle'))}
      />
      <Stack.Screen
        name="PlanetList"
        component={PlanetListScreen}
        options={withHeader(t('planets.title'), t('planets.subtitle'))}
      />
    </Stack.Navigator>
  )
}

export default React.memo(ApplicationStackNavigator)
