import { ElementProps } from '@/types/elements.types'

// Components
export type HoldToActionButton = {
  disabled?: boolean
  resetOnFinish?: boolean
  keepInitialContent?: boolean
  onFinish?: () => void
}

export type HoldToActionButtonProps = HoldToActionButton & ElementProps
export type HoldToActionButtonHook = ElementProps & HoldToActionButtonProps
