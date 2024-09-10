import { BaseProps } from '@/types/global.types'
import { useRadioCardGroupHook } from './radioCardGroup.hook'
import { RadioCardGroupProps } from './radioCardGroup.types'

export const RadioCardGroup: BaseProps<RadioCardGroupProps> = (props) => {
  const { children } = props
  // Base class for styling
  const baseClass = 'radio-card-group'
  const mergedAttrs = useRadioCardGroupHook(baseClass, props)

  return <div {...mergedAttrs}>{children}</div>
}
