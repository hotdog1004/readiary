import { StyledLink } from './styles'
import type { LinkButtonProps } from './types'

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
