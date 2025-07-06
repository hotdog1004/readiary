import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'

// 도서 목업 데이터
const mockBooks = [
  {
    id: '1',
    title: '클린 코드',
    author: '로버트 C. 마틴',
    publisher: '인사이트',
    publishedDate: '2013-12-24',
    isbn: '9788966262472',
    coverImage: '/api/placeholder/150/200',
    description:
      '함수, 변수, 클래스, 시스템을 작성하는 방법을 설명하고, "깨끗한 코드"를 작성하는 방법을 제시한다.',
    category: '프로그래밍',
    pageCount: 584,
    hasReview: true,
    reviewCount: 1,
  },
  {
    id: '2',
    title: '리팩토링',
    author: '마틴 파울러',
    publisher: '한빛미디어',
    publishedDate: '2019-10-15',
    isbn: '9788966263585',
    coverImage: '/api/placeholder/150/200',
    description:
      '기존 코드의 외부 동작은 그대로 유지하면서 내부 구조를 개선하는 방법을 체계적으로 정리한 책이다.',
    category: '프로그래밍',
    pageCount: 448,
    hasReview: false,
    reviewCount: 0,
  },
]

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
`

const AddBookButton = styled(Link)`
  background: #007bff;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background: #0056b3;
  }
`

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`

const BookCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`

const CardHeader = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
`

const BookCover = styled.div`
  width: 80px;
  height: 120px;
  background: #f0f0f0;
  border-radius: 6px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666;
  flex-shrink: 0;
`

const BookInfo = styled.div`
  flex: 1;
`

const BookTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 6px 0;
  color: #333;
  line-height: 1.3;
`

const Author = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0 0 4px 0;
  font-weight: 500;
`

const Publisher = styled.p`
  font-size: 0.85rem;
  color: #888;
  margin: 0 0 8px 0;
`

const Category = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`

const CardContent = styled.div`
  padding: 20px;
`

const Description = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #555;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const BookDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 0.85rem;
  color: #666;
`

const PageCount = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`

const PublishedDate = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f8f9fa;
  border-top: 1px solid #f0f0f0;
`

const ReviewStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
`

const ReviewBadge = styled.span<{ hasReview: boolean }>`
  background: ${(props) => (props.hasReview ? '#d4edda' : '#f8d7da')};
  color: ${(props) => (props.hasReview ? '#155724' : '#721c24')};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`

const ActionButton = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
  opacity: 0.5;
`

export default function BooksPage() {
  return (
    <Container>
      <Header>
        <Title>내 도서</Title>
        <AddBookButton href="/books/new">+ 새 도서 추가</AddBookButton>
      </Header>

      {mockBooks.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📚</EmptyIcon>
          <h3>아직 추가한 도서가 없어요</h3>
          <p>첫 번째 도서를 추가해보세요!</p>
        </EmptyState>
      ) : (
        <BookGrid>
          {mockBooks.map((book) => (
            <BookCard key={book.id}>
              <CardHeader>
                <BookCover>📖</BookCover>
                <BookInfo>
                  <BookTitle>{book.title}</BookTitle>
                  <Author>{book.author}</Author>
                  <Publisher>{book.publisher}</Publisher>
                  <Category>{book.category}</Category>
                </BookInfo>
              </CardHeader>

              <CardContent>
                <Description>{book.description}</Description>
                <BookDetails>
                  <PageCount>📄 {book.pageCount}페이지</PageCount>
                  <PublishedDate>📅 {book.publishedDate}</PublishedDate>
                </BookDetails>
              </CardContent>

              <CardFooter>
                <ReviewStatus>
                  <ReviewBadge hasReview={book.hasReview}>
                    {book.hasReview ? '독후감 작성됨' : '독후감 미작성'}
                  </ReviewBadge>
                  {book.hasReview && <span>({book.reviewCount}개)</span>}
                </ReviewStatus>
                <ActionButton href={`/books/${book.id}`}>
                  {book.hasReview ? '독후감 보기' : '독후감 작성'} →
                </ActionButton>
              </CardFooter>
            </BookCard>
          ))}
        </BookGrid>
      )}
    </Container>
  )
}
