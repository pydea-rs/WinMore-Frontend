import { TabListProps } from '@headlessui/react'
import { ElementType } from 'react'

declare let DEFAULT_PANEL_TAG: 'div'

export type ITabHeader<TTag extends ElementType = typeof DEFAULT_PANEL_TAG> = TabListProps<TTag>
