import ChevronDownIcon from '@/components/icons/chevronDown/chevronDown'

import CryptoCurrencyIcon from '@/components/icons/cryptoCurrency/cryptoCurrency'
import SingleUserIcon from '@/components/icons/singleUser/singleUser'
import { useAuth } from '@/hooks/useAuth'
import { usePermalink } from '@/hooks/usePermalink'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch, useSelector } from '@/store/store'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../button/button'
import Container from '../container/container'
import List from '../list/list'
import ListItem from '../list/listItem/listItem'
import ListLink from '../list/listLink/listLink'
import ListText from '../list/listText/listText'
import { IHeaderRoutes } from './header.types'

const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { internalLinks } = usePermalink()

  const headerRoutes: IHeaderRoutes[] = [
    {
      path: internalLinks.home.get(),
      title: 'Home',
      disabled: false,
    },
    {
      path: internalLinks.blogs.get(),
      title: 'Blog',
      disabled: true,
    },
    {
      path: internalLinks.faq.get(),
      title: 'FAQ',
      disabled: true,
    },
    {
      path: internalLinks.aboutUs.get(),
      title: 'About Us',
      disabled: true,
    },
    {
      path: internalLinks.contactUs.get(),
      title: 'Contact Us',
      disabled: true,
    },
  ]

  const brandRender = () => {
    return (
      <Link href={'/'}>
        <Image src={'/assets/images/logo.svg'} alt="logo" width={140} height={50} className="w-36 lg:w-44" />
      </Link>
    )
  }

  const { logoutAndDisconnect } = useAuth()

  const menuRender = () => {
    return (
      <div className="hidden md:flex items-center col-span-12 sm:col-span-6">
        <List>
          {headerRoutes.map((nav) => {
            if (nav.disabled) {
              return (
                <ListItem key={nav.path}>
                  <ListText>{nav.title}</ListText>
                </ListItem>
              )
            }
            return (
              <ListItem key={nav.path}>
                <ListLink href={'https://google.com'} className="text-white transition">
                  {nav.title}
                </ListLink>
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }

  const userProfileRender = () => {
    return !user ? (
      <Button className="px-2 py-4 md:px-2.5 md:py-5 !text-xs md:text-sm" kind="pattern" pilled bordered onClick={() => dispatch(triggerModal({ modal: 'login', trigger: true }))}>
        <div className="flex items-center gap-x-2">
          <CryptoCurrencyIcon className="flex-shrink-0" /> Connect Wallet
        </div>
      </Button>
    ) : (
      <Button kind="pattern" bordered pilled className="px-2 py-4 md:px-2.5 md:py-5 !text-xs md:text-sm" onClick={logoutAndDisconnect}>
        <div className="flex items-center gap-x-2">
          <SingleUserIcon className="flex-shrink-0" /> {user.name} <ChevronDownIcon />
        </div>
      </Button>
    )
  }

  return (
    <header className="mb-10">
      <Container kind="fluid">
        <div className="pt-8 flex items-center justify-between z-20">
          {/* START LOGO */}
          {brandRender()}

          {/* START MENU */}
          {menuRender()}

          {/* START LOGIN/PROFILE */}
          {userProfileRender()}
        </div>
      </Container>
    </header>
  )
}

export default Header
