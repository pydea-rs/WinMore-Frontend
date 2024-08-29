import ChevronDownIcon from '@/components/icons/chevronDown/chevronDown'

import CryptoCurrencyIcon from '@/components/icons/cryptoCurrency/cryptoCurrency'
import SingleUserIcon from '@/components/icons/singleUser/singleUser'
import { usePermalink } from '@/hooks/usePermalink'
import { logout } from '@/store/slices/auth/auth.slice'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch, useSelector } from '@/store/store'
import Image from 'next/image'
import Link from 'next/link'
import { useDisconnect } from 'wagmi'
import { Button } from '../button/button'
import List from '../list/list'
import ListItem from '../list/listItem/listItem'
import ListLink from '../list/listLink/listLink'
import ListText from '../list/listText/listText'
import { IHeaderRoutes } from './header.types'

const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { disconnect } = useDisconnect()
  const { internalLinks } = usePermalink()
  const logoutHandler = () => {
    dispatch(logout())
    disconnect()
  }

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

  return (
    <>
      <header className="pt-8 flex items-center justify-between z-20">
        <Link href={'/'}>
          <Image src={'/assets/images/logo.svg'} alt="logo" width={180} height={50} />
        </Link>

        <div className="col-span-12 sm:col-span-6 flex items-center">
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
        {!user ? (
          <Button kind="pattern" bordered onClick={() => dispatch(triggerModal({ modal: 'login', trigger: true }))}>
            <div className="flex items-center gap-x-2">
              <CryptoCurrencyIcon className="flex-shrink-0" /> Connect Wallet
            </div>
          </Button>
        ) : (
          <Button
            kind="pattern"
            bordered
            //  onClick={logoutHandler}
          >
            <div className="flex items-center gap-x-2">
              <SingleUserIcon className="flex-shrink-0" /> {user.name} <ChevronDownIcon />
            </div>
          </Button>
        )}
      </header>
    </>
  )
}

export default Header
