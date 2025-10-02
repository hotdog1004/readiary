import { SwitchCasesProps } from './types'

const SwitchCases = <T extends string | number>({
  value,
  cases,
  defaultCase = null,
}: SwitchCasesProps<T>) => {
  return cases[value] ?? defaultCase
}

export default SwitchCases
