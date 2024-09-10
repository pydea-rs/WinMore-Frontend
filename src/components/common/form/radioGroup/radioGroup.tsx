import { BaseProps } from '@/types/global.types'
import { useRadioGroupHook } from './radioGroup.hook'
import { RadioGroupProps } from './radioGroup.types'

export const RadioGroup: BaseProps<RadioGroupProps> = (props) => {
  const { children } = props
  // Base class for styling
  const baseClass = 'radio-group'
  const mergedAttrs = useRadioGroupHook(baseClass, props)

  return <div {...mergedAttrs}>{children}</div>
}
