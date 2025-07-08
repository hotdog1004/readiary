import { Book } from '@/shared/types/book'

export const mockBooks: Book[] = [
  {
    id: '1',
    title: '클린 코드',
    author: '로버트 C. 마틴',
    publisher: '인사이트',
    publishedDate: '2013-12-24',
    status: 'on_hold',
  },
  {
    id: '2',
    title: '리팩토링',
    author: '마틴 파울러',
    publisher: '한빛미디어',
    publishedDate: '2019-10-15',
    status: 'reading',
  },
]
