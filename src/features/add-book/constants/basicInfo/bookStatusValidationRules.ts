import { BookStatusValidationRules } from '../../types'

export const bookStatusValidationRules: BookStatusValidationRules = {
  want_to_read: {
    startDate: { type: 'forbidden', message: '읽고 싶은 책은 시작일을 입력할 수 없어요.' },
    endDate: { type: 'forbidden', message: '읽고 싶은 책은 종료일을 입력할 수 없어요.' },
  },
  reading: {
    startDate: { type: 'required', message: '읽는 중인 책은 시작일을 입력해 주세요.' },
    endDate: { type: 'forbidden', message: '읽는 중인 책은 종료일을 입력할 수 없어요.' },
  },
  finished: {
    startDate: { type: 'required', message: '다 읽은 책은 시작일을 입력해 주세요.' },
    endDate: { type: 'required', message: '다 읽은 책은 종료일을 입력해 주세요.' },
  },
  on_hold: {
    startDate: { type: 'required', message: '보류 중인 책은 시작일을 입력해 주세요.' },
    endDate: { type: 'forbidden', message: '보류 중인 책은 종료일을 입력할 수 없어요.' },
  },
}
