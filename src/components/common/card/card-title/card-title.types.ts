import { ElementProps } from '@/types/elements.types'

export interface CardTitleProps extends ElementProps {
  selected?: boolean
  asElement?: boolean
}

export interface CardTitleHook extends CardTitleProps {}
