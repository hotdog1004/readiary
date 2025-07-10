import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BasicInfoFormValues } from '../types/formTypes'
import { BasicInfoSchema } from '../schemas/stepSchemas'
import { BOOK_STATUS_LABELS, BOOK_STATUS_VALUES, BookStatus } from '@/shared/types/book'

interface BasicInfoProps {
  defaultValues: BasicInfoFormValues
  onNext: (data: BasicInfoFormValues) => void
}

const statusOptions = BOOK_STATUS_VALUES.map((value) => ({
  value,
  label: BOOK_STATUS_LABELS[value],
}))

export const BasicInfo: FC<BasicInfoProps> = ({ defaultValues, onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BasicInfoFormValues>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues,
    mode: 'onTouched',
  })

  const status = watch('status')

  return (
    <form onSubmit={handleSubmit(onNext)}>
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
