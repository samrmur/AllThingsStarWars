import React, {useMemo} from 'react'
import {
  StackNavigationOptions,
  createStackNavigator,
  StackHeaderProps
} from '@react-navigation/stack'
import MainBottomTabNavigator from './MainBottomTabNavigator'
import SpeciesListScreen from '@screens/species/SpeciesListScreen'
import {Appbar} from 'react-native-paper'
import {useTranslation} from 'react-i18next'

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

  const speciesHeader = useMemo(() => {
    return withHeader(t('species.title'), t('species.subtitle'))
  }, [t])

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EntryScreen"
        component={MainBottomTabNavigator}
        options={noHeaderOptions}
      />
      <Stack.Screen
        name="Species"
        component={SpeciesListScreen}
        options={speciesHeader}
      />
    </Stack.Navigator>
  )
}

export default React.memo(ApplicationStackNavigator)
