import { internalLinks } from '@/configs/app-routes'
import { useAuth } from '@/hooks/useAuth'
import { useGetUserInfoQuery } from '@/services/user/user.service'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { toggleNavbar } from '@/store/slices/navbar/navbar.slice'
import { useDispatch } from '@/store/store'
import { BaseProps } from '@/types/global.types'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar } from '../avatar/avatar'
import { Button } from '../button/button'
import Menu from './menu/menu'
import MenuItem from './menuItem/menuItem'
import MenuList from './menuList/menuList'
import MenuTitle from './menuTitle/menuTitle'
import { INavbar } from './navbar.type'

const Navbar: BaseProps<INavbar> = (props) => {
  const { isOpen } = props
  const dispatch = useDispatch()
  const { isAuthorized } = useAuth()
  const { data: UserData } = useGetUserInfoQuery({}, { skip: !isAuthorized })

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: '-100%' },
  }

  const handleOpenSelectCoinModal = () => {
    dispatch(toggleNavbar())
    dispatch(triggerModal({ modal: 'selectCoin', trigger: true }))
  }

  const handleOpenDepositModal = () => {
    if (!UserData?.data.profile || !UserData?.data.name) {
      dispatch(triggerModal({ modal: 'login', trigger: true }))
    } else {
      dispatch(toggleNavbar())
      dispatch(triggerModal({ modal: 'deposit', trigger: true }))
    }
  }

  return (
    <motion.nav
      initial={false}
      variants={variants}
      animate={isOpen ? 'open' : 'closed'}
      transition={{ type: 'tween', stiffness: 100 }}
      className=" fixed top-0 left-0 z-[2000] w-full h-full"
    >
      <div
        className="relative bg-[#101820] py-6 px-4 w-full bg-top bg-no-repeat h-[100vh] overflow-y-auto !pb-28"
        style={{ backgroundImage: `url("/assets/images/hero-bg.svg")`, backgroundSize: '640px 440px' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-[230px] h-[100px] z-10">
          <Image src={'/assets/images/shadow.svg'} alt="shadow" width={230} height={100} />
        </div>

        <div className="relative z-20">
          <Link href={internalLinks.home.path} className="flex justify-center mb-24">
            <Image src={'/assets/images/logo.svg'} alt="shadow" width={140} height={40} />
          </Link>

          <Menu className="mb-6">
            <MenuTitle>Coin</MenuTitle>
            <MenuList>
              <MenuItem className="mb-4">
                <Button variant="dark" kind="primary" className="bg-opacity-40 border text-main border-[#1A1F25]" full size="lg" onClick={handleOpenSelectCoinModal}>
                  <div className="flex justify-between items-center gap-x-2 w-full">
                    <Avatar src={'/assets/images/tokens/USDT.png'} size="lg" alt="tether" />
                    <div className="flex items-center gap-x-4">
                      <div className="flex items-center gap-x-1 font-normal text-xs">
                        <span className="text-main">Balance:</span>
                        <span className="text-white">0.000</span>
                      </div>
                      <ChevronRightIcon className="flex-shrink-0 w-4" />
                    </div>
                  </div>
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuList className="gap-y-4">
              <MenuItem>
                <Button
                  kind="primary"
                  variant="dark"
                  className="flex justify-between font-medium bg-opacity-40 border text-main border-[#1A1F25]"
                  full
                  size="lg"
                  onClick={handleOpenDepositModal}
                >
                  Deposit
                  <ChevronRightIcon className="flex-shrink-0 w-4" />
                </Button>
              </MenuItem>

              <MenuItem>
                <Link href={internalLinks.user.wallet.path}>
                  <Button kind="primary" variant="dark" className="flex justify-between font-medium bg-opacity-40 border text-main border-[#1A1F25]" full size="lg">
                    Wallet
                    <ChevronRightIcon className="flex-shrink-0 w-4" />
                  </Button>
                </Link>
              </MenuItem>

              <MenuItem>
                <Link href={internalLinks.user.messages.path}>
                  <Button kind="primary" variant="dark" className="flex justify-between font-medium bg-opacity-40 border text-main border-[#1A1F25]" full size="lg">
                    Message
                    <ChevronRightIcon className="flex-shrink-0 w-4" />
                  </Button>
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
