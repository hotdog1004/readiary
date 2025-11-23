import { useFormContext } from 'react-hook-form'
import { AddBookFormValues } from '../../types/formTypes'
import { FormLayout } from '@/shared/ui/formLayout'
import { FormEvent } from 'react'
import { RHFNumberField, RHFTextarea } from '@/shared/ui/formField/rhf'
import { useStepNavigation } from '../../hooks/useStepNavigation'
import { StepNavigationButtons } from '../StepNavigationButtons'

export const Quote = () => {
  const {
    control,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext<AddBookFormValues>()

  const { onNext, onBack } = useStepNavigation()

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
        <RHFNumberField
          control={control}
          name="quotePage"
          error={errors.quotePage}
          label="인용구 페이지 번호"
          required
          helperMessage={`입력 가능 페이지 : 1p - ${totalPages - 1}p`}
          placeholder="232"
          min={1}
          max={totalPages}
        />
        <RHFTextarea
          control={control}
          name="quoteText"
          error={errors.quoteText}
          label="인용구"
          required
          helperMessage="책에서 인상 깊었던 문장을 입력해 주세요."
          rows={6}
        />
      </FormLayout>
      <StepNavigationButtons formId="quote-form" />
    </>
  )
}
