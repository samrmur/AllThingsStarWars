import React, {useMemo} from 'react'
import {View, StyleProp, ViewStyle, TextStyle} from 'react-native'
import {Switch, Text} from 'react-native-paper'

export interface SwitchWithLabelProps {
  label: string
  value: boolean
  disabled: boolean
  style?: StyleProp<ViewStyle>
  onValueChange: (value: boolean) => void
}

const subContainerStyle: StyleProp<ViewStyle> = {
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between'
}

const textStyle: StyleProp<TextStyle> = {
  textAlignVertical: 'center'
}

const SwitchWithLabel = ({
  label,
  value,
  disabled,
  style,
  onValueChange
}: SwitchWithLabelProps) => {
  const containerStyle = useMemo(() => [style, subContainerStyle], [style])

  return (
    <View style={containerStyle}>
      <Text style={textStyle} accessibilityStates>
        {label}
      </Text>
      <Switch
        value={value}
        disabled={disabled}
        onValueChange={onValueChange}
        accessibilityStates
      />
    </View>
  )
}

export default React.memo(SwitchWithLabel)
