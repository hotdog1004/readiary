import { ReactNode } from 'react'

export interface SwitchCasesProps<T extends string | number> {
  value: T
  cases: Record<T, ReactNode>
  defaultCase?: ReactNode
}
