import { useState } from 'react'
import { BasicInfo, Quote, Rating, Review, Visibility } from './steps'
import { FormDataByStep, FormState, Step } from './types'
import { stepOrder } from './constants'

const AddBookForm = () => {
  const [stepFormState, setStepFormState] = useState<FormState>({
    step: Step.BasicInfo,
    formData: {},
  })

  const currentIndex = stepOrder.indexOf(stepFormState.step)

  const handleNext = <T extends Step>(stepKey: T, data: FormDataByStep[T]) => {
    saveStepFormData(stepKey, data)

    if (currentIndex < stepOrder.length - 1) {
      setStepFormState((prev) => ({
        ...prev,
        step: stepOrder[currentIndex + 1],
      }))
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setStepFormState((prev) => ({
        ...prev,
        step: stepOrder[currentIndex - 1],
      }))
    }
  }

  const saveStepFormData = <T extends Step>(stepKey: T, data: FormDataByStep[T]) => {
    setStepFormState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [stepKey]: data },
    }))
  }

  const handleComplete = <T extends Step>(stepKey: T, data: FormDataByStep[T]) => {
    saveStepFormData(stepKey, data)
    handleSubmit()
  }

  const getFinalPayload = () => {
    return stepOrder.reduce((finalPayload, stepKey) => {
      const stepFormData = stepFormState.formData[stepKey]
      if (stepFormData) {
        return { ...finalPayload, ...stepFormData }
      }
      return finalPayload
    }, {})
  }

  const handleSubmit = () => {
    const finalPayload = getFinalPayload()
    // TODO: API 호출
    console.log('최종 제출 데이터:', finalPayload)
  }

  // TODO: 각 step form layout 적용(stepConfigs의 title, description 적용)
  switch (stepFormState.step) {
    case Step.BasicInfo:
      return (
        <BasicInfo
          initialValues={stepFormState.formData[Step.BasicInfo]}
          onComplete={(data) => handleNext(Step.BasicInfo, data)}
        />
      )
    case Step.Rating:
      return (
        <Rating
          initialValues={stepFormState.formData[Step.Rating]}
          onComplete={(data) => handleNext(Step.Rating, data)}
          onBack={handleBack}
        />
      )
    case Step.Review:
      return (
        <Review
          initialValues={stepFormState.formData[Step.Review]}
          rating={stepFormState.formData[Step.Rating]?.rating ?? 0}
          onComplete={(data) => handleNext(Step.Review, data)}
          onBack={handleBack}
        />
      )
    case Step.Quote:
      return (
        <Quote
          initialValues={stepFormState.formData[Step.Quote]}
          totalPages={stepFormState.formData[Step.BasicInfo]?.totalPages ?? 1}
          onComplete={(data) => handleNext(Step.Quote, data)}
          onBack={handleBack}
        />
      )
    case Step.Visibility:
      return (
        <Visibility
          initialValues={stepFormState.formData[Step.Visibility]}
          onComplete={(data) => handleComplete(Step.Visibility, data)}
          onBack={handleBack}
        />
      )
    default:
      return null
  }
}
export default AddBookForm
