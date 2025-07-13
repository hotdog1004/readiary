import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { QuoteFormValues } from '../types/formTypes'
import { QuoteSchema } from '../schemas'

interface QuoteProps {
  initialValues?: QuoteFormValues
  totalPages: number // 도서 전체 페이지 수 (상위에서 전달)
  onComplete: (data: QuoteFormValues) => void // 결과만 상위에 전달
  onBack: () => void
}

export const Quote = ({ initialValues, totalPages, onComplete, onBack }: QuoteProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(QuoteSchema(totalPages)),
    defaultValues: initialValues || {
      quotePage: 0,
      quoteText: '',
    },
    mode: 'onTouched',
  })

  const onSubmit = (data: QuoteFormValues) => {
    onComplete(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
