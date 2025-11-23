import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddBookFormValues } from '../types'
import { AddBookSchema } from '../schemas'

export const useAddBookForm = (
  initialValues?: Partial<AddBookFormValues>,
): UseFormReturn<AddBookFormValues> => {
  return useForm<AddBookFormValues>({
    resolver: zodResolver(AddBookSchema),
    defaultValues: {
      // BasicInfo
      title: initialValues?.title ?? '',
      author: initialValues?.author ?? '',
      totalPages: initialValues?.totalPages ?? 0,
      publishedDate: initialValues?.publishedDate ?? '',
      status: initialValues?.status,
      startDate: initialValues?.startDate,
      endDate: initialValues?.endDate,

      // Rating
      isRecommended: initialValues?.isRecommended ?? false,
      rating: initialValues?.rating ?? 0,

      // Review
      review: initialValues?.review ?? '',

      // Quote
      quotePage: initialValues?.quotePage ?? 0,
      quoteText: initialValues?.quoteText ?? '',

      // Visibility
      isPublic: initialValues?.isPublic ?? true,
    },
    mode: 'onTouched',
  })
}
