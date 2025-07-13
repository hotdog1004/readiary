import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { VisibilityFormValues } from '../types/formTypes'
import { VisibilitySchema } from '../schemas'

interface VisibilityProps {
  initialValues?: VisibilityFormValues
  onComplete: (data: VisibilityFormValues) => void
  onBack: () => void
}

export const Visibility = ({ initialValues, onComplete, onBack }: VisibilityProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VisibilityFormValues>({
    resolver: zodResolver(VisibilitySchema),
    defaultValues: initialValues || {
      isPublic: true,
    },
    mode: 'onTouched',
  })

  const onSubmit = (data: VisibilityFormValues) => {
    onComplete(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
