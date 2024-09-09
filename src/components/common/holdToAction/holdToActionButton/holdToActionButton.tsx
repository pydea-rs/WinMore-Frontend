import { BaseProps } from '@/types/global.types'
import { useEffect } from 'react'
import { useHoldToAction } from '../holdToActionProvider.hook'
import { useHoldToActionButton } from './holdToActionButton.hook'
import { HoldToActionButtonProps } from './holdToActionButton.types'

export const HoldToActionButton: BaseProps<HoldToActionButtonProps> = (props) => {
  const { children, keepInitialContent, onFinish, resetOnFinish, duration, ...restProps } = props
  const { enableKeepInitialContent, onStart, onStop, state, setDuration } = useHoldToAction?.()

  // Base class for styling
  const baseClass = 'hold-to-action-btn'
  const mergedAttrs = useHoldToActionButton(baseClass, restProps)

  useEffect(() => {
    if (keepInitialContent) {
      enableKeepInitialContent()
    }
  }, [keepInitialContent])

  useEffect(() => {
    if (duration) {
      setDuration(duration)
    }
  }, [duration])

  const elementStyle = {
    transform: `translateX(${state.progress}%)`,
  }

  return (
    <button {...mergedAttrs} onMouseDown={() => onStart({ onFinish, disabled: props.disabled, keepInitialContent, resetOnFinish })} onMouseUp={onStop} onMouseLeave={onStop}>
      <div style={{ ...elementStyle }} className={`hold-to-action-overlay ${state.isExiting ? ' transition-all ease-linear' : ''}`} />
      {children}
    </button>
  )
}
