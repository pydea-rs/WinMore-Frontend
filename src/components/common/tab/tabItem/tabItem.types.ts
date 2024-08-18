import { TabProps } from '@headlessui/react'
import { ElementType } from 'react'

declare let DEFAULT_PANEL_TAG: 'div'

export type ITabItem<TTag extends ElementType = typeof DEFAULT_PANEL_TAG> = TabProps<TTag>
// tabList
