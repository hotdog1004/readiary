import { useFormContext } from 'react-hook-form'
import { AddBookFormValues } from '../types/formTypes'
import { FormLayout, FormRow } from '@/shared/ui/formLayout'
import { Button } from '@/shared/ui/button'
import { RHFDatePicker, RHFNumberField, RHFTextField } from '@/shared/ui/formField/rhf'
import { BOOK_STATUS_LABELS, BOOK_STATUS_VALUES } from '@/shared/types'
import { useStepNavigationContext } from '../models/StepNavigationContextValue'
import { FormEvent } from 'react'
import { RHFSelect } from '@/shared/ui/formField/rhf/RHFSelect'

const statusOptions = BOOK_STATUS_VALUES.map((value) => ({
  value,
  label: BOOK_STATUS_LABELS[value],
}))

export const BasicInfo = () => {
  const {
    control,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext<AddBookFormValues>()

  const { onNext } = useStepNavigationContext()

  const status = watch('status')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const fields: (keyof AddBookFormValues)[] = [
      'title',
      'author',
      'totalPages',
      'publishedDate',
      'status',
      'startDate',
      'endDate',
    ]

    const isValid = await trigger(fields)
    if (isValid) {
      onNext()
    }
  }

  return (
    <>
      <FormLayout id="basic-info-form" onSubmit={handleSubmit}>
        <FormRow>
          <RHFTextField
            control={control}
            name="title"
            error={errors.title}
            label="제목"
            required
            helperMessage="제목을 입력해 주세요."
            placeholder="모순"
          />
          <RHFTextField
            control={control}
            name="author"
            error={errors.author}
            label="저자"
            required
            helperMessage="저자를 입력해 주세요."
            placeholder="양귀자"
          />
        </FormRow>

        <FormRow>
          <RHFDatePicker
            control={control}
            name="publishedDate"
            error={errors.publishedDate}
            label="도서 출판일"
            required
            helperMessage="출판일을 선택해 주세요."
            placeholder="yyyy.MM.dd"
            onTrigger={trigger}
          />

          <RHFSelect
            control={control}
            name="status"
            error={errors.status}
            label="상태"
            required
            helperMessage="독서 상태를 선택해 주세요."
            options={statusOptions}
            placeholder="상태를 선택하세요."
            onTrigger={trigger}
          />
        </FormRow>
        <FormRow>
          <RHFDatePicker
            control={control}
            name="startDate"
            error={errors.startDate}
            label="시작일"
            helperMessage={status !== 'want_to_read' ? '독서 시작일을 선택해 주세요.' : undefined}
            placeholder="yyyy.MM.dd"
            onTrigger={trigger}
          />

          <RHFDatePicker
            control={control}
            name="endDate"
            error={errors.endDate}
            label="종료일"
            helperMessage={status === 'finished' ? '독서 종료일을 선택해 주세요.' : undefined}
            placeholder="yyyy.MM.dd"
            onTrigger={trigger}
          />
        </FormRow>
        <FormRow>
          <RHFNumberField
            control={control}
            name="totalPages"
            error={errors.totalPages}
            label="도서 전체 페이지 수"
            required
            helperMessage="전체 페이지 수를 입력해 주세요."
            placeholder="307"
            min={1}
          />
        </FormRow>
      </FormLayout>
      {/* TODO: 버튼 form 외부로 분리 */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Button size="small" type="submit" form="basic-info-form">
          다음
        </Button>
      </div>
    </>
  )
}
