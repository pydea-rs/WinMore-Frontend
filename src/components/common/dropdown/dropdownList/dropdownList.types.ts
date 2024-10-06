import { ElementProps } from '@/types/elements.types'
import { MenuItemsProps } from '@headlessui/react'
import { ElementType } from 'react'

declare let DEFAULT_ITEMS_TAG: 'div'
export type DropdownListProps<TTag extends ElementType = typeof DEFAULT_ITEMS_TAG> = MenuItemsProps<TTag> & ElementProps
export interface DropdownListHook extends DropdownListProps {}
