import {
  Card,
  CardHeader,
  BookCover,
  BookInfo,
  BookTitle,
  Author,
  Publisher,
  CardContent,
  BookDetails,
  PublishedDate,
} from './styles'
import { BOOK_STATUS_LABELS } from '@/shared/types/book'
import type { Book } from '@/shared/types/book'
import StatusBadge from '@/shared/ui/statusBadge'

interface BookCardProps {
  book: Book
}

const BookCard = ({ book }: BookCardProps) => (
  <Card>
    <CardHeader>
      <BookCover>📖</BookCover>
      <BookInfo>
        <BookTitle>{book.title}</BookTitle>
        <Author>{book.author}</Author>
        <Publisher>{book.publisher}</Publisher>
      </BookInfo>
    </CardHeader>
    <CardContent>
      <BookDetails>
        <PublishedDate>📅 {book.publishedDate}</PublishedDate>
        <StatusBadge status={book.status}>{BOOK_STATUS_LABELS[book.status]}</StatusBadge>
      </BookDetails>
    </CardContent>
  </Card>
)

export default BookCard
