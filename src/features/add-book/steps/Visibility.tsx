import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { VisibilityFormValues } from '../types/formTypes'
import { VisibilitySchema } from '../schemas/stepSchemas'

interface VisibilityProps {
  defaultValues: VisibilityFormValues
  onNext: (data: VisibilityFormValues) => void
  onBack: () => void
}

export const Visibility: FC<VisibilityProps> = ({ defaultValues, onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VisibilityFormValues>({
    resolver: zodResolver(VisibilitySchema),
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
