import React, {useMemo} from 'react'
import {List, useTheme} from 'react-native-paper'
import {useTranslation} from 'react-i18next'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {ViewStyle, StyleProp, View} from 'react-native'
import AppbarNavigationHeader from '@components/core/AppbarNavigationHeader'
import {useNavigation} from '@react-navigation/native'

interface ListItemLeftProps {
  color: string
  style: {
    marginLeft: number
    marginRight: number
    marginVertical?: number
  }
}

const iconContainerStyle: StyleProp<ViewStyle> = {
  width: 50,
  justifyContent: 'center'
}

const MoreScreen = () => {
  const {t} = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()

  const containerStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      flex: 1,
      backgroundColor: theme.colors.background
    }
  }, [theme])

  return (
    <View style={containerStyle}>
      <AppbarNavigationHeader title={t('more.title')} />
      <List.Section style={{marginStart: 5, marginEnd: 5}} accessibilityStates>
        <List.Item
          accessibilityStates
          title={t('species.title')}
          onPress={() => {
            navigation.navigate('SpeciesList')
          }}
          left={(props: ListItemLeftProps) => (
            <View style={iconContainerStyle}>
              <MaterialCommunityIcons
                name="alien"
                size={24}
                color={props.color}
                style={props.style}
              />
            </View>
          )}
        />
        <List.Item
          accessibilityStates
          title={t('planets.title')}
          onPress={() => {
            navigation.navigate('PlanetList')
          }}
          left={props => (
            <View style={iconContainerStyle}>
              <Ionicons
                name="md-planet"
                size={24}
                color={props.color}
                style={props.style}
              />
            </View>
          )}
        />
        <List.Item
          accessibilityStates
          title={t('starships.title')}
          onPress={() => {
            navigation.navigate('StarshipList')
          }}
          left={(props: ListItemLeftProps) => (
            <View style={iconContainerStyle}>
              <FontAwesome5
                name="space-shuttle"
                size={24}
                color={props.color}
                style={props.style}
              />
            </View>
          )}
        />
        <List.Item
          accessibilityStates
          title={t('vehicles.title')}
          onPress={() => {
            navigation.navigate('VehicleList')
          }}
          left={(props: ListItemLeftProps) => (
            <View style={iconContainerStyle}>
              <FontAwesome5
                name="car"
                size={24}
                color={props.color}
                style={props.style}
              />
            </View>
          )}
        />
        <List.Item
          accessibilityStates
          title={t('settings.title')}
          onPress={() => {
            navigation.navigate('Settings')
          }}
          left={(props: ListItemLeftProps) => (
            <View style={iconContainerStyle}>
              <Ionicons
                name="md-settings"
                size={24}
                color={props.color}
                style={props.style}
              />
            </View>
          )}
        />
      </List.Section>
    </View>
  )
}

export default React.memo(MoreScreen)
