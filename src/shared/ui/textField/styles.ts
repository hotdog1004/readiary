import styled from '@emotion/styled'
import { Button } from '../button'

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`

export const StyledInput = styled.input`
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => theme.colors.grayLight};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition: border 0.2s;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
    opacity: 1;
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.black};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: ${({ theme }) => theme.colors.background};
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`

export const ClearButtonWrapper = styled.div`
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  height: 100%;
`

export const ClearButton = styled(Button)`
  min-width: 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  border-radius: 50%;
  font-size: 1rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.gray};
  border: none;
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.grayLight};
    color: ${({ theme }) => theme.colors.text};
  }
`
