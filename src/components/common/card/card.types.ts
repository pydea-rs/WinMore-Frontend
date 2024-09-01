import { ElementProps } from '@/types/elements.types'

export type CardSizes = 'md' | 'lg'

export interface CardProps extends ElementProps {
  size?: CardSizes
  responsive?: boolean
}

export interface CardHook extends CardProps {}
