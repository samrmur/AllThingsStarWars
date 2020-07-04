import React, {useMemo} from 'react'
import {View, ViewStyle, StyleProp} from 'react-native'
import SwitchWithLabel from '@components/core/SwitchWithLabel'
import {useTranslation} from 'react-i18next'
import {useTheme} from 'react-native-paper'
import {setDarkTheme} from '../../../src/App'

const SettingsScreen = () => {
  const {t} = useTranslation()
  const theme = useTheme()

  const containerStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      flex: 1,
      padding: 10,
      backgroundColor: theme.colors.background
    }
  }, [theme])

  return (
    <View style={containerStyle}>
      <SwitchWithLabel
        label={t('settings.enableDarkTheme')}
        disabled={false}
        value={theme.dark}
        onValueChange={setDarkTheme}
      />
    </View>
  )
}

export default React.memo(SettingsScreen)
