import styled from '@emotion/styled'

export const RangeWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const Track = styled.div<{ $progress: number }>`
  position: relative;
  width: 100%;
  height: 0.375rem;
  background: ${({ theme }) => theme.colors.grayLighter};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ $progress }) => $progress}%;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`

export const StyledRange = styled.input`
  position: absolute;
  top: -0.625rem;
  width: 100%;
  -webkit-appearance: none;
  background: none;
  pointer-events: none;

  &::-webkit-slider-thumb {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
    -webkit-appearance: none;
    pointer-events: auto;
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadows.small};
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &::-webkit-slider-track {
    height: 0.375rem;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    background: transparent;
  }

  &::-moz-range-thumb {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadows.small};
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  &::-moz-range-thumb:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &::-moz-range-track {
    height: 0.375rem;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    background: transparent;
    border: none;
  }

  &:focus-visible {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const ValueDisplay = styled.div`
  min-width: 3.25rem;
  padding: 0.25rem 0.5rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grayLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  font-weight: 500;
`
