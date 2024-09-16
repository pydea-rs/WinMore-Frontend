import { TType } from '@/types/global.types'
import { ListboxOptionProps } from '@headlessui/react'
import { ElementType } from 'react'

export interface SelectOptionProps extends ListboxOptionProps<ElementType, TType> {}
export interface SelectOptionHook extends SelectOptionProps {}
