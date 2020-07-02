import React from 'react'
import {View, Text} from 'react-native'
import AppbarNavigationHeader, {
  AppbarNavigationHeaderProps
} from '@components/core/AppbarNavigationHeader'

const AppbarNavigationHeaderPage = ({
  title,
  subtitle
}: AppbarNavigationHeaderProps) => {
  return (
    <View>
      <Text style={{marginStart: 10, marginBottom: 10, fontWeight: 'bold'}}>
        Appbar Header
      </Text>
      <AppbarNavigationHeader title={title} subtitle={subtitle} />
    </View>
  )
}

export default AppbarNavigationHeaderPage
