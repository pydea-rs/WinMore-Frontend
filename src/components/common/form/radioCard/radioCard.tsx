import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { useRadioHook } from './radioCard.hook'
import { RadioCardProps } from './radioCard.types'

export const RadioCard: BaseProps<RadioCardProps> = (props) => {
  const { children, groupClassName, ...restProps } = props

  const baseClass = 'form-radio-card'
  const optionGroupClassBase = 'form-radio-card-group'
  const mergedAttrs = useRadioHook(baseClass, restProps)

  const optionGroupClass = classNames({
    [optionGroupClassBase]: baseClass,
    [`${groupClassName}`]: groupClassName,
  })

  return (
    <div className={optionGroupClass}>
      <input {...mergedAttrs} type="radio" />
      <label htmlFor={props.id} className="form-radio-card-label">
        <div className="pr-4 flex-grow"> {children}</div>
        <div className="form-radio-card-checkbox"></div>
      </label>
    </div>
  )
}
