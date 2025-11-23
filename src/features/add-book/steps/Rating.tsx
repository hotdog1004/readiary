import { Controller, useFormContext } from 'react-hook-form'
import { AddBookFormValues } from '../types/formTypes'
import { FormField } from '@/shared/ui/formField'
import { Checkbox } from '@/shared/ui/checkbox'
import { FormLayout } from '@/shared/ui/formLayout'
import { Button } from '@/shared/ui/button'
import { Range } from '@/shared/ui/range'
import { useStepNavigationContext } from '../models/StepNavigationContextValue'
import { FormEvent } from 'react'

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
        <FormField
          label="도서 추천 여부"
          errorMessage={errors.isRecommended?.message}
          helperMessage="이 책을 다른 사람에게 추천하시나요?"
        >
          <Controller
            name="isRecommended"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} onChange={field.onChange} label="추천" />
            )}
          />
        </FormField>

        <FormField
          label="별점"
          required
          errorMessage={errors.rating?.message}
          helperMessage="0.5점 단위로 평가됩니다."
        >
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <Range value={field.value} onChange={field.onChange} min={0} max={5} step={0.5} />
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
        <Button size="small" type="submit" form="rating-form">
          다음
        </Button>
      </div>
    </>
  )
}
