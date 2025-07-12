import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BasicInfoFormValues } from '../types/formTypes'
import { BOOK_STATUS_LABELS, BOOK_STATUS_VALUES } from '@/shared/types/book'
import { BasicInfoSchema } from '../schemas'
import { FormField } from '@/shared/ui/formField'
import { NumberField, TextField } from '@/shared/ui/textField'
import { DatePicker } from '@/shared/ui/datePicker'
import { Select } from '@/shared/ui/select'
import { Button } from '@/shared/ui/button'
import { FormLayout, FormRow } from '@/shared/ui/formLayout'

interface BasicInfoProps {
  initialValues?: BasicInfoFormValues //  상위에서 전달받은 이전 값
  onComplete: (data: BasicInfoFormValues) => void
}

const statusOptions = BOOK_STATUS_VALUES.map((value) => ({
  value,
  label: BOOK_STATUS_LABELS[value],
}))

export const BasicInfo = ({ initialValues, onComplete }: BasicInfoProps) => {
  /**
   * - useForm, 상태, 에러, 검증 모두 Step 내부에서만 관리
   * - 상위는 onComplete로 결과만 받음
   * - initialValues가 바뀌면 reset으로 RHF 상태 동기화
   */
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<BasicInfoFormValues>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: initialValues || {
      title: '',
      author: '',
      status: 'want_to_read',
      startDate: undefined,
      endDate: undefined,
      totalPages: 1,
      publishedDate: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const status = watch('status')

  const onSubmit = (data: BasicInfoFormValues) => {
    onComplete(data) // 상위에 결과만 전달
  }
  return (
    <>
      <FormLayout id="basic-info-form" onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <FormField
            label="제목"
            required
            error={errors.title?.message}
            helperText="책의 제목을 입력해주세요."
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.title}
                  placeholder="책 제목을 입력하세요."
                  onClear={() => field.onChange('')}
                />
              )}
            />
          </FormField>

          <FormField
            label="저자"
            required
            error={errors.author?.message}
            helperText="책의 저자를 입력해주세요"
          >
            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.author}
                  placeholder="저자명을 입력하세요."
                  onClear={() => field.onChange('')}
                />
              )}
            />
          </FormField>
        </FormRow>

        <FormRow>
          <FormField
            label="도서 출판일"
            required
            error={errors.publishedDate?.message}
            helperText="책의 출판일을 선택해주세요."
          >
            <Controller
              name="publishedDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString().split('T')[0])}
                  error={!!errors.publishedDate}
                  placeholder="출판일을 선택하세요"
                />
              )}
            />
          </FormField>

          <FormField
            label="상태"
            required
            error={errors.status?.message}
            helperText="현재 읽고 있는 상태를 선택해주세요."
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  options={statusOptions}
                  placeholder="상태를 선택하세요."
                />
              )}
            />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField
            label="시작일"
            error={errors.startDate?.message}
            helperText="읽기 시작한 날짜를 선택해주세요."
          >
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString().split('T')[0])}
                  error={!!errors.startDate}
                  disabled={status === 'want_to_read'}
                  placeholder="시작일을 선택하세요."
                />
              )}
            />
          </FormField>
          <FormField
            label="종료일"
            error={errors.endDate?.message}
            helperText="읽기를 완료한 날짜를 선택해주세요."
          >
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString().split('T')[0])}
                  error={!!errors.endDate}
                  disabled={status === 'want_to_read' || status === 'reading'}
                  placeholder="종료일을 선택하세요."
                />
              )}
            />
          </FormField>
        </FormRow>

        <FormField
          label="도서 전체 페이지 수"
          required
          error={errors.totalPages?.message}
          helperText="책의 총 페이지 수를 입력해주세요."
        >
          <Controller
            name="totalPages"
            control={control}
            render={({ field }) => (
              <NumberField
                {...field}
                error={!!errors.totalPages}
                placeholder="페이지 수를 입력하세요."
                min={1}
              />
            )}
          />
        </FormField>
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
