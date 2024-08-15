import { BaseProps } from '@/types/global.types'

const MainLayout: BaseProps = (props) => {
  const { children } = props
  return (
    <main className="w-full h-full min-h-svh flex flex-col">
      <header className="w-full h-10">a placeholder for header</header>
      <div className="flex-grow">{children}</div>
      <footer className="w-full h-10">a placeholder for footer</footer>
    </main>
  )
}

export default MainLayout
