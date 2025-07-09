import { useState } from 'react'
import { Step1 } from './steps/Step1'
import { Step2 } from './steps/Step2'
import { Step3 } from './steps/Step3'
import { Step4 } from './steps/Step4'
import { Step5 } from './steps/Step5'
import {
  Step1FormValues,
  Step2FormValues,
  Step3FormValues,
  Step4FormValues,
  Step5FormValues,
} from './types/formTypes'

const AddBookForm = () => {
  const [step, setStep] = useState(1)

  // TODO: step 관리 로직 정리
  const [step1Values, setStep1Values] = useState<Step1FormValues>({
    title: '',
    author: '',
    status: 'want_to_read',
    startDate: undefined,
    endDate: undefined,
    totalPages: 1,
    publishedDate: '',
  })
  const [step2Values, setStep2Values] = useState<Step2FormValues>({
    isRecommended: false,
    rating: 0,
  })
  const [step3Values, setStep3Values] = useState<Step3FormValues>({
    review: '',
  })
  const [step4Values, setStep4Values] = useState<Step4FormValues>({
    quotePage: 0,
    quoteText: '',
  })
  const [step5Values, setStep5Values] = useState<Step5FormValues>({
    isPublic: false,
  })

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1))
  }
  // Step1 완료 시
  const handleStep1Next = (data: Step1FormValues) => {
    setStep1Values(data)
    setStep(2)
  }
  // Step2 완료 시
  const handleStep2Next = (data: Step2FormValues) => {
    setStep2Values(data)
    setStep(3)
  }
  // Step3 완료 시
  const handleStep3Next = (data: Step3FormValues) => {
    setStep3Values(data)
    setStep(4)
  }
  // Step4 완료 시
  const handleStep4Next = (data: Step4FormValues) => {
    setStep4Values(data)
    setStep(5)
  }
  // Step5 완료 시 (최종 제출)
  const handleStep5Next = (data: Step5FormValues) => {
    setStep5Values(data)
    // 모든 단계 데이터 합치기
    const finalData = {
      ...step1Values,
      ...step2Values,
      ...step3Values,
      ...step4Values,
      ...data,
    }
    console.log('최종 제출 데이터:', finalData)
    // TODO: API submit
  }

  return (
    <div>
      {step === 1 && <Step1 defaultValues={step1Values} onNext={handleStep1Next} />}
      {step === 2 && (
        <Step2 defaultValues={step2Values} onNext={handleStep2Next} onBack={handleBack} />
      )}
      {step === 3 && (
        <Step3
          defaultValues={step3Values}
          rating={step2Values.rating}
          onNext={handleStep3Next}
          onBack={handleBack}
        />
      )}
      {step === 4 && (
        <Step4
          defaultValues={step4Values}
          totalPages={step1Values.totalPages}
          onNext={handleStep4Next}
          onBack={handleBack}
        />
      )}
      {step === 5 && (
        <Step5 defaultValues={step5Values} onNext={handleStep5Next} onBack={handleBack} />
      )}
    </div>
  )
}
export default AddBookForm
