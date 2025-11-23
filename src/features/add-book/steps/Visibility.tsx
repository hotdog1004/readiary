import { useFormContext } from 'react-hook-form'
import { AddBookFormValues } from '../types/formTypes'
import { FormLayout } from '@/shared/ui/formLayout'
import { Button } from '@/shared/ui/button'
import { useStepNavigationContext } from '../models/StepNavigationContextValue'
import { RHFCheckbox } from '@/shared/ui/formField/rhf'

export const Visibility = () => {
  const {
    control,
    formState: { errors },
    trigger,
    handleSubmit,
  } = useFormContext<AddBookFormValues>()

  const { onBack } = useStepNavigationContext()

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
        <Button size="small" type="submit" form="visibility-form">
          제출
        </Button>
      </div>
    </>
  )
}
