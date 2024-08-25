import { startMineGame, updateMineConfig } from '@/store/slices/games/games.slice'
import { useDispatch, useSelector } from '@/store/store'
import { BaseProps } from '@/types/global.types'
import { motion } from 'framer-motion'
import { useCallback, useMemo } from 'react'

const MineLayout: BaseProps = ({ children }) => {
  const { mineConfig } = useSelector((state) => state.game)
  const dispatch = useDispatch()
  const modes = [
    {
      label: 'Easy',
      value: 4,
    },
    {
      label: 'Medium',
      value: 3,
    },
    {
      label: 'Hard',
      value: 2,
    },
  ]
  const rows = [4, 5, 6, 7, 8]
  const tile = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/tile.mp3'], volume: 0.7, preload: true }), [])

  const onStart = useCallback(() => {
    dispatch(startMineGame({}))
    tile.play()
  }, [dispatch, tile])

  return (
    <main className="w-full h-full min-h-svh flex flex-col container">
      <header>a placeholder for header</header>
      <div className="grid grid-cols-1 gap-5  mb-16">
        <aside className="flex flex-col gap-4">
          <input
            disabled={mineConfig.isStarted}
            className="text-violet-600"
            type="number"
            value={mineConfig.betAmount}
            onChange={(event) => {
              !mineConfig.isStarted ? dispatch(updateMineConfig({ betAmount: event.target.value })) : null
            }}
          />
          <input
            disabled={mineConfig.isStarted}
            className="text-violet-600"
            type="number"
            value={mineConfig.numberOfBets}
            onChange={(event) => {
              !mineConfig.isStarted ? dispatch(updateMineConfig({ numberOfBets: +event.target.value })) : null
            }}
          />
          <div className="flex gap-2">
            mode:
            {modes.map((mode) => {
              return (
                <div key={mode.value}>
                  <label htmlFor={`mode-${mode.label}`}>{mode.label}</label>
                  <input
                    disabled={mineConfig.isStarted}
                    id={`mode-${mode.label}`}
                    type="radio"
                    name="mode"
                    value={mode.value}
                    checked={mineConfig.mode === mode.value}
                    onChange={(event) => {
                      //@ts-ignore
                      !mineConfig.isStarted ? dispatch(updateMineConfig({ mode: +event.target.value || 4 })) : null
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
                    disabled={mineConfig.isStarted}
                    id={`row-${row}`}
                    type="radio"
                    name="row"
                    value={row}
                    checked={mineConfig.rows === row}
                    onChange={(event) => {
                      !mineConfig.isStarted ? dispatch(updateMineConfig({ rows: +event.target.value })) : null
                    }}
                  />
                </div>
              )
            })}
          </div>
          <motion.button
            onClick={onStart}
            disabled={mineConfig.isStarted && !mineConfig.isGameOver}
            className="h-12 disabled:dark:bg-amber-600/10 disabled:cursor-not-allowed disabled:dark:text-zinc-500 w-full rounded-xl p-1 text-base font-semibold shadow transition-all dark:bg-amber-600 dark:focus:ring-2 dark:focus:ring-amber-600 dark:focus:ring-offset-1 dark:focus:ring-offset-secondary-dark"
          >
            Start
          </motion.button>
        </aside>

        <section className="">{children}</section>
      </div>
      <section className="bg-purple-700 h-96">Score Board</section>
      <footer>a placeholder for footer</footer>
    </main>
  )
}

export default MineLayout
