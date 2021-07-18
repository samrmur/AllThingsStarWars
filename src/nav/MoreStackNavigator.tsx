import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import SpeciesListScreen from '@screens/species/SpeciesListScreen'
import StarshipListScreen from '@screens/starships/StarshipListScreen'
import PlanetListScreen from '@screens/planets/PlanetListScreen'
import VehicleListScreen from '@screens/vehicles/VehicleListScreen'
import SettingsScreen from '@screens/settings/SettingsScreen'
import {useI18n} from '@shopify/react-i18n'
import {withHeader} from './utilities'
import MoreScreen from '@screens/more/MoreScreen'

const MoreStackNavigator = () => {
  const [i18n] = useI18n()
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={withHeader(i18n.translate('MoreStack.More.title'))}
      />
      <Stack.Screen
        name="SpeciesList"
        component={SpeciesListScreen}
        options={withHeader(
          i18n.translate('MoreStack.Species.title'),
          i18n.translate('MoreStack.Species.subtitle')
        )}
      />
      <Stack.Screen
        name="StarshipList"
        component={StarshipListScreen}
        options={withHeader(
          i18n.translate('MoreStack.Starships.title'),
          i18n.translate('MoreStack.Starships.subtitle')
        )}
      />
      <Stack.Screen
        name="PlanetList"
        component={PlanetListScreen}
        options={withHeader(
          i18n.translate('MoreStack.Planets.title'),
          i18n.translate('MoreStack.Planets.subtitle')
        )}
      />
      <Stack.Screen
        name="VehicleList"
        component={VehicleListScreen}
        options={withHeader(
          i18n.translate('MoreStack.Vehicles.title'),
          i18n.translate('MoreStack.Vehicles.subtitle')
        )}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={withHeader(i18n.translate('MoreStack.Settings.title'))}
      />
    </Stack.Navigator>
  )
}

export default React.memo(MoreStackNavigator)
