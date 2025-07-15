export const theme = {
  colors: {
    primary: '#0064ff',
    primaryLight: '#89b7ff',
    primaryLighter: '#b1cfff',
    primaryDark: '#003689',
    primaryDarker: '#00173b',
    background: '#ebf3ff',
    text: '#4e5968',
    danger: '#e53935',
    gray: '#767d89',
    grayLight: '#bdbdbd',
    grayLighter: '#ececec',
    orange: '#ff9b00',
    black: '#171717',
    white: '#fff',
  },
  shadows: {
    small: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.1)',
    medium: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.15)',
    large: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)',
  },
  borderRadius: {
    none: '0',
    small: '0.1875rem',
    medium: '0.375rem',
    large: '0.75rem',
    full: '50%',
  },
}
export type AppTheme = typeof theme
