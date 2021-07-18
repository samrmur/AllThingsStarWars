import React from 'react'
import {StackHeaderProps, StackNavigationOptions} from '@react-navigation/stack'
import {Appbar} from 'react-native-paper'

export function withHeader(
  title: string,
  subtitle?: string
): StackNavigationOptions {
  return {
    header: ({navigation, previous}: StackHeaderProps) => (
      <Appbar.Header accessibilityStates>
        {previous ? (
          <Appbar.BackAction
            onPress={() => navigation.pop()}
            accessibilityStates
          />
        ) : undefined}
        <Appbar.Content title={title} subtitle={subtitle} accessibilityStates />
      </Appbar.Header>
    )
  }
}
