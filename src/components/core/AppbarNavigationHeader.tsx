import React from 'react'
import {Appbar} from 'react-native-paper'

export interface AppbarNavigationHeaderProps {
  title: string
  subtitle?: string
}

const AppbarNavigationHeader = ({
  title,
  subtitle
}: AppbarNavigationHeaderProps) => {
  return (
    <Appbar.Header accessibilityStates>
      <Appbar.Content title={title} subtitle={subtitle} accessibilityStates />
    </Appbar.Header>
  )
}

export default React.memo(AppbarNavigationHeader)
