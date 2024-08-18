import { TabPanelsProps } from '@headlessui/react'
import { ElementType } from 'react'

declare let DEFAULT_PANEL_TAG: 'div'

export type ITabBody<TTag extends ElementType = typeof DEFAULT_PANEL_TAG> = TabPanelsProps<TTag>
