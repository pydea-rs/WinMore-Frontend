import { BaseProps } from '@/types/global.types'
import { TabPanels } from '@headlessui/react'
import classNames from 'classnames'
import { ITabBody } from './tabBody.types'

const TabBody: BaseProps<ITabBody> = (props) => {
  const { children, className } = props

  const classList = classNames({
    [`tab-body`]: true,
    [`${className}`]: className,
  })

  return <TabPanels className={classList}>{children}</TabPanels>
}

export default TabBody
