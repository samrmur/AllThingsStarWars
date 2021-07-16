import React from 'react'
import {storiesOf} from '@storybook/react-native'
import {boolean, text} from '@storybook/addon-knobs'
import ListItemCardPage from './components/ListItemCardPage'
import DoubleColumnListViewPage from './components/DoubleColumnListViewPage'
import AppbarNavigationHeaderPage from './components/AppbarNavigationHeaderPage'
import SwitchWithLabelPage from './components/SwitchWithLabelPage'
import FullScreenErrorPage from './components/FullScreenErrorPage'

storiesOf('Components Section', module)
  .add('List Item Cards', () => <ListItemCardPage />)
  .add('Double Column List', () => (
    <DoubleColumnListViewPage
      loading={boolean('loading', false)}
      refreshing={boolean('refreshing', false)}
      loadingMore={boolean('loadingMore', false)}
    />
  ))
  .add('Appbar Header', () => (
    <AppbarNavigationHeaderPage
      title={text('title', 'Characters')}
      subtitle={text('subtitle', 'A bunch of characters!')}
    />
  ))
  .add('Switch With Label', () => (
    <SwitchWithLabelPage
      label={text('label', 'Enable Feature')}
      value={boolean('value', false)}
      disabled={boolean('disabled', false)}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onValueChange={() => {}}
    />
  ))
  .add('Full Screen Error', () => (
    <FullScreenErrorPage
      name={text('name', 'Network error')}
      message={text('message', 'Please turn on your Wi-Fi')}
    />
  ))
