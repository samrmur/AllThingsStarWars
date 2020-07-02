import React, {useMemo} from 'react'
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions
} from '@react-navigation/material-bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {useTheme} from 'react-native-paper'
import FilmListScreen from '@screens/films/FilmListScreen'
import CharacterListScreen from '@screens/characters/CharacterListScreen'
import MoreScreen from '@screens/more/MoreScreen'
import {useTranslation} from 'react-i18next'
import AppbarNavigationHeader from '@components/core/AppbarNavigationHeader'

const MainBottomTabNavigator = () => {
  const {t} = useTranslation()
  const theme = useTheme()
  const Tab = createMaterialBottomTabNavigator()

  const filmsScreenOptions: MaterialBottomTabNavigationOptions = useMemo(() => {
    return {
      tabBarLabel: t('films.title'),
      tabBarIcon: ({color}: {color: string}) => (
        <MaterialIcons name="movie" color={color} size={24} />
      )
    }
  }, [t])

  const charactersScreenOptions: MaterialBottomTabNavigationOptions = useMemo(() => {
    return {
      tabBarLabel: t('characters.title'),
      tabBarIcon: ({color}: {color: string}) => (
        <MaterialIcons name="person" color={color} size={24} />
      )
    }
  }, [t])

  const moreScreenOptions: MaterialBottomTabNavigationOptions = useMemo(() => {
    return {
      tabBarLabel: t('more.title'),
      header: () => <AppbarNavigationHeader title="test" />,
      tabBarIcon: ({color}: {color: string}) => (
        <FontAwesome5 name="list-ul" color={color} size={22} />
      )
    }
  }, [t])

  return (
    <Tab.Navigator barStyle={{backgroundColor: theme.colors.primary}}>
      <Tab.Screen
        name="Films"
        component={FilmListScreen}
        options={filmsScreenOptions}
      />
      <Tab.Screen
        name="Characters"
        component={CharacterListScreen}
        options={charactersScreenOptions}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={moreScreenOptions}
      />
    </Tab.Navigator>
  )
}

export default React.memo(MainBottomTabNavigator)
