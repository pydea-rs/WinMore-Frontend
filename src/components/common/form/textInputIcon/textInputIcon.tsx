import { BaseProps } from '@/types/global.types'
import { useTextInputIconHook } from './textInputIcon.hooks'
import { TextInputIconProps } from './textInputIcon.types'

export const TextInputIcon: BaseProps<TextInputIconProps> = (props) => {
  // Base class for styling
  const baseClass = 'form-control-icon'
  const mergedAttrs = useTextInputIconHook(baseClass, props)

  return <div {...mergedAttrs}>{props.children}</div>
}
