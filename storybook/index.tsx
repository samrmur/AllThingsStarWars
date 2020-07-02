import React from 'react'
import {getStorybookUI, configure, addDecorator} from '@storybook/react-native'
import {Provider as PaperProvider} from 'react-native-paper'
import {withKnobs} from '@storybook/addon-knobs'

import './rn-addons'

addDecorator(withKnobs)

configure(() => {
  require('./stories')
}, module)

const StorybookUIRoot = getStorybookUI({asyncStorage: null})

const ThemedStorybook = () => {
  return (
    <PaperProvider>
      <StorybookUIRoot />
    </PaperProvider>
  )
}

export default ThemedStorybook
