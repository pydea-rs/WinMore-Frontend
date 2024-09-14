import { BaseProps } from '@/types/global.types'
import { useCheckboxGroupHook } from './checkboxGroup.hook'
import { CheckboxGroupProps } from './checkboxGroup.types'

export const CheckboxGroup: BaseProps<CheckboxGroupProps> = (props) => {
  const { children } = props
  // Base class for styling
  const baseClass = 'check-group'
  const mergedAttrs = useCheckboxGroupHook(baseClass, props)

  return <div {...mergedAttrs}>{children}</div>
}
