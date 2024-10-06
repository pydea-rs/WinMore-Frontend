import { closeNavbar } from '@/store/slices/navbar/navbar.slice'
import { dispatch, useSelector } from '@/store/store'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Footer from '../common/footer/footer'
import FooterMenu from '../common/footer/footer-menu/footer-menu'
import Header from '../common/header/header'
import MenuSticky from '../common/menuSticky/menuSticky'
import Navbar from '../common/navbar/navbar'
import QuickAccess from '../common/quickAccess/quickAccess'

const MainLayout: BaseProps = (props) => {
  const { children } = props
  const [isShowQuickAccess, setIsShowQuickAccess] = useState(false)
  const { navbar } = useSelector((state) => state.navbar)

  const handleCloseNavbar = () => {
    if (navbar.open && window.innerWidth > 720) {
      dispatch(closeNavbar())
    }
  }

  const handledQuickAccessState = () => {
    if (window.innerWidth > 1300) {
      if (!isShowQuickAccess) setIsShowQuickAccess(true)
    } else {
      if (isShowQuickAccess) setIsShowQuickAccess(false)
    }
  }

  useEffect(() => {
    // initial
    handledQuickAccessState()

    window.addEventListener('resize', () => {
      handleCloseNavbar()
      handledQuickAccessState()
    })
    return window.removeEventListener('resize', () => {
      handleCloseNavbar()
      handledQuickAccessState()
    })
  }, [navbar.open])

  const isScrollDisabled = [navbar.open].every(Boolean)

  return (
    <div className={classNames({ 'relative flex flex-col mb-28 md:mb-0 min-h-[100vh]': true, 'overflow-hidden h-[100vh] !mb-0': isScrollDisabled })}>
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
        src={'/assets/images/hero-bg.svg'}
        alt="header rectangle"
        width={500}
        height={500}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100vh',
          top: 0,
          objectFit: 'cover',
        }}
        className="pointer-events-none"
      />

      <Header />

      <Navbar isOpen={navbar.open} />

      {isShowQuickAccess && <QuickAccess />}

      <main className="flex flex-col flex-grow overflow-hidden">{children}</main>

      <Footer className="relative z-20 flex-grow-0 hidden md:block">
        <FooterMenu className="relative" />
      </Footer>

      <MenuSticky className="md:hidden" />
    </div>
  )
}

export default MainLayout
