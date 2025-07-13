import styled from '@emotion/styled'

export const TextareaWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-start;
`

export const StyledTextarea = styled.textarea<{ error?: boolean }>`
  display: flex;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.grayLight)};
  background: ${({ theme }) => theme.colors.white};
  padding: 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition: border 0.2s;
  box-sizing: border-box;
  resize: none;
  min-height: 6rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayLight};
    opacity: 1;
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.black)};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: ${({ theme }) => theme.colors.background};
  }
`
