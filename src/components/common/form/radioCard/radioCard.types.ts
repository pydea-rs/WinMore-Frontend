import { InputHTMLAttributes } from 'react'

// export type RadioCardSizes = 'sm' | 'md'
export interface RadioCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'disabled' | 'name' | 'onChange' | 'size'> {
  disabled?: boolean
  controlled?: boolean
  active?: boolean
  id: string
  value: string
  name: string
  groupClassName?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface RadioCardHook extends RadioCardProps {}
