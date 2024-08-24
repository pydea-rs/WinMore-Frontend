import { BaseProps } from '@/types/global.types'
import Image from 'next/image'
import Copyright from '../common/footer/copyright/copyright'
import Footer from '../common/footer/footer'
import Header from '../common/header/header'

const MainLayout: BaseProps = (props) => {
  const { children } = props
  return (
    <div className="flex flex-col min-h-[100vh] px-4 2xl:container">
      <Image
        src={'/assets/images/header-rectangle.svg'}
        alt="header rectangle"
        width={180}
        height={100}
        style={{
          position: 'absolute',
          zIndex: 2,
        }}
      />
      <Image
        src={'/assets/images/hero-bg.svg'}
        alt="header rectangle"
        width={500}
        height={500}
        style={{
          position: 'absolute',
          width: '100%',
          height: '50svh',
          // zIndex: 2,
          // left: 0,
          // right: 0,
          // top: 0,
        }}
      />
      <Header />
      <main className="flex flex-col flex-grow mt-9">{children}</main>
      <Footer className="relative z-20 flex-grow-0">
        <Copyright className="relative" />
      </Footer>
    </div>
  )
}

export default MainLayout
