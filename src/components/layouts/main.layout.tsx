import { BaseProps } from '@/types/global.types'
import Footer from '../templates/footer/footer'

const MainLayout: BaseProps = (props) => {
  const { children } = props
  return (
    <div className="flex flex-col min-h-[100vh]">
      <main>{children}</main>
      <Footer className="mt-auto" />
    </div>
  )
}

export default MainLayout
