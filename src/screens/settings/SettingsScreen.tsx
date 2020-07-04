import React, {useMemo} from 'react'
import {View, ViewStyle, StyleProp} from 'react-native'
import SwitchWithLabel from '@components/core/SwitchWithLabel'
import {useTranslation} from 'react-i18next'
import {useTheme} from 'react-native-paper'
import {setDarkTheme} from '../../../src/App'

const containerStyle: StyleProp<ViewStyle> = {
  margin: 10
}

const SettingsScreen = () => {
  const {t} = useTranslation()
  const {dark} = useTheme()
  const darkThemeText = useMemo(() => t('settings.enableDarkTheme'), [t])

  return (
    <View style={containerStyle}>
      <SwitchWithLabel
        label={darkThemeText}
        disabled={false}
        value={dark}
        onValueChange={setDarkTheme}
      />
    </View>
  )
}

export default React.memo(SettingsScreen)
