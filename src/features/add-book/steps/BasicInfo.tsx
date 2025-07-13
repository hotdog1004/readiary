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
import { hasError } from '../utils'

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
   */
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BasicInfoFormValues>({
    resolver: zodResolver(BasicInfoSchema),
    // TODO: 폼 데이터 로드 로직을 관리하는 커스텀 훅 구현 후 각 스텝 폼에서 사용하는 방식으로 변경
    defaultValues: initialValues || {
      title: '',
      author: '',
      status: undefined,
      startDate: '',
      endDate: '',
      totalPages: undefined,
      publishedDate: '',
    },
    mode: 'onChange', // 변경될 때마다 유효성 검증 실행하기 위해 처리
  })

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
            errorMessage={errors.title?.message}
            helperText="제목을 입력해 주세요."
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={hasError(errors.title)}
                  placeholder="모순"
                  onClear={() => field.onChange('')}
                />
              )}
            />
          </FormField>

          <FormField
            label="저자"
            required
            errorMessage={errors.author?.message}
            helperText="저자를 입력해 주세요."
          >
            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={hasError(errors.author)}
                  placeholder="양귀자"
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
            errorMessage={errors.publishedDate?.message}
            helperText="출판일을 선택해 주세요."
          >
            <Controller
              name="publishedDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString().split('T')[0])}
                  error={hasError(errors.publishedDate)}
                  placeholder="2013.04.01"
                />
              )}
            />
          </FormField>

          <FormField
            label="상태"
            required
            errorMessage={errors.status?.message}
            helperText="독서 상태를 선택해 주세요."
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  error={hasError(errors.status)}
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
            errorMessage={errors.startDate?.message}
            helperText="독서 시작일을 선택해 주세요."
          >
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString().split('T')[0])}
                  error={hasError(errors.startDate)}
                  disabled={status === 'want_to_read'}
                  placeholder="2025.07.01"
                />
              )}
            />
          </FormField>
          <FormField
            label="종료일"
            errorMessage={errors.endDate?.message}
            helperText={status === 'on_hold' ? undefined : '독서 종료일 선택해 주세요'}
          >
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString().split('T')[0])}
                  error={hasError(errors.endDate)}
                  disabled={
                    status === 'want_to_read' || status === 'on_hold' || status === 'reading'
                  }
                  placeholder="2025.07.10"
                />
              )}
            />
          </FormField>
        </FormRow>

        <FormField
          label="도서 전체 페이지 수"
          required
          errorMessage={errors.totalPages?.message}
          helperText="전체 페이지 수를 입력해 주세요."
        >
          <Controller
            name="totalPages"
            control={control}
            render={({ field }) => (
              <NumberField
                {...field}
                error={hasError(errors.totalPages)}
                placeholder="307"
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
