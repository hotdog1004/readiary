import type { PropsWithChildren, ButtonHTMLAttributes } from 'react'
import { StyledButton, ButtonSize, ButtonVariant } from './styles'

interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  variant?: ButtonVariant
}

const Button = ({
  size = 'medium',
  variant = 'primary',
  type = 'button',
  children,
  ...rest
}: ButtonProps) => (
  <StyledButton type={type} $size={size} $variant={variant} {...rest}>
    {children}
  </StyledButton>
)

export default Button
