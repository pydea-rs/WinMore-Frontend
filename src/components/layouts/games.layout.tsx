import { updateMineConfig } from '@/store/slices/games/games.slice'
import { useDispatch, useSelector } from '@/store/store'
import { BaseProps } from '@/types/global.types'

const GamesLayout: BaseProps = ({ children }) => {
  const { mineConfig } = useSelector((state) => state.game)
  const dispatch = useDispatch()
  const modes = ['easy', 'medium', 'hard']
  const rows = [4, 5, 6, 7, 8]
  return (
    <main className="w-full h-full min-h-svh flex flex-col container">
      <header>a placeholder for header</header>
      <div className="grid grid-cols-1 gap-5 h-[70vh] mb-16">
        <section className="flex flex-col gap-4">
          <input
            className="text-violet-600"
            type="number"
            value={mineConfig.betAmount}
            onChange={(event) => {
              dispatch(updateMineConfig({ betAmount: event.target.value }))
            }}
          />
          <input
            className="text-violet-600"
            type="number"
            value={mineConfig.numberOfBets}
            onChange={(event) => {
              dispatch(updateMineConfig({ numberOfBets: +event.target.value }))
            }}
          />
          <div className="flex gap-2">
            {modes.map((mode) => {
              return (
                <div key={mode}>
                  <label htmlFor={`mode-${mode}`}>{mode}</label>
                  <input
                    id={`mode-${mode}`}
                    type="radio"
                    name="mode"
                    value={mode}
                    checked={mineConfig.mode === mode}
                    onChange={(event) => {
                      //@ts-ignore
                      dispatch(updateMineConfig({ mode: event.target.value || 'easy' }))
                    }}
                  />
                </div>
              )
            })}
          </div>
          <div className="flex gap-2">
            {rows.map((row) => {
              return (
                <div key={row}>
                  <label htmlFor={`row-${row}`}>{row}</label>
                  <input
                    id={`row-${row}`}
                    type="radio"
                    name="row"
                    value={row}
                    checked={mineConfig.rows === row}
                    onChange={(event) => {
                      dispatch(updateMineConfig({ rows: +event.target.value }))
                    }}
                  />
                </div>
              )
            })}
          </div>
        </section>

        <section className="">{children}</section>
      </div>
      <section className="bg-purple-700 h-96">Score Board</section>
      <footer>a placeholder for footer</footer>
    </main>
  )
}

export default GamesLayout
