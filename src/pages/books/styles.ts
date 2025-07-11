import styled from '@emotion/styled'

export const Container = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  padding: 1.25rem;
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  text-align: center;
`

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

export const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(21.875rem, 1fr));
  gap: 1.5rem;
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 3.75rem 1.25rem;
  color: ${({ theme }) => theme.colors.gray};
`

export const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`
