import { BaseProps } from '@/types/global.types'
import { useFormCheckHook } from './formCheck.hook'
import { FromCheckProps } from './formCheck.types'

export const FormCheck: BaseProps<FromCheckProps> = (props) => {
  const { children } = props
  // Base class for styling
  const baseClass = 'form-check'
  const mergedAttrs = useFormCheckHook(baseClass, props)

  return <div {...mergedAttrs}>{children}</div>
}
