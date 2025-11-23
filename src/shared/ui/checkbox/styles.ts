import styled from '@emotion/styled'

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
`

export const CheckboxWrapper = styled.div<{ $disabled?: boolean }>`
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`

export const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`

export const CheckboxBox = styled.div<{ $checked?: boolean; $disabled?: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid
    ${({ theme, $checked }) => ($checked ? theme.colors.primary : theme.colors.grayLight)};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme, $checked }) => ($checked ? theme.colors.primary : theme.colors.white)};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  &:hover:not([data-disabled]) {
    border-color: ${({ theme, $checked }) => ($checked ? theme.colors.primary : theme.colors.gray)};
  }

  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`

export const CheckboxIcon = styled.svg<{ $checked?: boolean }>`
  width: 0.875rem;
  height: 0.875rem;
  color: ${({ theme }) => theme.colors.white};
  opacity: ${({ $checked }) => ($checked ? 1 : 0)};
  transition: opacity 0.2s ease;
`

export const CheckboxLabel = styled.label<{ $disabled?: boolean }>`
  font-size: 1rem;
  line-height: 1;
  color: ${({ theme, $disabled }) => ($disabled ? theme.colors.gray : theme.colors.text)};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`
