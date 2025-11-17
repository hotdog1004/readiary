import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BasicInfoFormValues } from '../types/formTypes'
import { BOOK_STATUS_LABELS, BOOK_STATUS_VALUES, BookStatus } from '@/shared/types/book'
import { BasicInfoSchema } from '../schemas'
import { FormLayout, FormRow } from '@/shared/ui/formLayout'
import { FormField } from '@/shared/ui/formField'
import { NumberField, TextField } from '@/shared/ui/textField'
import { DatePicker } from '@/shared/ui/datePicker'
import { Select } from '@/shared/ui/select'
import { Button } from '@/shared/ui/button'
import { formatDateString, hasError, isEmptyValue } from '../utils'
import { RHFTextField } from '@/shared/ui/formField/rhf/RHFTextField'
import { RHFDatePicker } from '@/shared/ui/formField/rhf/RHFDatePicker'

interface BasicInfoProps {
  initialValues?: BasicInfoFormValues //  상위에서 전달받은 이전 값
  onNext: (data: BasicInfoFormValues) => void
}

const statusOptions = BOOK_STATUS_VALUES.map((value) => ({
  value,
  label: BOOK_STATUS_LABELS[value],
}))

export const BasicInfo = ({ initialValues, onNext }: BasicInfoProps) => {
  /**
   * - useForm, 상태, 에러, 검증 모두 Step 내부에서만 관리
   * - 상위는 onComplete로 결과만 받음
   */
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<BasicInfoFormValues>({
    resolver: zodResolver(BasicInfoSchema),
    // TODO: 폼 데이터 로드 로직을 관리하는 커스텀 훅 구현 후 각 스텝 폼에서 사용하는 방식으로 변경
    defaultValues: initialValues || {
      title: '',
      author: '',
      status: undefined,
      startDate: '',
      endDate: '',
      totalPages: 0,
      publishedDate: '',
    },
    mode: 'onTouched',
  })

  const status = watch('status')

  const onSubmit = (data: BasicInfoFormValues) => {
    onNext(data) // 상위에 결과만 전달
  }
  return (
    <>
      <FormLayout id="basic-info-form" onSubmit={handleSubmit(onSubmit)}>
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

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormField
                label="상태"
                required
                errorMessage={errors.status?.message}
                helperMessage={
                  isEmptyValue(field.value) && !hasError(errors.status)
                    ? '독서 상태를 선택해 주세요.'
                    : undefined
                }
              >
                <Select
                  error={hasError(errors.status)}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value)
                    trigger()
                  }}
                  options={statusOptions}
                  placeholder="상태를 선택하세요."
                />
              </FormField>
            )}
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
          <Controller
            name="totalPages"
            control={control}
            render={({ field }) => (
              <FormField
                label="도서 전체 페이지 수"
                required
                errorMessage={errors.totalPages?.message}
                helperMessage={
                  isEmptyValue(field.value) && !hasError(errors.totalPages)
                    ? '전체 페이지 수를 입력해 주세요.'
                    : undefined
                }
              >
                <NumberField
                  {...field}
                  error={hasError(errors.totalPages)}
                  placeholder="307"
                  min={1}
                />
              </FormField>
            )}
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
