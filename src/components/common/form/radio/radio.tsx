import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { useRadioHook } from './radio.hook'
import { RadioProps } from './radio.types'

export const Radio: BaseProps<RadioProps> = (props) => {
  const { children, blockClassName, ...restProps } = props

  const baseClass = 'form-radio'
  const mergedAttrs = useRadioHook(baseClass, restProps)

  const radioBlockClassBase = 'form-radio-group'
  const radioBlockClass = classNames({
    [radioBlockClassBase]: baseClass,
    [`${blockClassName}`]: blockClassName,
  })

  return (
    <div className={radioBlockClass}>
      <input {...mergedAttrs} type="radio" />
      <label htmlFor={props.id} className="form-radio-label">
        {children}
      </label>
    </div>
  )
}
