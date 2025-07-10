import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RatingFormValues } from '../types/formTypes'
import { RatingSchema } from '../schemas'

interface RatingProps {
  defaultValues: RatingFormValues
  onNext: (data: RatingFormValues) => void
  onBack: () => void
}

export const Rating: FC<RatingProps> = ({ defaultValues, onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RatingFormValues>({
    resolver: zodResolver(RatingSchema),
    defaultValues,
    mode: 'onTouched',
  })

  // 별점 입력을 위한 커스텀 UI 예시 (간단한 select, 실제로는 별점 컴포넌트로 대체 가능)
  const ratingOptions = Array.from({ length: 11 }, (_, i) => i * 0.5)

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <div>
        <label>도서 추천 여부</label>
        <input type="checkbox" {...register('isRecommended')} />
        <span>추천</span>
        {errors.isRecommended && <span>{errors.isRecommended.message}</span>}
      </div>
      <div>
        <label>별점</label>
        <select {...register('rating', { valueAsNumber: true })}>
          {ratingOptions.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
        {errors.rating && <span>{errors.rating.message}</span>}
      </div>
      <button type="button" onClick={onBack}>
        이전
      </button>
      <button type="submit">다음</button>
    </form>
  )
}
