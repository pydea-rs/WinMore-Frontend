import { MenuProps } from '@headlessui/react'
import { ElementType } from 'react'

declare let DEFAULT_MENU_TAG: 'div'
export type DropdownProps<TTag extends ElementType = typeof DEFAULT_MENU_TAG> = MenuProps<TTag>
export interface DropdownHook extends DropdownProps {}
