import { TType } from '@/types/global.types'
import { ListboxProps } from '@headlessui/react'

type DEFAULT_LISTBOX_TAG = React.ExoticComponent<{
  children?: React.ReactNode
}>

export interface SelectProps extends ListboxProps<DEFAULT_LISTBOX_TAG, TType, TType extends (infer U)[] ? U : TType> {}

export interface SelectHook extends SelectProps {}
