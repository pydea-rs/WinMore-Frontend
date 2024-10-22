import ChevronDownIcon from '@/components/icons/chevronDown/chevronDown'
import ChevronUpIcon from '@/components/icons/chevronUp/chevronUp'
import { BaseProps } from '@/types/global.types'
import { NumericFormat } from 'react-number-format'
import { useNumberInputHook } from './numberInput.hooks'
import { NumberInputProps } from './numberInput.types'

export const NumberCustomInput: BaseProps<NumberInputProps> = (props) => {
  return <input {...props} />
}
export const NumberInput: BaseProps<NumberInputProps> = (props) => {
  const { onDecrease, onIncrease, ...restProps } = props
  // Base class for styling
  const baseClass = 'form-control-numeric'
  const mergedAttrs = useNumberInputHook(baseClass, restProps)

  return (
    <div className="relative">
      <NumericFormat maxLength={9} thousandSeparator decimalScale={6} allowNegative={false} {...mergedAttrs} customInput={NumberCustomInput} />
      {onIncrease && onDecrease && (
        <div className="absolute top-1/2 -translate-y-1/2 !left-auto !right-4 flex flex-col">
          <button
            type="button"
            onClick={() => {
              if (restProps.disabled) return null
              onIncrease()
            }}
            className="text-main hover:bg-white/10 active:bg-white/20 disabled:pointer-events-none"
            disabled={restProps.disabled}
          >
            <ChevronUpIcon className="numeric-arrow" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (restProps.disabled) return null
              onDecrease()
            }}
            className="text-main hover:bg-white/10 active:bg-white/20 disabled:pointer-events-none"
            disabled={restProps.disabled}
          >
            <ChevronDownIcon className="numeric-arrow" />
          </button>
        </div>
      )}
    </div>
  )
}
