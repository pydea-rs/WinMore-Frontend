import { endMineGame, startMineGame, updateMineConfig } from '@/store/slices/games/games.slice'
import { useDispatch, useSelector } from '@/store/store'
import { motion } from 'framer-motion'
import { Howl } from 'howler'
import { Fragment, useCallback, useMemo } from 'react'
// import PickAxeCursor from "@assets/games/mine/images/pickaxe.png"

export default function MineGame() {
  const tile = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/tile.mp3'], volume: 0.7, preload: true }), [])
  const bomb = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/bomb.mp3'], volume: 0.7, preload: true }), [])
  const { mineConfig } = useSelector((state) => state.game)
  const dispatch = useDispatch()

  const winHandler = () => {
    dispatch(endMineGame({ isWin: true }))
    console.log('You Win')
  }

  const checkWinCondition = useCallback(() => {
    const totalBlocks = mineConfig.rows * 4
    const safeBlocks = totalBlocks - mineConfig.mines.length
    if (mineConfig.selectedBlocks.length + 1 === safeBlocks) {
      winHandler()
    }
  }, [mineConfig.selectedBlocks])

  const onCheckBlock = useCallback(
    (i: number) => {
      if (mineConfig.isStarted && !mineConfig.selectedBlocks.includes(i) && !mineConfig.isGameOver) {
        tile.play()
        if (mineConfig.mines.includes(i)) {
          bomb.play()
          dispatch(endMineGame({ isWin: false })) // Game over, user clicked on a mine
          console.log('Game Over! You clicked on a mine.')
        } else {
          const newSelectedBlocks = [...mineConfig.selectedBlocks, i]
          dispatch(updateMineConfig({ selectedBlocks: newSelectedBlocks }))
          checkWinCondition()
        }
      }
    },
    [bomb, mineConfig, tile, dispatch, checkWinCondition],
  )

  const onStart = useCallback(() => {
    dispatch(startMineGame({}))
    tile.play()
  }, [dispatch, tile])

  const onClaim = () => {
    if (!mineConfig.isGameOver) {
      console.log('claim')
      winHandler()
    }
  }
  const renderTile = (i: number) => {
    // mineConfig?.isGameOver || mineConfig.selectedBlocks.includes(i) ? mineConfig?.mines.includes(i) ? 'tile-bomb' : 'tile-star' : 'tile-active'}
    if (mineConfig?.isGameOver || mineConfig.selectedBlocks.includes(i)) {
      if (mineConfig?.mines.includes(i)) {
        return 'tile-bomb '
      } else {
        return 'tile-star '
      }
    } else {
      return 'tile-active '
    }
  }
  return (
    <Fragment>
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="w-full translucent shadow-xl p-4 rounded-lg">
          <div className={`grid grid-cols-4 custom-cursor`}>
            {Array(mineConfig.rows * 4)
              .fill(0)
              .map((_, i) => (
                <motion.div key={i} whileHover={{ scale: 0.9 }} whileTap={{ scale: 1.1 }} onClick={() => onCheckBlock(i)} className={`${renderTile(i)} transition-all`}>
                  {mineConfig?.isStarted || mineConfig.selectedBlocks.includes(i) ? (
                    <motion.div
                      key={`block-${i}`}
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.6 }}
                      transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                      className="p-0.5 md:p-2"
                    >
                      {/* <Image src={mineConfig.isGameOver && mineConfig?.mines.includes(i) ? BombLogo : TileLogo} priority alt={'tile'} className="object-cover w-full h-full" /> */}
                    </motion.div>
                  ) : null}
                </motion.div>
              ))}
          </div>
          <div className="flex flex-col mt-5 px-4">
            <motion.button
              onClick={onStart}
              disabled={mineConfig.isStarted && !mineConfig.isGameOver}
              className="h-12 disabled:dark:bg-amber-600/10 disabled:cursor-not-allowed disabled:dark:text-zinc-500 w-full rounded-xl p-1 text-base font-semibold shadow transition-all dark:bg-amber-600 dark:focus:ring-2 dark:focus:ring-amber-600 dark:focus:ring-offset-1 dark:focus:ring-offset-secondary-dark"
            >
              Start
            </motion.button>
            <motion.button
              onClick={onClaim}
              disabled={!mineConfig.isStarted || mineConfig.isGameOver}
              className="h-12 disabled:dark:bg-amber-600/10 disabled:cursor-not-allowed disabled:dark:text-zinc-500 w-full rounded-xl p-1 text-base font-semibold shadow transition-all dark:bg-amber-600 dark:focus:ring-2 dark:focus:ring-amber-600 dark:focus:ring-offset-1 dark:focus:ring-offset-secondary-dark"
            >
              Claim
            </motion.button>
          </div>
        </div>
      </motion.main>
    </Fragment>
  )
}
