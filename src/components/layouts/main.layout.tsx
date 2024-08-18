import { BaseProps } from '@/types/global.types'
import Copyright from '../common/footer/copyright/copyright'
import Footer from '../common/footer/footer'

const MainLayout: BaseProps = (props) => {
  const { children } = props
  return (
    <div className="flex flex-col min-h-[100vh]">
      <main className="flex flex-col flex-grow">{children}</main>
      <Footer className="relative z-20 flex-grow-0">
        <Copyright className="relative" />
      </Footer>
    </div>
  )
}

export default MainLayout
