import { ElementProps, UiVariants } from '@/types/elements.types'

// Components
export type AlertType = Omit<UiVariants, 'primary' | 'success' | 'danger' | 'warning'>
export interface AlertProps extends ElementProps {
  variant?: AlertType
}

export interface AlertHook extends AlertProps {}
