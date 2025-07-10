import { useState } from 'react'

import {
  BasicInfoFormValues,
  RatingFormValues,
  ReviewFormValues,
  QuoteFormValues,
  VisibilityFormValues,
} from './types/formTypes'

import { Step, stepOrder } from './types/step'
import { BasicInfo, Quote, Rating, Review, Visibility } from './steps'

const AddBookForm = () => {
  const [step, setStep] = useState<Step>(Step.BasicInfo)
  const currentIndex = stepOrder.indexOf(step)

  const [BasicInfoValues, setBasicInfoValues] = useState<BasicInfoFormValues>({
    title: '',
    author: '',
    status: 'want_to_read',
    startDate: undefined,
    endDate: undefined,
    totalPages: 1,
    publishedDate: '',
  })
  const [RatingValues, setRatingValues] = useState<RatingFormValues>({
    isRecommended: false,
    rating: 0,
  })
  const [ReviewValues, setReviewValues] = useState<ReviewFormValues>({
    review: '',
  })
  const [QuoteValues, setQuoteValues] = useState<QuoteFormValues>({
    quotePage: 0,
    quoteText: '',
  })
  const [VisibilityValues, setVisibilityValues] = useState<VisibilityFormValues>({
    isPublic: false,
  })
  const handleBack = () => {
    if (currentIndex > 0) setStep(stepOrder[currentIndex - 1])
  }

  const handleNext = () => {
    if (currentIndex < stepOrder.length - 1) setStep(stepOrder[currentIndex + 1])
  }
  // BasicInfo 완료 시
  const handleBasicInfoNext = (data: BasicInfoFormValues) => {
    setBasicInfoValues(data)
    handleNext()
  }
  // Rating 완료 시
  const handleRatingNext = (data: RatingFormValues) => {
    setRatingValues(data)
    handleNext()
  }
  // Review 완료 시
  const handleReviewNext = (data: ReviewFormValues) => {
    setReviewValues(data)
    handleNext()
  }
  // Quote 완료 시
  const handleQuoteNext = (data: QuoteFormValues) => {
    setQuoteValues(data)
    handleNext()
  }
  // Visibility 완료 시 (최종 제출)
  const handleVisibilityNext = (data: VisibilityFormValues) => {
    setVisibilityValues(data)
    // 모든 단계 데이터 합치기
    const finalData = {
      ...BasicInfoValues,
      ...RatingValues,
      ...ReviewValues,
      ...QuoteValues,
      ...data,
    }
    console.log('최종 제출 데이터:', finalData)
    // TODO: API submit
  }

  switch (step) {
    case Step.BasicInfo:
      return <BasicInfo defaultValues={BasicInfoValues} onNext={handleBasicInfoNext} />
    case Step.Rating:
      return <Rating defaultValues={RatingValues} onNext={handleRatingNext} onBack={handleBack} />
    case Step.Review:
      return (
        <Review
          defaultValues={ReviewValues}
          rating={RatingValues.rating}
          onNext={handleReviewNext}
          onBack={handleBack}
        />
      )
    case Step.Quote:
      return (
        <Quote
          defaultValues={QuoteValues}
          totalPages={BasicInfoValues.totalPages}
          onNext={handleQuoteNext}
          onBack={handleBack}
        />
      )
    case Step.Visibility:
      return (
        <Visibility
          defaultValues={VisibilityValues}
          onNext={handleVisibilityNext}
          onBack={handleBack}
        />
      )
    default:
      return null
  }
}
export default AddBookForm
