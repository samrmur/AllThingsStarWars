import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Appbar} from 'react-native-paper'
import {Route, ParamListBase} from '@react-navigation/native'
import {
  Scene,
  StackNavigationProp,
  StackHeaderProps
} from '@react-navigation/stack/lib/typescript/src/types'
import {useTranslation} from 'react-i18next'
import MoreScreen from '@screens/more/MoreScreen'

interface MoreStackNavigationHeaderProps {
  previous: Scene<Route<string>> | undefined
  navigation: StackNavigationProp<ParamListBase>
}

const MoreStackNavigationHeader = ({
  previous,
  navigation
}: MoreStackNavigationHeaderProps) => {
  const {t} = useTranslation()

  return (
    <Appbar.Header accessibilityStates>
      {previous ? (
        <Appbar.BackAction
          accessibilityStates
          onPress={() => {
            navigation.pop()
          }}
        />
      ) : null}
      <Appbar.Content title={t('more.title')} accessibilityStates />
    </Appbar.Header>
  )
}

const MoreStackNavigationView = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      screenOptions={{
        header: ({previous, navigation}: StackHeaderProps) => (
          <MoreStackNavigationHeader
            previous={previous}
            navigation={navigation}
          />
        )
      }}
    >
      <Stack.Screen name="MoreList" component={MoreScreen} />
    </Stack.Navigator>
  )
}

export default MoreStackNavigationView
