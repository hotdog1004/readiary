import { BookGrid, Container, EmptyIcon, EmptyState, Header, Title } from './styles'
import { LinkButton } from '@/shared/ui/button'
import BookCard from '@/entities/book'
import { Book } from '@/shared/types/book'

interface BooksListSectionProps {
  books: Book[]
}

const BooksListSection = ({ books }: BooksListSectionProps) => (
  <Container>
    <Header>
      <Title>읽기장</Title>
      <LinkButton href="/books/new" variant="primary" size="medium">
        읽기장 쓰기
      </LinkButton>
    </Header>
    {books.length === 0 ? (
      <EmptyState>
        <EmptyIcon>📚</EmptyIcon>
        <h3>아직 추가한 도서가 없어요.</h3>
        <p>첫 번째 도서를 추가해보세요!</p>
      </EmptyState>
    ) : (
      <BookGrid>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </BookGrid>
    )}
  </Container>
)

export default BooksListSection
