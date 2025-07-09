import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Step5FormValues } from '../types/formTypes'
import { step5Schema } from '../schemas/stepSchemas'

interface Step5Props {
  defaultValues: Step5FormValues
  onNext: (data: Step5FormValues) => void
  onBack: () => void
}

export const Step5: FC<Step5Props> = ({ defaultValues, onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step5FormValues>({
    resolver: zodResolver(step5Schema),
    defaultValues,
    mode: 'onTouched',
  })

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <div>
        <label>
          <input type="checkbox" {...register('isPublic')} />
          공개 여부(체크 시 공개)
        </label>
        {errors.isPublic && <span>{errors.isPublic.message}</span>}
      </div>
      <button type="button" onClick={onBack}>
        이전
      </button>
      <button type="submit">제출</button>
    </form>
  )
}
