import styled from '@emotion/styled'

export const FormWrapper = styled.form`
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`

export const FormRow = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${({ columns = 2 }) => columns}, 1fr);
  gap: ${({ gap = '1.5rem' }) => gap};
  width: 100%;
`
