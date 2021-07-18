import React from 'react'
import {List, useTheme} from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {ViewStyle, StyleProp, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useI18n} from '@shopify/react-i18n'

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
  const [i18n] = useI18n()
  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <List.Section style={{paddingHorizontal: 5}} accessibilityStates>
        <List.Item
          accessibilityStates
          title={i18n.translate('More.species')}
          onPress={() => navigation.navigate('SpeciesList')}
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
          title={i18n.translate('More.planets')}
          onPress={() => navigation.navigate('PlanetList')}
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
          title={i18n.translate('More.starships')}
          onPress={() => navigation.navigate('StarshipList')}
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
          title={i18n.translate('More.vehicles')}
          onPress={() => navigation.navigate('VehicleList')}
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
          title={i18n.translate('More.settings')}
          onPress={() => navigation.navigate('Settings')}
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
