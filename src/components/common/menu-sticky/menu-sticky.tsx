import CardsIcon from '@/components/icons/cards/cards.icon'
import HomeIcon from '@/components/icons/home/home.icon'
import ProfileIcon from '@/components/icons/profile/profile.icon'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { IMenuSticky } from './menu-sticky.types'

const MenuSticky: BaseProps<IMenuSticky> = (props) => {
  const { className } = props
  const classList = classNames({
    [`menu-sticky`]: true,
    [`${className}`]: className,
  })

  return (
    <div className={classList}>
      <ul className="p-4 bg-secondary border-t border-t-primary flex justify-between">
        <li className="flex justify-center flex-grow">
          <button className="flex flex-col items-center justify-center py-2.5 px-4 text-primary hover:text-primary active:text-primary">
            <HomeIcon className="mb-2" />
            <span className="text-sm font-bold ">Home</span>
          </button>
        </li>
        <li className="flex justify-center flex-grow">
          <button className="flex flex-col items-center justify-center py-2.5 px-4 text-main hover:text-primary active:text-primary">
            <CardsIcon className="mb-2" />
            <span className="text-sm font-bold ">Games</span>
          </button>
        </li>
        <li className="flex justify-center flex-grow">
          <button className="flex flex-col items-center justify-center py-2.5 px-4 text-main hover:text-primary active:text-primary">
            <ProfileIcon className="mb-2" />
            <span className="text-sm font-bold ">Profile</span>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default MenuSticky
