import styled from '@emotion/styled'
import 'react-datepicker/dist/react-datepicker.css'

export const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;

  .react-datepicker-wrapper {
    width: 100% !important;
  }

  .react-datepicker__input-container {
    width: 100% !important;
  }

  .react-datepicker {
    font-family: inherit;
    border: solid 1px ${({ theme }) => theme.colors.grayLight};
    box-shadow: ${({ theme }) => theme.shadows.small};
    background: ${({ theme }) => theme.colors.white};
  }

  .react-datepicker__header {
    background: ${({ theme }) => theme.colors.white};
    border-bottom: none;
    border-radius: ${({ theme }) => theme.borderRadius.medium}
      ${({ theme }) => theme.borderRadius.medium} 0 0;
    color: ${({ theme }) => theme.colors.white};
  }
  .react-datepicker__day-names {
    display: flex;
    justify-content: center;
    align-items: center;

    .react-datepicker__day-name {
      color: ${({ theme }) => theme.colors.gray};
    }
  }
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker__navigation {
    top: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${({ theme }) => theme.colors.gray};
    border-width: 2px 2px 0 0;
    width: 0.5rem;
    height: 0.5rem;
  }

  .react-datepicker__current-month {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }

  .react-datepicker__day {
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.grayLighter};
    }

    &.react-datepicker__day--selected {
      background: ${({ theme }) => theme.colors.primary} !important;
      color: white !important;
    }
  }

  .react-datepicker__day.react-datepicker__day--keyboard-selected {
    background: ${({ theme }) => theme.colors.primary} !important;
    color: white !important;
  }
`
export const DatePickerContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`
