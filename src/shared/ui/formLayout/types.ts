export interface FormLayoutProps {
  children: React.ReactNode
  className?: string
  id?: string
  onSubmit?: (e: React.FormEvent) => void
}

export interface FormRowProps {
  children: React.ReactNode
  className?: string
  columns?: number
  gap?: string
}
