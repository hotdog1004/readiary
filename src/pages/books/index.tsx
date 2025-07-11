import React from 'react'
import { mockBooks } from '@/entities/book/__mocks__/mockBooks'
import BooksListSection from '@/widgets/booksPage/BooksListSection'

export default function BooksPage() {
  return <BooksListSection books={mockBooks} />
}
