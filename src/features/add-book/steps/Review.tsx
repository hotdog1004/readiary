import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReviewFormValues } from '../types/formTypes'
import { ReviewSchema } from '../schemas'
import { FormLayout } from '@/shared/ui/formLayout'
import { FormField } from '@/shared/ui/formField'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'
import { hasError } from '../utils'

interface ReviewProps {
  initialValues?: ReviewFormValues
  rating: number // 상위에서 전달받음 (별점)
  onNext: (data: ReviewFormValues) => void
  onBack: () => void
}

export const Review = ({ initialValues, rating, onNext, onBack }: ReviewProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(ReviewSchema(rating)),
    defaultValues: initialValues || {
      review: '',
    },
    mode: 'onTouched',
  })

  const onSubmit = (data: ReviewFormValues) => {
    onNext(data)
  }
  const showSpecialMessage = rating === 1 || rating === 5

  return (
    <>
      <FormLayout id="review-form" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="독후감"
          required={showSpecialMessage}
          errorMessage={errors.review?.message}
          helperMessage={
            showSpecialMessage
              ? '최소 100자 이상 입력해 주세요.'
              : '독후감을 입력해 주세요. (선택사항)'
          }
        >
          <Controller
            name="review"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                value={field.value || ''}
                error={hasError(errors.review)}
                placeholder="너무 좋은 책이다!"
                rows={8}
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
