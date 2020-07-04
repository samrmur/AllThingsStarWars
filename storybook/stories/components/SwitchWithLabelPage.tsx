import React from 'react'
import {View, Text} from 'react-native'
import SwitchWithLabel, {
  SwitchWithLabelProps
} from '@components/core/SwitchWithLabel'

const SwitchWithLabelPage = ({
  label,
  value,
  disabled,
  onValueChange
}: SwitchWithLabelProps) => {
  return (
    <View>
      <Text style={{marginStart: 10, marginBottom: 10, fontWeight: 'bold'}}>
        Switch With Label
      </Text>
      <SwitchWithLabel
        label={label}
        value={value}
        disabled={disabled}
        style={{marginStart: 10, marginEnd: 10}}
        onValueChange={onValueChange}
      />
    </View>
  )
}

export default SwitchWithLabelPage
