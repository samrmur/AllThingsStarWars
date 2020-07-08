import React from 'react'
import {View, StyleProp, ViewStyle} from 'react-native'
import {useTheme, Theme, Title, Caption} from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export interface FullScreenErrorProps {
  name: string
  message: string
}

const FullScreenError = ({name, message}: FullScreenErrorProps) => {
  const theme: Theme = useTheme()
  const fullScreenErrorStyle: StyleProp<ViewStyle> = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <View style={fullScreenErrorStyle}>
      <MaterialIcons name="error" color={theme.colors.error} size={36} />
      <Title>{name}</Title>
      <Caption>{message}</Caption>
    </View>
  )
}

export default React.memo(FullScreenError)
