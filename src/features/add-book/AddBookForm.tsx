import { useState } from 'react'

import {
  BasicInfoFormValues,
  RatingFormValues,
  ReviewFormValues,
  QuoteFormValues,
  VisibilityFormValues,
  AllFormValues,
} from './types/formTypes'

import { Step, stepOrder } from './types/step'
import { BasicInfo, Quote, Rating, Review, Visibility } from './steps'

const AddBookForm = () => {
  // 1. 현재 Step만 관리
  const [step, setStep] = useState<Step>(Step.BasicInfo)
  const currentIndex = stepOrder.indexOf(step)

  // 2. 모든 Step의 결과를 누적할 formData (각 Step의 결과만 저장)
  const [formData, setFormData] = useState<Partial<AllFormValues>>({})

  // 3. Step 완료 시 결과만 누적
  const handleStepComplete = (stepKey: Step, data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1])
    } else {
      // 마지막 Step(Visibility) 완료 시
      const finalData: AllFormValues = {
        ...formData,
        ...data,
      } as AllFormValues
      // API 호출 등 최종 제출
      console.log('최종 제출 데이터:', finalData)
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) setStep(stepOrder[currentIndex - 1])
  }

  switch (step) {
    case Step.BasicInfo:
      return (
        <BasicInfo
          initialValues={formData as BasicInfoFormValues}
          onComplete={(data) => handleStepComplete(Step.BasicInfo, data)}
        />
      )
    case Step.Rating:
      return (
        <Rating
          initialValues={formData as RatingFormValues}
          onComplete={(data) => handleStepComplete(Step.Rating, data)}
          onBack={handleBack}
        />
      )
    case Step.Review:
      return (
        <Review
          initialValues={formData as ReviewFormValues}
          rating={formData.rating ?? 0}
          onComplete={(data) => handleStepComplete(Step.Review, data)}
          onBack={handleBack}
        />
      )
    case Step.Quote:
      return (
        <Quote
          initialValues={formData as QuoteFormValues}
          totalPages={formData.totalPages ?? 1}
          onComplete={(data) => handleStepComplete(Step.Quote, data)}
          onBack={() => setStep(stepOrder[currentIndex - 1])}
        />
      )
    case Step.Visibility:
      return (
        <Visibility
          initialValues={formData as VisibilityFormValues}
          onComplete={(data) => handleStepComplete(Step.Visibility, data)}
          onBack={() => setStep(stepOrder[currentIndex - 1])}
        />
      )
    default:
      return null
  }
}
export default AddBookForm
