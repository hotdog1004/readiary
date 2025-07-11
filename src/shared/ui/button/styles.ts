import styled from '@emotion/styled'
import type { AppTheme } from '@/shared/theme/theme'
import Link from 'next/link'

export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonVariant = 'primary' | 'gray'

export const sizeStyles = {
  small: `
    font-size: 0.85rem;
    padding: 0.375rem 0.875rem;
    border-radius: 0.375rem;
  `,
  medium: `
    font-size: 1rem;
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
  `,
  large: `
    font-size: 1.15rem;
    padding: 0.875rem 1.75rem;
    border-radius: 0.625rem;
  `,
}

export const variantStyles = {
  primary: (theme: AppTheme) => `
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: none;
    &:hover {
      background: ${theme.colors.primaryDark};
    }
  `,
  gray: (theme: AppTheme) => `
    background: ${theme.colors.grayLight};
    color: ${theme.colors.text};
    border: none;
    &:hover {
      background: ${theme.colors.gray};
      color: ${theme.colors.white};
    }
  `,
}

export const StyledButton = styled('button')<{
  $size: ButtonSize
  $variant: ButtonVariant
}>`
  display: inline-block;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition:
    background 0.2s,
    color 0.2s;
  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant, theme }) => variantStyles[$variant](theme)}
  outline: none;
`

export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{
  $size: ButtonSize
  $variant: ButtonVariant
}>`
  display: inline-block;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition:
    background 0.2s,
    color 0.2s;
  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant, theme }) => variantStyles[$variant](theme)}
  outline: none;
`
