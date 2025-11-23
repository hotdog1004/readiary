import { Button } from '@/shared/ui/button'
import { useStepNavigation } from '../hooks/useStepNavigation'
import { useRouter } from 'next/router'
import { getCurrentStep } from '../utils/step/stepNavigation'
import { stepOrder } from '../constants'
import { css } from '@emotion/react'

interface StepNavigationButtonsProps {
  formId: string
}

export const StepNavigationButtons = ({ formId }: StepNavigationButtonsProps) => {
  const router = useRouter()
  const currentStep = getCurrentStep(router.query)
  const { onBack } = useStepNavigation()

  const isFirstStep = currentStep === stepOrder[0]
  const isLastStep = currentStep === stepOrder[stepOrder.length - 1]
  const nextButtonLabel = isLastStep ? '제출' : '다음'

  return (
    <div
      css={css`
        margin-top: 2rem;
        text-align: center;
        display: flex;
        gap: 1rem;
        justify-content: center;
      `}
    >
      {!isFirstStep && (
        <Button size="small" variant="gray" onClick={onBack}>
          이전
        </Button>
      )}
      <Button size="small" type="submit" form={formId}>
        {nextButtonLabel}
      </Button>
    </div>
  )
}
