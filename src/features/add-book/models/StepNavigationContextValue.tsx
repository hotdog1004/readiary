import { createContext, useContext, ReactNode } from 'react'
import { Step } from '../types'

interface StepNavigationContextValue {
  currentStep: Step
  onNext: () => void
  onBack: () => void
}

const StepNavigationContext = createContext<StepNavigationContextValue | null>(null)

interface StepNavigationProviderProps {
  children: ReactNode
  value: StepNavigationContextValue
}

export const StepNavigationProvider = ({ children, value }: StepNavigationProviderProps) => {
  return <StepNavigationContext.Provider value={value}>{children}</StepNavigationContext.Provider>
}

export const useStepNavigationContext = () => {
  const context = useContext(StepNavigationContext)
  if (!context) {
    throw new Error('useStepNavigationContext must be used within StepNavigationProvider')
  }
  return context
}
