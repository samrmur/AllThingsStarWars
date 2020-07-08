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
    backgroundColor: theme.colors.background,
    flex: 1,
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center'
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
