import {useContext} from 'react'
import {PaperThemeManager} from './PaperThemeManager'
import {PaperThemeManagerContext} from './PaperThemeManagerContext'

export function usePaperThemeManager(): PaperThemeManager {
  const themeManager = useContext(PaperThemeManagerContext)

  if (!themeManager) {
    throw Error('No theme manager context is available!')
  }

  return themeManager
}
