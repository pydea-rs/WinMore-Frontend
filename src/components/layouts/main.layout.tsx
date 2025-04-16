import { useSelector } from '@/store/store'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import Image from 'next/image'
import Footer from '../common/footer/footer'
import FooterMenu from '../common/footer/footer-menu/footer-menu'
import Header from '../common/header/header'
import MenuSticky from '../common/menuSticky/menuSticky'
import Navbar from '../common/navbar/navbar'
import QuickAccess from '../common/quickAccess'

const MainLayout: BaseProps = (props) => {
  const { children } = props
  const { quickAccess } = useSelector((state) => state.quickAccess)

  const { navbar } = useSelector((state) => state.navbar)

  const isScrollDisabled = [navbar.open].every(Boolean)

  return (
    <div className={classNames({ 'relative flex flex-col mb-28 md:mb-0 min-h-[100vh]': true, 'overflow-hidden h-[100vh] !mb-0': isScrollDisabled })}>
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

      {quickAccess && <QuickAccess />}

      <main className="flex flex-col flex-grow">{children}</main>

      <Footer className="relative z-20 flex-grow-0 hidden md:block">
        <FooterMenu className="relative" />
      </Footer>

      <MenuSticky className="md:hidden" />
    </div>
  )
}

export default MainLayout
