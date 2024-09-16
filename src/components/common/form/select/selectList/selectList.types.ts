import { ListboxOptionsProps } from '@headlessui/react'
import { ElementType } from 'react'

declare let DEFAULT_OPTIONS_TAG: 'div'

export type SelectListProps<TTag extends ElementType = typeof DEFAULT_OPTIONS_TAG> = ListboxOptionsProps<TTag>
export interface SelectListHook extends SelectListProps {}
