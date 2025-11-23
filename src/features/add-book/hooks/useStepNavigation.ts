import { useRouter } from 'next/router'
import { getCurrentStep, getNextStep, getPreviousStep, goToStep } from '../utils'

export const useStepNavigation = () => {
  const router = useRouter()

  const onNext = () => {
    const currentStep = getCurrentStep(router.query)
    const nextStep = getNextStep(currentStep)
    if (nextStep) {
      goToStep(router, nextStep)
    }
  }

  const onBack = () => {
    const currentStep = getCurrentStep(router.query)
    const prevStep = getPreviousStep(currentStep)
    if (prevStep) {
      goToStep(router, prevStep)
    }
  }

  return { onNext, onBack }
}
