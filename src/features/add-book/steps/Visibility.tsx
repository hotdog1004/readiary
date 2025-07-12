import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { VisibilityFormValues } from '../types/formTypes'
import { VisibilitySchema } from '../schemas'
import { FormLayout } from '@/shared/ui/formLayout'
import { FormField } from '@/shared/ui/formField'
import { Checkbox } from '@/shared/ui/checkbox'
import { Button } from '@/shared/ui/button'

interface VisibilityProps {
  initialValues?: VisibilityFormValues
  onComplete: (data: VisibilityFormValues) => void
  onBack: () => void
}

export const Visibility = ({ initialValues, onComplete, onBack }: VisibilityProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VisibilityFormValues>({
    resolver: zodResolver(VisibilitySchema),
    defaultValues: initialValues || {
      isPublic: true,
    },
    mode: 'onTouched',
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const onSubmit = (data: VisibilityFormValues) => {
    onComplete(data)
  }

  return (
    <>
      <FormLayout id="visibility-form" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="공개 여부"
          error={errors.isPublic?.message}
          helperText="체크하면 다른 사용자에게 공개됩니다."
        >
          <Controller
            name="isPublic"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} onChange={field.onChange} label="공개" />
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
        <Button size="small" type="submit" form="visibility-form">
          제출
        </Button>
      </div>
    </>
  )
}
