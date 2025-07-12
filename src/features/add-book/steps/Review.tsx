import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReviewFormValues } from '../types/formTypes'
import { ReviewSchema } from '../schemas'
import { FormLayout } from '@/shared/ui/formLayout'
import { FormField } from '@/shared/ui/formField'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'

interface ReviewProps {
  initialValues?: ReviewFormValues
  rating: number // 상위에서 전달받음 (별점)
  onComplete: (data: ReviewFormValues) => void
  onBack: () => void
}

export const Review = ({ initialValues, rating, onComplete, onBack }: ReviewProps) => {
  const {
    control,
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
  const showSpecialMessage = rating === 1 || rating === 5

  return (
    <>
      <FormLayout id="review-form" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="독후감"
          required={showSpecialMessage}
          error={errors.review?.message}
          helperText={
            showSpecialMessage
              ? '※ 별점이 1점 또는 5점일 때는 100자 이상 입력해야 합니다.'
              : '독후감을 입력하세요. (선택사항)'
          }
        >
          <Controller
            name="review"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                value={field.value || ''}
                error={!!errors.review}
                placeholder="독후감을 입력하세요."
                rows={6}
              />
            )}
          />
        </FormField>
      </FormLayout>

      <div
        style={{
          marginTop: '2rem',
          textAlign: 'center',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
        }}
      >
        <Button size="small" variant="gray" onClick={onBack}>
          이전
        </Button>
        <Button size="small" type="submit" form="review-form">
          다음
        </Button>
      </div>
    </>
  )
}
