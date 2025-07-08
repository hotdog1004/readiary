import React from 'react'
import { Container, Header, Title, BookGrid, EmptyState, EmptyIcon } from './styles'
import { mockBooks } from '@/entities/book/__mocks__/mockBooks'
import { LinkButton } from '@/shared/ui/button'
import BookCard from '@/entities/book'

export default function BooksPage() {
  return (
    <Container>
      <Header>
        <Title>읽기장</Title>
        <LinkButton href="/books/new" variant="primary" size="medium">
          읽기장 쓰기
        </LinkButton>
      </Header>

      {mockBooks.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📚</EmptyIcon>
          <h3>아직 추가한 도서가 없어요.</h3>
          <p>첫 번째 도서를 추가해보세요!</p>
        </EmptyState>
      ) : (
        <BookGrid>
          {mockBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </BookGrid>
      )}
    </Container>
  )
}
