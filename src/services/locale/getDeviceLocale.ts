import {NativeModules, Platform} from 'react-native'
import {LocaleInfo} from './types'

function getIOSLocale(): string {
  return (
    NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0]
  )
}

function getAndroidLocale(): string {
  return NativeModules.I18nManager.localeIdentifier
}

export default function getDeviceLocale(): LocaleInfo {
  const locale = Platform.OS == 'ios' ? getIOSLocale() : getAndroidLocale()
  const splitLocale = locale.split('_')

  return {
    languageCode: splitLocale[0],
    regionCode: splitLocale[1]
  }
}
