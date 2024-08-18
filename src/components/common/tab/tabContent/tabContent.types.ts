import { TabPanelProps } from '@headlessui/react'
import { ElementType } from 'react'

declare let DEFAULT_PANEL_TAG: 'div'

export type ITabContent<TTag extends ElementType = typeof DEFAULT_PANEL_TAG> = TabPanelProps<TTag>
