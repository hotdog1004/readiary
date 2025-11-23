import { NextRouter } from 'next/router'
import { stepOrder } from '../../constants'
import { Step } from '../../types'

const STEP_QUERY_KEY = 'step'

export const getCurrentStep = (query: NextRouter['query']): Step => {
  const queryStep = query[STEP_QUERY_KEY] as Step | undefined
  return queryStep && stepOrder.includes(queryStep) ? queryStep : Step.BasicInfo
}

export const goToStep = (router: NextRouter, step: Step) => {
  router.push(
    {
      pathname: router.pathname,
      query: { ...router.query, [STEP_QUERY_KEY]: step },
    },
    undefined,
    { shallow: true },
  )
}

export const getNextStep = (currentStep: Step): Step | null => {
  const currentIndex = stepOrder.indexOf(currentStep)
  const nextIndex = currentIndex + 1
  return nextIndex < stepOrder.length ? stepOrder[nextIndex] : null
}

export const getPreviousStep = (currentStep: Step): Step | null => {
  const currentIndex = stepOrder.indexOf(currentStep)
  const prevIndex = currentIndex - 1
  return prevIndex >= 0 ? stepOrder[prevIndex] : null
}
