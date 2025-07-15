import styled from '@emotion/styled'
import type { BookStatus } from '@/shared/types/book'

const StatusBadge = styled.span<{ status: BookStatus }>`
  background: ${({ status, theme }) => {
    switch (status) {
      case 'want_to_read':
        return theme.colors.orange
      case 'reading':
        return theme.colors.primaryLight
      case 'finished':
        return theme.colors.primaryDark
      case 'on_hold':
        return theme.colors.grayLight
      default:
        return theme.colors.grayLight
    }
  }};
  color: ${({ status, theme }) =>
    status === 'finished' ? theme.colors.white : theme.colors.black};
  padding: 0.25rem 0.625rem;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
`

export default StatusBadge
