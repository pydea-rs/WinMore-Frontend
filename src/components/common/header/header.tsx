import ChevronDownIcon from '@/components/icons/chevronDown/chevronDown'
import ChevronRightIcon from '@/components/icons/chevronRight/chevronRight'
import CryptoCurrencyIcon from '@/components/icons/cryptoCurrency/cryptoCurrency'
import LogoutIcon from '@/components/icons/logout/logout'
import SingleUserIcon from '@/components/icons/singleUser/singleUser'
import { useAuth } from '@/hooks/useAuth'
import { usePermalink } from '@/hooks/usePermalink'
import { useGetUserCurrentBalanceQuery, useGetUserInfoQuery } from '@/services/user/user.service'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch, useSelector } from '@/store/store'
import { IGetUserInfoResponse } from '@/types/auth/user.types'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Avatar } from '../avatar/avatar'
import { Button } from '../button/button'
import Container from '../container/container'
import Dropdown from '../dropdown/dropdown'
import DropdownButton from '../dropdown/dropdownButton/dropdownItem'
import DropdownItem from '../dropdown/dropdownItem/dropdownItem'
import DropdownList from '../dropdown/dropdownList/dropdownList'
import DropdownMenuButton from '../dropdown/dropdownMenuButton/dropdownMenuButton'
import List from '../list/list'
import ListItem from '../list/listItem/listItem'
import ListLink from '../list/listLink/listLink'
import ListText from '../list/listText/listText'

const HeaderComponent = () => {
  const dispatch = useDispatch()
  const { token, network, currentTokenBalance } = useSelector((state) => state.currency)
  const { internalLinks } = usePermalink()
  const { logoutAndDisconnect, isAuthorized } = useAuth()
  const { isLoading: IsLoadingCurrentBalance, isFetching: isFetchingCurrentBalance } = useGetUserCurrentBalanceQuery(
    { chain: network.chainId, token: token.symbol },
    { skip: !isAuthorized },
  )
  const { isLoading, data: UserData } = useGetUserInfoQuery({}, { skip: !isAuthorized })

  const headerRoutes = [
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

  const profileMenuItems = [
    {
      id: '1',
      title: 'Profile',
      link: internalLinks.user.get(),
    },
    {
      id: '2',
      title: 'Wallet',
      link: internalLinks.userWallet.get(),
    },
    {
      id: '3',
      title: 'Messages',
      link: internalLinks.userMessages.get(),
    },
  ]

  const renderBrandLogo = () => (
    <Link href={internalLinks.home.get()}>
      <Image src={'/assets/images/logo.svg'} alt="logo" width={140} height={50} className="w-36 lg:w-44" />
    </Link>
  )

  const renderMenu = () => (
    <div className="hidden md:flex items-center col-span-12 sm:col-span-6">
      <List>
        {headerRoutes.map((route) => {
          return (
            <ListItem key={route.path}>
              {route.disabled ? (
                <ListText>{route.title}</ListText>
              ) : (
                <ListLink href={'/'} className="text-white transition">
                  {route.title}
                </ListLink>
              )}
            </ListItem>
          )
        })}
      </List>
    </div>
  )

  const renderConnectWalletButton = () => (
    <Button
      className="px-2 py-4 md:px-2.5 md:py-5 !text-xs md:text-sm min-w-[165px]"
      kind="pattern"
      pilled
      bordered
      disabled={isLoading}
      onClick={() => dispatch(triggerModal({ modal: 'login', trigger: true }))}
    >
      <div className="flex items-center gap-x-2">
        <CryptoCurrencyIcon className="flex-shrink-0" /> Connect Wallet
      </div>
    </Button>
  )

  const renderUserProfileDropdown = (user: IGetUserInfoResponse) => (
    <Fragment>
      <Dropdown>
        <DropdownMenuButton as="div">
          <Button kind="pattern" bordered pilled className="py-5 px-5 !text-xs md:text-sm min-w-[165px]">
            <div className="flex items-center gap-x-2">
              <SingleUserIcon className="flex-shrink-0" /> {user.name || 'Guest'} <ChevronDownIcon />
            </div>
          </Button>
        </DropdownMenuButton>
        <DropdownList className="relative flex flex-col w-[310px] p-6 gap-y-2.5 z-[10000] mt-2">
          {/* Background Layer */}
          <div
            className="absolute top-0 left-0 w-full h-full z-10 bg-cover bg-repeat opacity-20 pointer-events-none"
            style={{ backgroundImage: `url(/assets/images/glitch.png)` }}
          />
          <div className="flex gap-x-2 ">
            <Avatar src={user.profile.avatar || '/assets/images/profile/user-1.jpg'} size="xl" alt={user.name || ''} />
            <div className="flex flex-col pt-1 gap-y-1">
              <span className="text-[22px] font-bold">{user.name || 'Guest'} </span>
              <span className="text-sm font-normal">{user.email}</span>
            </div>
          </div>
          {/* User's points */}
          {/* <Button kind="gradient" variant="yellow-dark" className="flex justify-between font-medium font-dmSans">
            <div className="flex items-center justify-between gap-x-2 w-full">
              <MoneyIcon className="flex-shrink-0 text-yellow-500" />
              13941
            </div>
          </Button> */}
          {/* Menu items */}
          {profileMenuItems.map((item) => (
            <DropdownItem key={item.id}>
              <DropdownButton href={item.link} className="text-sm font-medium px-3 py-2 justify-between items-center data-[focus]:bg-white/10">
                {item.title}
                <ChevronRightIcon className="w-6 text-main group-data-[focus]:text-white" />
              </DropdownButton>
            </DropdownItem>
          ))}
          {/* Logout */}
          <Button className="gap-x-2" variant="danger" kind="primary" full onClick={logoutAndDisconnect}>
            <LogoutIcon className="w-6" />
            <span>LogOut</span>
          </Button>
        </DropdownList>
      </Dropdown>
    </Fragment>
  )
  // const balance = useGetWalletBalance()

  const renderActions = () => {
    return (
      <div className="hidden md:flex gap-x-4 ">
        <Button kind="pattern" className="px-2.5 !min-w-[165px]" bordered pilled onClick={handleOpenSelectCoinModal}>
          <div className="flex justify-between items-center gap-x-2">
            <Avatar size="md" src={token.icon} alt={token.name} />
            <div className="flex items-center gap-x-2.5 font-normal text-xs">
              <div>
                <span className="text-main">Network:</span>
                <span className="text-white">{network.name}</span>
              </div>
              <div>
                <span className="text-main">Balance:</span>
                <span className="text-white">{currentTokenBalance.toString().slice(0, 6)}</span>
              </div>
            </div>
            <ChevronDownIcon />
          </div>
        </Button>
        <Button kind="pattern" className="px-2" bordered pilled onClick={handleOpenDepositModal}>
          <div className="flex rounded-full justify-between items-center gap-x-2 bg-gradient-primary px-3 py-2">Deposit</div>
        </Button>
        {/* <Button kind="gradient" variant="yellow-dark" className="flex justify-between font-medium font-dmSans" pilled bordered onClick={handleOpenPointsModal}>
          <div className="flex items-center gap-x-2">
            <MoneyIcon className="flex-shrink-0 text-yellow-500" />
            13941
          </div>
        </Button> */}
      </div>
    )
  }

  const handleOpenSelectCoinModal = () => {
    dispatch(triggerModal({ modal: 'selectCoin', trigger: true }))
  }

  const handleOpenDepositModal = () => {
    dispatch(triggerModal({ modal: 'deposit', trigger: true }))
  }

  const handleOpenPointsModal = () => {}

  return (
    <header className="mb-10 relative z-[10000000000000]">
      <Container kind="fluid" className="relative">
        <Image
          src={'/assets/images/header-rectangle.svg'}
          alt="header rectangle"
          width={180}
          height={100}
          style={{
            position: 'absolute',
            top: '0',
            zIndex: 2,
          }}
          className="pointer-events-none"
        />
        <Image
          src={'/assets/images/header-rectangle.svg'}
          alt="header rectangle"
          width={180}
          height={100}
          style={{
            position: 'absolute',
            top: '0',
            zIndex: 2,
          }}
          className="pointer-events-none"
        />
        <div className="pt-8 flex items-center justify-between z-20">
          {isAuthorized && UserData ? (
            <Fragment>
              {renderBrandLogo()}
              {renderActions()}
              {renderUserProfileDropdown(UserData.data)}
            </Fragment>
          ) : (
            <Fragment>
              {renderBrandLogo()}
              {renderMenu()}
              {renderConnectWalletButton()}
            </Fragment>
          )}
        </div>
      </Container>
    </header>
  )
}

export default HeaderComponent
