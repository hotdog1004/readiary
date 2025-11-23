import { useFormContext } from 'react-hook-form'
import { AddBookFormValues } from '../types/formTypes'
import { FormLayout } from '@/shared/ui/formLayout'
import { Button } from '@/shared/ui/button'
import { useStepNavigationContext } from '../models/StepNavigationContextValue'
import { FormEvent } from 'react'
import { RHFTextarea } from '@/shared/ui/formField/rhf'

export const Review = () => {
  const {
    control,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext<AddBookFormValues>()

  const { onNext, onBack } = useStepNavigationContext()

  const rating = watch('rating')
  const showSpecialMessage = rating === 1 || rating === 5

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const fields: (keyof AddBookFormValues)[] = ['review']

    const isValid = await trigger(fields)
    if (isValid) {
      onNext()
    }
  }

  return (
    <>
      <FormLayout id="review-form" onSubmit={handleSubmit}>
        <RHFTextarea
          control={control}
          name="review"
          error={errors.review}
          label="독후감"
          required={showSpecialMessage}
          helperMessage={
            showSpecialMessage
              ? '최소 100자 이상 입력해 주세요.'
              : '독후감을 입력해 주세요. (선택사항)'
          }
          rows={8}
          placeholder="너무 좋은 책이다!"
        />
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
