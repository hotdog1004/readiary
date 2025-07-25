export const BOOK_STATUS_VALUES = ['want_to_read', 'reading', 'finished', 'on_hold'] as const
export type BookStatus = (typeof BOOK_STATUS_VALUES)[number]

export const BOOK_STATUS_LABELS: Record<BookStatus, string> = {
  want_to_read: '읽고 싶은 책',
  reading: '읽는 중',
  finished: '읽음',
  on_hold: '보류 중',
}

export type Book = {
  id: string
  title: string
  author: string
  publisher: string
  publishedDate: string
  status: BookStatus
}
