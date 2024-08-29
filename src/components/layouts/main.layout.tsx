import { BaseProps } from '@/types/global.types'
import Image from 'next/image'
import { Button } from '../common/button/button'
import Copyright from '../common/footer/copyright/copyright'
import Footer from '../common/footer/footer'
import Header from '../common/header/header'
import CasinoIcon from '../icons/casino/casino'
import ConstructionTool from '../icons/constructionTool/constructionTool'

const MainLayout: BaseProps = (props) => {
  const { children } = props
  return (
    <div className="flex flex-col px-4 2xl:container">
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
          height: '100vh',
          // zIndex: 2,
          // left: 0,
          // right: 0,
          // top: 0,
        }}
      />

      <Header />
      <article>
        <aside className="fixed left-2 top-[114px] w-full z-[999999999999]">
          <div className="px-4 2xl:container ">
            <div className="w-fit flex flex-col gap-4">
              <Button kind="primary" variant="info" className="w-14 h-14 hover:bg-primary/90">
                <CasinoIcon className="w-6 h-6" />
              </Button>
              <Button kind="primary" variant="info" className="w-14 h-14 hover:bg-primary/90">
                <ConstructionTool className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex flex-col flex-grow mt-9">{children}</main>
      </article>
      <Footer className="relative z-20 flex-grow-0">
        <Copyright className="relative" />
      </Footer>
    </div>
  )
}

export default MainLayout
