import React from 'react'
import {PaperThemeManager} from './PaperThemeManager'

export const PaperThemeManagerContext = React.createContext<
  PaperThemeManager | undefined
>(undefined)
