import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { useRadioHook } from './radio.hook'
import { RadioProps } from './radio.types'

export const Radio: BaseProps<RadioProps> = (props) => {
  const { children, groupClassName, ...restProps } = props

  const baseClass = 'form-radio'
  const optionGroupClassBase = 'form-radio-group'
  const mergedAttrs = useRadioHook(baseClass, restProps)

  const optionGroupClass = classNames({
    [optionGroupClassBase]: baseClass,
    [`${groupClassName}`]: groupClassName,
  })

  return (
    <div className={optionGroupClass}>
      <input {...mergedAttrs} type="radio" />
      <label htmlFor={props.id} className="form-radio-label">
        {children}
      </label>
    </div>
  )
}
