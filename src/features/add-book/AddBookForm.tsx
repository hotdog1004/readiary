import { BasicInfo, Quote, Rating, Review, Visibility } from './steps'
import { Step } from './types'
import { stepConfigs } from './constants'
import { StepLayout } from '@/shared/ui/stepForm/StepLayout'
import { SwitchCases } from '@/shared/ui/switchCases'
import { useAddBookForm } from './hooks/useAddBookForm'
import { FormProvider } from 'react-hook-form'
import { useRouter } from 'next/router'
import { getCurrentStep } from './utils/step/stepNavigation'

const AddBookForm = () => {
  const form = useAddBookForm()
  const router = useRouter()

  const currentStep = getCurrentStep(router.query)
  const currentStepConfig = stepConfigs[currentStep]

  return (
    <FormProvider {...form}>
      <StepLayout title={currentStepConfig.title} description={currentStepConfig.description}>
        <SwitchCases
          value={currentStep}
          cases={{
            [Step.BasicInfo]: <BasicInfo />,
            [Step.Rating]: <Rating />,
            [Step.Review]: <Review />,
            [Step.Quote]: <Quote />,
            [Step.Visibility]: <Visibility />,
          }}
        />
      </StepLayout>
    </FormProvider>
  )
}

export default AddBookForm
