import { BaseProps } from '@/types/global.types'
import Image from 'next/image'
import Footer from '../common/footer/footer'
import FooterMenu from '../common/footer/footer-menu/footer-menu'
import Header from '../common/header/header'
import MenuSticky from '../common/menu-sticky/menu-sticky'
import QuickAccess from '../common/quickAccess/quickAccess'

const MainLayout: BaseProps = (props) => {
  const { children } = props

  return (
    <div className="relative flex flex-col mb-28 md:mb-0">
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
      />
      <Image
        src={'/assets/images/hero-bg.svg'}
        alt="header rectangle"
        width={500}
        height={500}
        // className="bg-blue-300"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100vh',
          top: 0,
          objectFit: 'cover',
          // zIndex: 2,
          // left: 0,
          // right: 0,
          // top: 0,
        }}
      />

      <Header />
      <QuickAccess />
      <main className="flex flex-col flex-grow overflow-hidden">{children}</main>
      <Footer className="relative z-20 flex-grow-0 hidden md:block">
        <FooterMenu className="relative" />
      </Footer>
      <MenuSticky className="md:hidden" />
    </div>
  )
}

export default MainLayout
