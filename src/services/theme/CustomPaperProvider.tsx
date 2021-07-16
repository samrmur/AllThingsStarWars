import React, {useEffect, useState} from 'react'
import {StatusBar} from 'react-native'
import {Provider as PaperProvider} from 'react-native-paper'
import {PaperThemeManager} from './manager/PaperThemeManager'
import {PaperThemeManagerContext} from './manager/PaperThemeManagerContext'

export interface CustomPaperProviderProps {
  manager: PaperThemeManager
  children?: React.ReactNode
}

export const CustomPaperProvider = ({
  manager,
  children
}: CustomPaperProviderProps) => {
  const [theme, setTheme] = useState(manager.current())

  useEffect(() => {
    return manager.observe(theme => {
      setTheme(theme)
    })
  })

  return (
    <PaperThemeManagerContext.Provider value={manager}>
      <PaperProvider theme={theme}>
        <StatusBar
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        {children}
      </PaperProvider>
    </PaperThemeManagerContext.Provider>
  )
}
