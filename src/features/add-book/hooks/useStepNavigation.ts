import { useState, useCallback, useMemo } from 'react'
import { Step } from '../types'
import { stepOrder } from '../constants'

export const useStepNavigation = (initialStep: Step = Step.BasicInfo) => {
  const [currentStep, setCurrentStep] = useState<Step>(initialStep)

  const currentIndex = useMemo(() => stepOrder.indexOf(currentStep), [currentStep])

  const isFirstStep = currentIndex === 0
  const isLastStep = currentIndex === stepOrder.length - 1

  const goToNext = useCallback(() => {
    if (!isLastStep) {
      setCurrentStep(stepOrder[currentIndex + 1])
    }
  }, [currentIndex, isLastStep])

  const goToPrevious = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }, [currentIndex, isFirstStep])

  return {
    currentStep,
    onNext: goToNext,
    onBack: goToPrevious,
  }
}
