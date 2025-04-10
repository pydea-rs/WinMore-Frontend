import CardsIcon from '@/components/icons/cards/cards.icon'
import HomeIcon from '@/components/icons/home/home.icon'
import ProfileIcon from '@/components/icons/profile/profile.icon'
import { internalLinks } from '@/configs/app-routes'
import { toggleNavbar } from '@/store/slices/navbar/navbar.slice'
import { useDispatch } from '@/store/store'
import { BaseProps } from '@/types/global.types'
import { useRouterTools } from '@/utils/router'
import classNames from 'classnames'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IMenuSticky } from './menuSticky.types'

enum ActiveButtonsEnum {
  HOME = 0,
  GAME = 1,
  PROFILE = 2,
}

const MenuSticky: BaseProps<IMenuSticky> = (props) => {
  const { className } = props
  const dispatch = useDispatch()
  const classList = classNames({
    [`menu-sticky`]: true,
    [`${className}`]: className,
  })
  const [activeButton, setActiveButton] = useState<ActiveButtonsEnum>(ActiveButtonsEnum.HOME)

  const handleOpenNavbar = () => {
    dispatch(toggleNavbar())
  }
  const { isAtSubPath } = useRouterTools()

  useEffect(() => {
    if (isAtSubPath(internalLinks.games.mine.path)) {
      setActiveButton(ActiveButtonsEnum.GAME)
      return
    }
    if (isAtSubPath(internalLinks.user.path)) {
      setActiveButton(ActiveButtonsEnum.PROFILE)
      return
    }
    setActiveButton(ActiveButtonsEnum.HOME)
  }, [isAtSubPath])

  return (
    <div className={classList}>
      <ul className="p-4 bg-secondary border-t border-t-primary flex justify-between">
        <li className="flex justify-center flex-grow">
          <button
            className={`flex flex-col items-center justify-center py-2.5 px-4 hover:text-primary ${activeButton === ActiveButtonsEnum.HOME ? 'text-primary' : ''}`}
            onClick={handleOpenNavbar}
          >
            <HomeIcon className="mb-2" />
            <span className="text-sm font-bold ">Menu</span>
          </button>
        </li>
        <li className="flex justify-center flex-grow">
          <Link
            href={internalLinks.games.mine.path}
            className={`flex flex-col items-center justify-center py-2.5 px-4 text-main hover:text-primary ${activeButton === ActiveButtonsEnum.GAME ? 'text-primary' : ''}`}
          >
            <CardsIcon className="mb-2" />
            <span className="text-sm font-bold ">Game</span>
          </Link>
        </li>
        <li className="flex justify-center flex-grow">
          <Link
            href={internalLinks.user.path}
            className={`flex flex-col items-center justify-center py-2.5 px-4 text-main hover:text-primary ${activeButton === ActiveButtonsEnum.PROFILE ? 'text-primary' : ''}`}
          >
            <ProfileIcon className="mb-2" />
            <span className="text-sm font-bold ">Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default MenuSticky
