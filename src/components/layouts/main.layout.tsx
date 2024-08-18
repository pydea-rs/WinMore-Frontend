import { BaseProps } from '@/types/global.types'
import Copyright from '../common/footer/copyright/copyright'
import Footer from '../common/footer/footer'

const MainLayout: BaseProps = (props) => {
  const { children } = props
  return (
    <div className="flex flex-col min-h-[100vh]">
      <main className="overflow-hidden">{children}</main>
      <Footer className="mt-auto relative z-20">
        <Copyright className="relative" />
      </Footer>
    </div>
  )
}

export default MainLayout
