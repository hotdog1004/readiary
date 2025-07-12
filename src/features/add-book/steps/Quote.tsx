import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { QuoteFormValues } from '../types/formTypes'
import { QuoteSchema } from '../schemas'
import { FormField } from '@/shared/ui/formField'
import { FormLayout } from '@/shared/ui/formLayout'
import { NumberField } from '@/shared/ui/textField'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'

interface QuoteProps {
  initialValues?: QuoteFormValues
  totalPages: number // 도서 전체 페이지 수 (상위에서 전달)
  onComplete: (data: QuoteFormValues) => void // 결과만 상위에 전달
  onBack: () => void
}

export const Quote = ({ initialValues, totalPages, onComplete, onBack }: QuoteProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(QuoteSchema(totalPages)),
    defaultValues: initialValues || {
      quotePage: 0,
      quoteText: '',
    },
    mode: 'onTouched',
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const onSubmit = (data: QuoteFormValues) => {
    onComplete(data)
  }

  return (
    <>
      <FormLayout id="quote-form" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="인용구 페이지 번호"
          required
          error={errors.quotePage?.message}
          helperText={`1 ~ ${totalPages - 1} 페이지 중 선택해주세요.`}
        >
          <Controller
            name="quotePage"
            control={control}
            render={({ field }) => (
              <NumberField
                {...field}
                error={!!errors.quotePage}
                placeholder={`1 ~ ${totalPages - 1}`}
                min={1}
                max={totalPages}
              />
            )}
          />
        </FormField>

        <FormField
          label="인용구"
          required
          error={errors.quoteText?.message}
          helperText="책에서 인상 깊었던 문장을 입력하세요."
        >
          <Controller
            name="quoteText"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                error={!!errors.quoteText}
                placeholder="책에서 인상 깊었던 문장을 입력하세요"
                rows={6}
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
        <Button size="small" type="submit" form="quote-form">
          다음
        </Button>
      </div>
    </>
  )
}
