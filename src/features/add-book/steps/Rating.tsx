import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RatingFormValues } from '../types/formTypes'
import { RatingSchema } from '../schemas'

interface RatingProps {
  initialValues?: RatingFormValues
  onComplete: (data: RatingFormValues) => void
  onBack: () => void
}

export const Rating = ({ initialValues, onComplete, onBack }: RatingProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RatingFormValues>({
    resolver: zodResolver(RatingSchema),
    defaultValues: initialValues || {
      isRecommended: false,
      rating: 0,
    },
    mode: 'onTouched',
  })

  const ratingOptions = Array.from({ length: 11 }, (_, i) => i * 0.5)

  const onSubmit = (data: RatingFormValues) => {
    onComplete(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
