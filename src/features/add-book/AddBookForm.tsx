import { useState } from 'react'

import { BasicInfo, Quote, Rating, Review, Visibility } from './steps'
import { AllFormValues, FormDataByStep, Step, stepOrder } from './types'
import { StepLayout } from '@/widgets/stepForm/StepLayout'
import { stepConfigs } from './constants/stepConfig'

const AddBookForm = () => {
  const [step, setStep] = useState<Step>(Step.BasicInfo)
  const [formData, setFormData] = useState<FormDataByStep>({})

  const currentIndex = stepOrder.indexOf(step)
  const currentStepConfig = stepConfigs[step]

  const handleStepComplete = (stepKey: Step, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: data, // stepId(key)로 저장
    }))

    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1])
    } else {
      handleSubmit()
    }
  }

  const getFinalPayload = (formData: FormDataByStep): AllFormValues => {
    // 각 스텝의 데이터를 평평하게 합치기
    return {
      ...formData[Step.BasicInfo],
      ...formData[Step.Rating],
      ...formData[Step.Review],
      ...formData[Step.Quote],
      ...formData[Step.Visibility],
    } as AllFormValues
  }

  const handleSubmit = () => {
    const finalPayload = getFinalPayload(formData)
    // TODO: API 호출
    console.log('최종 제출 데이터:', finalPayload)
  }

  const handleBack = () => {
    if (currentIndex > 0) setStep(stepOrder[currentIndex - 1])
  }

  const renderStep = () => {
    switch (step) {
      case Step.BasicInfo:
        return (
          <BasicInfo
            initialValues={formData[Step.BasicInfo]}
            onComplete={(data) => handleStepComplete(Step.BasicInfo, data)}
          />
        )
      case Step.Rating:
        return (
          <Rating
            initialValues={formData[Step.Rating]}
            onComplete={(data) => handleStepComplete(Step.Rating, data)}
            onBack={handleBack}
          />
        )
      case Step.Review:
        return (
          <Review
            initialValues={formData[Step.Review]}
            rating={formData[Step.Rating]?.rating ?? 0}
            onComplete={(data) => handleStepComplete(Step.Review, data)}
            onBack={handleBack}
          />
        )
      case Step.Quote:
        return (
          <Quote
            initialValues={formData[Step.Quote]}
            totalPages={formData[Step.BasicInfo]?.totalPages ?? 1}
            onComplete={(data) => handleStepComplete(Step.Quote, data)}
            onBack={() => setStep(stepOrder[currentIndex - 1])}
          />
        )
      case Step.Visibility:
        return (
          <Visibility
            initialValues={formData[Step.Visibility]}
            onComplete={(data) => handleStepComplete(Step.Visibility, data)}
            onBack={() => setStep(stepOrder[currentIndex - 1])}
          />
        )
      default:
        return null
    }
  }
  return (
    <StepLayout title={currentStepConfig.label} description={currentStepConfig.description}>
      {renderStep()}
    </StepLayout>
  )
}
export default AddBookForm
