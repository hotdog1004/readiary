import { useFormContext } from 'react-hook-form'
import { AddBookFormValues } from '../../types/formTypes'
import { FormLayout } from '@/shared/ui/formLayout'
import { RHFCheckbox } from '@/shared/ui/formField/rhf'
import { useStepNavigation } from '../../hooks/useStepNavigation'
import { StepNavigationButtons } from '../StepNavigationButtons'

export const Visibility = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useFormContext<AddBookFormValues>()

  const { onBack } = useStepNavigation()

  const onSubmit = handleSubmit((data: AddBookFormValues) => {
    // TODO: API 호출
    console.log('최종 제출 데이터:', data)
  })

  return (
    <>
      <FormLayout id="visibility-form" onSubmit={onSubmit}>
        <RHFCheckbox
          control={control}
          name="isPublic"
          error={errors.isPublic}
          label="공개 여부"
          helperMessage="체크 시 다른 사용자에게 공개될 수 있어요."
          checkboxLabel="공개"
        />
      </FormLayout>
      <StepNavigationButtons formId="visibility-form" />
    </>
  )
}
