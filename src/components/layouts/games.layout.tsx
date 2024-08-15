import { BaseProps } from '@/types/global.types'

const GamesLayout: BaseProps = ({ children }) => {
  return (
    <main className="w-full h-full min-h-svh flex flex-col container">
      <header>a placeholder for header</header>
      <div className="grid grid-cols-2 gap-5 h-[70vh] mb-16">
        <section className="bg-red-500 ">ToolBar</section>
        <section className="bg-blue-600 ">{children}</section>
      </div>
      <section className="bg-purple-700 h-96">Score Board</section>
      <footer>a placeholder for footer</footer>
    </main>
  )
}

export default GamesLayout
