import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { QuoteFormValues } from '../types/formTypes'
import { QuoteSchema } from '../schemas'

interface QuoteProps {
  defaultValues: QuoteFormValues
  totalPages: number // 도서 전체 페이지 수 (상위에서 전달)
  onNext: (data: QuoteFormValues) => void
  onBack: () => void
}

export const Quote: FC<QuoteProps> = ({ defaultValues, totalPages, onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(QuoteSchema(totalPages)),
    defaultValues,
    mode: 'onTouched',
  })

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <div>
        <label>인용구 페이지 번호</label>
        <input
          type="number"
          {...register('quotePage', { valueAsNumber: true })}
          min={1}
          max={totalPages}
          placeholder={`1 ~ ${totalPages - 1}`}
        />
        {errors.quotePage && <span>{errors.quotePage.message}</span>}
      </div>
      <div>
        <label>인용구</label>
        <textarea
          {...register('quoteText')}
          placeholder="책에서 인상 깊었던 문장을 입력하세요"
          rows={4}
        />
        {errors.quoteText && <span>{errors.quoteText.message}</span>}
      </div>
      <button type="button" onClick={onBack}>
        이전
      </button>
      <button type="submit">다음</button>
    </form>
  )
}
