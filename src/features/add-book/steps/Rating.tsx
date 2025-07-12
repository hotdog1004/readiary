import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RatingFormValues } from '../types/formTypes'
import { RatingSchema } from '../schemas'
import { Select } from '@/shared/ui/select'
import { FormField } from '@/shared/ui/formField'
import { Checkbox } from '@/shared/ui/checkbox'
import { FormLayout } from '@/shared/ui/formLayout'
import { Button } from '@/shared/ui/button'
import { Range } from '@/shared/ui/range'

interface RatingProps {
  initialValues?: RatingFormValues
  onComplete: (data: RatingFormValues) => void
  onBack: () => void
}

export const Rating = ({ initialValues, onComplete, onBack }: RatingProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RatingFormValues>({
    resolver: zodResolver(RatingSchema),
    defaultValues: initialValues || {
      isRecommended: false,
      rating: 0,
    },
    mode: 'onTouched',
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const onSubmit = (data: RatingFormValues) => {
    onComplete(data)
  }

  return (
    <>
      <FormLayout id="rating-form" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="도서 추천 여부"
          error={errors.isRecommended?.message}
          helperText="이 책을 다른 사람에게 추천하시나요?"
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
          error={errors.rating?.message}
          helperText="0.5점 단위로 평가됩니다."
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
