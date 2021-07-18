import React, {useCallback, useMemo} from 'react'
import {View, ViewStyle, StyleProp} from 'react-native'
import SwitchWithLabel from '@components/core/SwitchWithLabel'
import {useTheme} from 'react-native-paper'
import {usePaperThemeManager} from '@services/theme/manager/usePaperThemeManager'
import {useI18n} from '@shopify/react-i18n'

const SettingsScreen = () => {
  const [i18n] = useI18n()
  const theme = useTheme()
  const themeManager = usePaperThemeManager()

  const setThemeSettings = useCallback(
    (enabled: boolean) => themeManager.update(enabled),
    [themeManager]
  )

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
        label={i18n.translate('Settings.enableDarkTheme')}
        disabled={false}
        value={theme.dark}
        onValueChange={setThemeSettings}
      />
    </View>
  )
}

export default React.memo(SettingsScreen)
