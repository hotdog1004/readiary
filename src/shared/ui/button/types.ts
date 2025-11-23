import type { PropsWithChildren, ButtonHTMLAttributes } from 'react'
import { ButtonSize, ButtonVariant } from './styles'

export interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  variant?: ButtonVariant
}

export interface LinkButtonProps extends PropsWithChildren {
  href: string
  size?: ButtonSize
  variant?: ButtonVariant
}
