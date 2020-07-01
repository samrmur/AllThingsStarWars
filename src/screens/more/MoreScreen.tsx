import React from 'react'
import {List} from 'react-native-paper'
import {useTranslation} from 'react-i18next'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {ViewStyle, StyleProp, View} from 'react-native'

interface ListItemLeftProps {
  color: string
  style: {
    marginLeft: number
    marginRight: number
    marginVertical?: number
  }
}

const containerStyle: StyleProp<ViewStyle> = {
  width: 50,
  justifyContent: 'center'
}

const MoreScreen = () => {
  const {t} = useTranslation()

  return (
    <List.Section style={{marginStart: 5, marginEnd: 5}} accessibilityStates>
      <List.Item
        accessibilityStates
        title={t('species.title')}
        left={(props: ListItemLeftProps) => (
          <View style={containerStyle}>
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
        left={props => (
          <View style={containerStyle}>
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
        left={(props: ListItemLeftProps) => (
          <View style={containerStyle}>
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
        left={(props: ListItemLeftProps) => (
          <View style={containerStyle}>
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
        left={(props: ListItemLeftProps) => (
          <View style={containerStyle}>
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
  )
}

export default React.memo(MoreScreen)