import styled from '@emotion/styled'

export const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`

export const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-weight: 600;
`

export const MessageContainer = styled.div`
  min-height: 1.125rem;
  display: flex;
  align-items: flex-start;
`

export const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger};
  line-height: 1.125rem;
`

export const HelperMessage = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.125rem;
`
