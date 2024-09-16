import { ListboxButtonProps } from '@headlessui/react'
import { ElementType } from 'react'

declare let DEFAULT_BUTTON_TAG: 'div'
export type SelectButtonProps<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> = ListboxButtonProps<TTag>
export interface SelectButtonHook extends SelectButtonProps {}
