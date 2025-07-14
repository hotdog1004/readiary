import styled from '@emotion/styled'

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  font-family: inherit;
`

export const SelectBox = styled.div<{ disabled?: boolean; error?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.grayLight)};

  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.white};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  outline: none;
  transition: all 0.2s ease;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2.5rem;
  box-sizing: border-box;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.black)};
  }

  &[data-state='open'] {
    border-color: ${({ theme }) => theme.colors.black};
  }
`

export const SelectValue = styled.span`
  flex: 1;
  line-height: 1;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};

  &[data-placeholder='true'] {
    color: ${({ theme }) => theme.colors.grayLight};
  }
  &[data-placeholder='false'] {
    color: ${({ theme }) => theme.colors.text};
  }
`

export const SelectIcon = styled.svg<{ isOpen?: boolean }>`
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  transition: transform 0.2s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  color: ${({ theme }) => theme.colors.gray};
`

export const OptionsList = styled.ul<{ open: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0.25rem 0 0 0;
  padding: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.grayLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.white};
  list-style: none;
  max-height: 15rem;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: ${({ open }) => (open ? 'block' : 'none')};
  animation: ${({ open }) => (open ? 'selectSlideDown 0.2s ease-out' : 'none')};

  @keyframes selectSlideDown {
    from {
      opacity: 0;
      transform: translateY(-0.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::-webkit-scrollbar {
    width: 0.2rem;
  }

  &::-webkit-scrollbar-track {
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grayLight};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
  }
`

export const OptionItem = styled.li<{ isFocused?: boolean }>`
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  background: 'transparent';
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: all 0.15s ease;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover:not([data-disabled]) {
    background: ${({ theme }) => theme.colors.background};
  }

  &:focus-visible {
    outline: none;
    background: ${({ theme }) => theme.colors.background};
  }

  ${({ isFocused, theme }) =>
    isFocused &&
    `
    background: ${theme.colors.background};
    outline: none;
  `}

  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const OptionText = styled.span`
  flex: 1;
`

export const OptionCheck = styled.span<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.primary : 'transparent')};
  transition: color 0.15s ease;
`
