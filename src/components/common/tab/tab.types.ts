import { TabGroupProps } from '@headlessui/react'
import { ElementType } from 'react'

declare let DEFAULT_PANEL_TAG: 'div'

export type ITab<TTag extends ElementType = typeof DEFAULT_PANEL_TAG> = TabGroupProps<TTag>
