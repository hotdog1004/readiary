import { LinkButton } from '@/shared/ui/button'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  padding: 0 1.25rem;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  text-align: center;
`

const BookEmoji = styled.div`
  font-size: 3rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1rem;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    align-items: stretch;
  }
`

export default function Home() {
  return (
    <Wrapper>
      <Header>
        <BookEmoji>📓</BookEmoji>
        <Title>읽기장</Title>
        <Subtitle>Your reading journey, written by you.</Subtitle>
      </Header>
      <ButtonGroup>
        <LinkButton href="/books" variant="gray" size="large">
          읽기장 보기
        </LinkButton>
        <LinkButton href="/books/new" variant="primary" size="large">
          읽기장 쓰기
        </LinkButton>
      </ButtonGroup>
    </Wrapper>
  )
}
