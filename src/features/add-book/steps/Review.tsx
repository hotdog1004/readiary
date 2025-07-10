import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReviewFormValues } from '../types/formTypes'
import { ReviewSchema } from '../schemas'

interface ReviewProps {
  initialValues?: ReviewFormValues
  rating: number // 상위에서 전달받음 (별점)
  onComplete: (data: ReviewFormValues) => void
  onBack: () => void
}

export const Review = ({ initialValues, rating, onComplete, onBack }: ReviewProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(ReviewSchema(rating)),
    defaultValues: initialValues || {
      review: '',
    },
    mode: 'onTouched',
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const onSubmit = (data: ReviewFormValues) => {
    onComplete(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>독후감</label>
        <textarea {...register('review')} placeholder="독후감을 입력하세요" rows={6} />
        {errors.review && <span>{errors.review.message}</span>}
        {(rating === 1 || rating === 5) && (
          <div style={{ color: '#888', fontSize: '0.9em' }}>
            ※ 별점이 1점 또는 5점일 때는 100자 이상 입력해야 합니다.
          </div>
        )}
      </div>
      <button type="button" onClick={onBack}>
        이전
      </button>
      <button type="submit">다음</button>
    </form>
  )
}
