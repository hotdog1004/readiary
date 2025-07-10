import { BOOK_STATUS_VALUES } from '@/shared/types/book'
import z from 'zod'
// TODO: validation 메세지 정리, 구조 개선
export const BasicInfoSchema = z
  .object({
    title: z.string().min(1, '제목은 필수입니다.'),
    author: z.string().min(1, '저자는 필수입니다.'),
    totalPages: z.number().min(1, '도서 전체 페이지 수는 1 이상이어야 합니다.'), // 추가
    publishedDate: z.string(), // 출판일 필수
    status: z.enum(BOOK_STATUS_VALUES),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // 읽고 싶은 책 은 독서 기간이 입력되면 안 된다.
    if (data.status === 'want_to_read' && (data.startDate || data.endDate)) {
      ctx.addIssue({
        path: ['startDate'],
        message: '읽고 싶은 책은 독서 기간을 입력할 수 없습니다.',
        code: 'custom',
      })
    }
    // 읽는 중 이면 독서 시작일만 입력돼야 한다. / 독서 종료일은 입력되면 안 된다.
    if (data.status === 'reading' && data.endDate) {
      ctx.addIssue({
        path: ['endDate'],
        message: '읽는 중인 책은 시작일만 입력할 수 있습니다.',
        code: 'custom',
      })
    }
    // 읽음 이면 독서 시작일/종료일이 입력돼야 한다.
    if (data.status === 'finished') {
      if (!data.startDate || !data.endDate) {
        ctx.addIssue({
          path: ['startDate'],
          message: '다 읽은 책은 독서 기간을 모두 입력해야합니다.',
          code: 'custom',
        })
      }
    }
    // 보류 중 이면 독서 시작일만 입력돼야 한다. / 독서 종료일은 입력되면 안 된다.
    if (data.status === 'on_hold' && data.endDate) {
      ctx.addIssue({
        path: ['endDate'],
        message: '보류 중인 책은 시작일만 입력할 수 있습니다.',
        code: 'custom',
      })
    }
    // 독서 시작일은 독서 종료일보다 이후면 안 된다.
    if (data.startDate && data.endDate && data.startDate > data.endDate) {
      ctx.addIssue({
        path: ['startDate'],
        message: '시작일은 종료일보다 빠르거나 같아야 합니다.',
        code: 'custom',
      })
    }
    // 독서 시작일은 도서 출판일 이후여야 한다.
    if (data.startDate && data.startDate > data.publishedDate) {
      ctx.addIssue({
        path: ['startDate'],
        message: '시작일은 도서 출판일 이후여야 합니다.',
        code: 'custom',
      })
    }
  })

export const RatingSchema = z.object({
  isRecommended: z.boolean(),
  rating: z.number(),
})

export const ReviewSchema = (rating: number) =>
  z
    .object({
      review: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (rating === 1 || rating === 5) {
        if (!data.review || data.review.length < 100) {
          ctx.addIssue({
            path: ['review'],
            message: '독후감은 최소 100자 이상 작성해야합니다.',
            code: 'custom',
          })
        }
      }
    })

export const QuoteSchema = (totalPages: number) =>
  z
    .object({
      quotePage: z.number(),
      quoteText: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.quotePage >= totalPages) {
        ctx.addIssue({
          path: ['quotePage'],
          message: '인용구 페이지 번호는 도서 전체 페이지 수보다 작아야 합니다.',
          code: 'custom',
        })
      }
    })

export const VisibilitySchema = z.object({
  isPublic: z.boolean(),
})
