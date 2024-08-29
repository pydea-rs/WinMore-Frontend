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
  const baseClass = 'form-control'
  const mergedAttrs = useNumberInputHook(baseClass, props)

  return (
    <div className="relative">
      <NumericFormat thousandSeparator decimalScale={2} allowNegative={false} {...mergedAttrs} customInput={NumberCustomInput} />
      <div className="absolute-center !left-auto !right-4">
        <button onClick={onIncrease}>increase</button>
        <br />
        <button onClick={onDecrease}>decrease</button>
      </div>
    </div>
  )
}
