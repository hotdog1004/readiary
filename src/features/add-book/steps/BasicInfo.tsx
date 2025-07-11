import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BasicInfoFormValues } from '../types/formTypes'
import { BOOK_STATUS_LABELS, BOOK_STATUS_VALUES, BookStatus } from '@/shared/types/book'
import { BasicInfoSchema } from '../schemas'

interface BasicInfoProps {
  initialValues?: BasicInfoFormValues //  상위에서 전달받은 이전 값
  onComplete: (data: BasicInfoFormValues) => void
}

const statusOptions = BOOK_STATUS_VALUES.map((value) => ({
  value,
  label: BOOK_STATUS_LABELS[value],
}))

export const BasicInfo = ({ initialValues, onComplete }: BasicInfoProps) => {
  /**
   * - useForm, 상태, 에러, 검증 모두 Step 내부에서만 관리
   * - 상위는 onComplete로 결과만 받음
   * - initialValues가 바뀌면 reset으로 RHF 상태 동기화
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<BasicInfoFormValues>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: initialValues || {
      title: '',
      author: '',
      status: 'want_to_read',
      startDate: undefined,
      endDate: undefined,
      totalPages: 1,
      publishedDate: '',
    },
    mode: 'onChange', // 변경될 때마다 유효성 검증 실행하기 위해 처리
  })
  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const status = watch('status')

  const onSubmit = (data: BasicInfoFormValues) => {
    onComplete(data) // 상위에 결과만 전달
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>제목</label>
        <input {...register('title')} />
        {errors.title && <span>{errors.title.message}</span>}
      </div>
      <div>
        <label>저자</label>
        <input {...register('author')} />
        {errors.author && <span>{errors.author.message}</span>}
      </div>
      <div>
        <label>도서 출판일</label>
        <input type="date" {...register('publishedDate')} />
        {errors.publishedDate && <span>{errors.publishedDate.message}</span>}
      </div>
      <div>
        <label>상태</label>
        <select {...register('status')}>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.status && <span>{errors.status.message}</span>}
      </div>
      <div>
        <label>도서 전체 페이지 수</label>
        <input type="number" min={1} {...register('totalPages', { valueAsNumber: true })} />
        {errors.totalPages && <span>{errors.totalPages.message}</span>}
      </div>
      <div>
        <label>시작일</label>
        <input type="date" {...register('startDate')} disabled={status === 'want_to_read'} />
        {errors.startDate && <span>{errors.startDate.message}</span>}
      </div>
      <div>
        <label>종료일</label>
        <input
          type="date"
          {...register('endDate')}
          disabled={status === 'want_to_read' || status === 'reading'}
        />
        {errors.endDate && <span>{errors.endDate.message}</span>}
      </div>
      <button type="submit">다음</button>
    </form>
  )
}
