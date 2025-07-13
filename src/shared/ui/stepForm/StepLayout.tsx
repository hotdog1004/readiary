import React from 'react'
import { StepWrapper, StepHeader, StepTitle, StepDescription, StepContent } from './styles'

interface StepLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export const StepLayout = ({ title, description, children, className }: StepLayoutProps) => {
  return (
    <StepWrapper className={className}>
      <StepHeader>
        <StepTitle>{title}</StepTitle>
        {description && <StepDescription>{description}</StepDescription>}
      </StepHeader>
      <StepContent>{children}</StepContent>
    </StepWrapper>
  )
}
