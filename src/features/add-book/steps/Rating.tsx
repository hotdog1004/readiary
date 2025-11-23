import { useFormContext } from 'react-hook-form'
import { AddBookFormValues } from '../types/formTypes'
import { FormLayout } from '@/shared/ui/formLayout'
import { Button } from '@/shared/ui/button'
import { useStepNavigationContext } from '../models/StepNavigationContextValue'
import { FormEvent } from 'react'
import { RHFCheckbox, RHFRange } from '@/shared/ui/formField/rhf'

export const Rating = () => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext<AddBookFormValues>()

  const { onNext, onBack } = useStepNavigationContext()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const fields: (keyof AddBookFormValues)[] = ['isRecommended', 'rating']

    const isValid = await trigger(fields)
    if (isValid) {
      onNext()
    }
  }

  return (
    <>
      <FormLayout id="rating-form" onSubmit={handleSubmit}>
        <RHFCheckbox
          control={control}
          name="isRecommended"
          error={errors.isRecommended}
          label="도서 추천 여부"
          helperMessage="이 책을 다른 사람에게 추천하시나요?"
          checkboxLabel="추천"
        />

        <RHFRange
          control={control}
          name="rating"
          error={errors.rating}
          label="별점"
          required
          helperMessage="0.5점 단위로 평가됩니다."
          min={0}
          max={5}
          step={0.5}
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
        <Button size="small" type="submit" form="rating-form">
          다음
        </Button>
      </div>
    </>
  )
}
