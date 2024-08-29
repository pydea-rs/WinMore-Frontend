import { InputHTMLAttributes } from 'react'
import { Omit } from 'utility-types'

export type TextInputKinds = 'title'

// Input Text Component Props
export interface NumberInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    // Exclude these specific attributes
    | 'size'
    | 'accept'
    | 'image'
    | 'alt'
    | 'capture'
    | 'checked'
    | 'formAction'
    | 'formEnctype'
    | 'formMethod'
    | 'formNoValidate'
    | 'formTarget'
    | 'height'
    | 'multiple'
    | 'src'
    | 'width'
    | 'type'
  > {
  // type?: TextInputTypes
  valid?: boolean
  invalid?: boolean

  onIncrease?: () => void
  onDecrease?: () => void
}

// Input Text Hook
export interface NumberInputHook extends NumberInputProps {}
