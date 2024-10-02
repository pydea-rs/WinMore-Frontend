import { BaseProps } from '@/types/global.types'
import Link from 'next/link'
import { useDropdownButtonHook } from './dropdownItem.hook'
import { DropdownButtonProps } from './dropdownItem.types'

const DropdownButton: BaseProps<DropdownButtonProps> = (props) => {
  const { children } = props
  const baseClass = 'dropdown-button'
  const mergedAttrs = useDropdownButtonHook(baseClass, props)

  return !props.href ? (
    <button {...mergedAttrs}>{children}</button>
  ) : (
    <Link href={props.href} {...mergedAttrs} prefetch={false}>
      {children}
    </Link>
  )
}

export default DropdownButton
