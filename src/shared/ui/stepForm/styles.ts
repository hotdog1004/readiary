import styled from '@emotion/styled'

export const StepWrapper = styled.div`
  max-width: 750px;
  margin: 0 auto;
  padding: 2rem;
`

export const StepHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`

export const StepTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`

export const StepDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.5;
`

export const StepContent = styled.div`
  min-height: 500px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
  display: flex;
  flex-direction: column;
  justify-content: center; // 세로 가운데
  align-items: center; // 가로 가운데
  width: 100%;
`
