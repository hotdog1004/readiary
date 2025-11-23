import { StyledButton } from './styles'
import type { ButtonProps } from './types'

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
