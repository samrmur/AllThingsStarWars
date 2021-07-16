import {DefaultTheme, Theme} from 'react-native-paper'

export const lightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f3f2f5',
    accent: '#268ad1',
    background: '#e9e8ed',
    error: '#ed2224'
  },
  dark: false
}

export const darkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#161617',
    accent: '#ffe820',
    surface: '#161617',
    text: '#FFFFFF',
    background: '#252526',
    error: '#ed2224'
  },
  dark: true
}
