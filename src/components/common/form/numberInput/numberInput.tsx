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
  const { onDecrease, onIncrease } = props
  // Base class for styling
  const baseClass = 'form-control-numeric'
  const mergedAttrs = useNumberInputHook(baseClass, props)

  return (
    <div className="relative">
      <NumericFormat maxLength={9} thousandSeparator decimalScale={2} allowNegative={false} {...mergedAttrs} customInput={NumberCustomInput} />
      <div className="absolute top-1/2 -translate-y-1/2 !left-auto !right-4 flex flex-col">
        <button onClick={onIncrease} className="text-main hover:bg-white/10 active:bg-white/20">
          <ChevronUpIcon className="numeric-arrow" />
        </button>
        <button onClick={onDecrease} className="text-main hover:bg-white/10 active:bg-white/20">
          <ChevronDownIcon className="numeric-arrow" />
        </button>
      </div>
    </div>
  )
}
