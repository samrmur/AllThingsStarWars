import {Appearance} from 'react-native'
import {Theme} from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'

const DARK_THEME_KEY = 'SHOULD_USE_STAR_WARS_DARK_THEME'

export type PaperThemeObserver = (theme: Theme) => void

export class PaperThemeManager {
  private shouldUseDarkTheme: boolean
  private observers: PaperThemeObserver[]

  constructor(
    private readonly lightTheme: Theme,
    private readonly darkTheme: Theme
  ) {
    this.shouldUseDarkTheme = Appearance.getColorScheme() === 'dark'
    this.observers = []

    AsyncStorage.getItem(DARK_THEME_KEY).then(value => {
      if (value) {
        this.updateAndNotify(value === 'true')
      }
    })
  }

  current(): Theme {
    return this.shouldUseDarkTheme ? this.darkTheme : this.lightTheme
  }

  update(shouldUseDarkTheme: boolean) {
    this.updateAndNotify(shouldUseDarkTheme)
  }

  observe(observer: PaperThemeObserver): () => void {
    this.observers.push(observer)
    observer(this.current())

    return () => {
      const position = this.observers.indexOf(observer)
      this.observers.splice(position, 1)
    }
  }

  private updateAndNotify(shouldUseDarkTheme: boolean) {
    this.shouldUseDarkTheme = shouldUseDarkTheme
    AsyncStorage.setItem(DARK_THEME_KEY, shouldUseDarkTheme ? 'true' : 'false')
    this.observers.forEach(observer => observer(this.current()))
  }
}

export function createPaperThemeManager({
  lightTheme,
  darkTheme
}: {
  lightTheme: Theme
  darkTheme: Theme
}) {
  return new PaperThemeManager(lightTheme, darkTheme)
}
