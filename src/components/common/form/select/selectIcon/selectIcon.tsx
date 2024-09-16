import { BaseProps } from '@/types/global.types'
import { useSelectIconHook } from './selectIcon.hook'
import { SelectIconProps } from './selectIcon.types'

const SelectIcon: BaseProps<SelectIconProps> = (props) => {
  const { children } = props

  // Base class for styling
  const baseClass = 'select-icon'
  const mergedAttrs = useSelectIconHook(baseClass, props)

  return <div {...mergedAttrs}>{children}</div>
}

export default SelectIcon
