import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { QuoteFormValues } from '../types/formTypes'
import { QuoteSchema } from '../schemas'
import { FormField } from '@/shared/ui/formField'
import { FormLayout } from '@/shared/ui/formLayout'
import { NumberField } from '@/shared/ui/textField'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'
import { hasError } from '../utils'
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
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(QuoteSchema(totalPages)),
    defaultValues: initialValues || {
      quotePage: undefined,
      quoteText: '',
    },
    mode: 'onTouched',
  })

  const onSubmit = (data: QuoteFormValues) => {
    onComplete(data)
  }

  return (
    <>
      <FormLayout id="quote-form" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="인용구 페이지 번호"
          required
          errorMessage={errors.quotePage?.message}
          // helperText={`1 ~ ${totalPages - 1} 페이지 중 입력해 주세요.`}
          helperText={`입력 가능 페이지 : 1p - ${totalPages - 1}p`}
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
          helperText="책에서 인상 깊었던 문장을 입력해 주세요."
        >
          <Controller
            name="quoteText"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                error={hasError(errors.quoteText)}
                placeholder="그랬다. 이렇게 살아서는 안 되는 것이었다. 내가 내 삶에 대해 졸렬했다는 것, 나는 이제 인정한다. 지금부터라도 나는 내 생을 유심히 관찰하면서 살아갈 것이다. 되어 가는 대로 놓아두지 않고 적절한 순간, 내 삶의 방향키를 과감하게 돌릴 것이다. 인생은 그냥 받아들이는 것이 아니라 전 생애를 걸고라도 탐구하면서 살아야 하는 무엇이다. 그것이 인생이다."
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
