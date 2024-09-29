import { ElementProps } from '@/types/elements.types'
import { MenuButtonProps } from '@headlessui/react'
import { ElementType } from 'react'

declare let DEFAULT_BUTTON_TAG: 'div'
export type DropdownButtonProps<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> = MenuButtonProps<TTag> & ElementProps
export interface DropdownButtonHook extends DropdownButtonProps {}
