import { BasicInfo, Quote, Rating, Review, Visibility } from './steps'
import { Step } from './types'
import { stepConfigs, stepOrder } from './constants'
import { StepLayout } from '@/shared/ui/stepForm/StepLayout'
import { SwitchCases } from '@/shared/ui/switchCases'
import { useAddBookForm } from './hooks/useAddBookForm'
import { useStepNavigation } from './hooks/useStepNavigation'
import { FormProvider } from 'react-hook-form'
import { StepNavigationProvider } from './models/StepNavigationContextValue'

const AddBookForm = () => {
  const form = useAddBookForm()
  const stepNavigation = useStepNavigation(Step.BasicInfo)

  const currentStepConfig = stepConfigs[stepNavigation.currentStep]

  return (
    <FormProvider {...form}>
      <StepNavigationProvider value={stepNavigation}>
        <StepLayout title={currentStepConfig.title} description={currentStepConfig.description}>
          <SwitchCases
            value={stepNavigation.currentStep}
            cases={{
              [Step.BasicInfo]: <BasicInfo />,
              [Step.Rating]: <Rating />,
              [Step.Review]: <Review />,
              [Step.Quote]: <Quote />,
              [Step.Visibility]: <Visibility />,
            }}
          />
        </StepLayout>
      </StepNavigationProvider>
    </FormProvider>
  )
}

export default AddBookForm
