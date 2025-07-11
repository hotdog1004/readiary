import type { PropsWithChildren } from 'react'
import { ButtonSize, ButtonVariant, StyledLink } from './styles'

interface LinkButtonProps extends PropsWithChildren {
  href: string
  size?: ButtonSize
  variant?: ButtonVariant
}

const LinkButton = ({
  href,
  size = 'medium',
  variant = 'primary',
  children,
  ...rest
}: LinkButtonProps) => (
  <StyledLink href={href} $size={size} $variant={variant} {...rest}>
    {children}
  </StyledLink>
)

export default LinkButton
