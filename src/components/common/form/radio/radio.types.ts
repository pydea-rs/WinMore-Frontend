import { InputHTMLAttributes } from 'react'

export type RadioSizes = 'sm' | 'md'
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'disabled' | 'name' | 'onChange' | 'size'> {
  disabled?: boolean
  id: string
  value: string
  name: string
  size?: RadioSizes
  blockClassName?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface RadioHook extends RadioProps {}
