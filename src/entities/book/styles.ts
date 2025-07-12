import styled from '@emotion/styled'

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.small};
  overflow: hidden;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  &:hover {
    transform: translateY(-0.125rem);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`

export const CardHeader = styled.div`
  display: flex;
  padding: 1.25rem;
  gap: 1.3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayLight};
`

export const BookCover = styled.div`
  width: 5rem;
  height: 7.5rem;
  background: ${({ theme }) => theme.colors.grayLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray};
  flex-shrink: 0;
`

export const BookInfo = styled.div`
  flex: 1;
`

export const BookTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.375rem 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
`

export const Author = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray};
  margin: 0 0 0.25rem 0;
  font-weight: 500;
`

export const Publisher = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.grayLight};
  margin: 0 0 0.5rem 0;
`

export const CardContent = styled.div`
  padding: 1.25rem;
`

export const BookDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray};
`

export const PublishedDate = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`
