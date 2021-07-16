import React, {useCallback, useMemo} from 'react'
import {View, ViewStyle, StyleProp} from 'react-native'
import SwitchWithLabel from '@components/core/SwitchWithLabel'
import {useTranslation} from 'react-i18next'
import {useTheme} from 'react-native-paper'
import {usePaperThemeManager} from '@services/theme/manager/usePaperThemeManager'

const SettingsScreen = () => {
  const {t} = useTranslation()
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
        label={t('settings.enableDarkTheme')}
        disabled={false}
        value={theme.dark}
        onValueChange={setThemeSettings}
      />
    </View>
  )
}

export default React.memo(SettingsScreen)
