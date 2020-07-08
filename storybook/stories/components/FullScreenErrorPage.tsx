import React from 'react'
import {View, Text} from 'react-native'
import FullScreenError, {
  FullScreenErrorProps
} from '@components/core/FullScreenError'

const FullScreenErrorPage = ({name, message}: FullScreenErrorProps) => {
  return (
    <View>
      <Text style={{marginStart: 10, marginBottom: 10, fontWeight: 'bold'}}>
        Full Screen Error
      </Text>
      <FullScreenError name={name} message={message} />
    </View>
  )
}

export default FullScreenErrorPage
