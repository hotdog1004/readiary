import { Controller, useFormContext } from 'react-hook-form'
import { AddBookFormValues } from '../types/formTypes'
import { FormField } from '@/shared/ui/formField'
import { FormLayout } from '@/shared/ui/formLayout'
import { NumberField } from '@/shared/ui/textField'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'
import { hasError } from '@/shared/utils'
import { useStepNavigationContext } from '../models/StepNavigationContextValue'
import { FormEvent } from 'react'

export const Quote = () => {
  const {
    control,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext<AddBookFormValues>()

  const { onNext, onBack } = useStepNavigationContext()

  const totalPages = watch('totalPages')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const fields: (keyof AddBookFormValues)[] = ['quotePage', 'quoteText']

    const isValid = await trigger(fields)
    if (isValid) {
      onNext()
    }
  }

  return (
    <>
      <FormLayout id="quote-form" onSubmit={handleSubmit}>
        <FormField
          label="인용구 페이지 번호"
          required
          errorMessage={errors.quotePage?.message}
          helperMessage={`입력 가능 페이지 : 1p - ${totalPages - 1}p`}
        >
          <Controller
            name="quotePage"
            control={control}
            render={({ field }) => (
              <NumberField
                {...field}
                error={hasError(errors.quotePage)}
                placeholder="232"
                min={1}
                max={totalPages}
              />
            )}
          />
        </FormField>

        <FormField
          label="인용구"
          required
          errorMessage={errors.quoteText?.message}
          helperMessage="책에서 인상 깊었던 문장을 입력해 주세요."
        >
          <Controller
            name="quoteText"
            control={control}
            render={({ field }) => (
              <Textarea {...field} error={hasError(errors.quoteText)} rows={6} />
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
        <Button size="small" type="submit" form="quote-form">
          다음
        </Button>
      </div>
    </>
  )
}
