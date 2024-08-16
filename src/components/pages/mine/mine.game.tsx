import { useSelector } from '@/store/store'
import TileLogo from '@assets/games/mine/images/rock-1.svg'
import BombLogo from '@assets/games/mine/images/rock-2.svg'
import { motion } from 'framer-motion'
import { Howl } from 'howler'
import Image from 'next/image'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { generateMines } from './lib/config'

export default function MineGame() {
  const tile = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/tile.mp3'], volume: 0.7, preload: true }), [])
  const bomb = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/bomb.mp3'], volume: 0.7, preload: true }), [])
  const { mineConfig } = useSelector((state) => state.game)

  const [gameData, setGameData] = useState<{ mines: number[]; isGameOver?: boolean }>({ mines: generateMines(2) })

  const [clickBlocks, setClickBlocks] = useState<number[]>([])

  const onCheckBlock = useCallback(
    (i: number) => {
      if (!gameData.isGameOver && !clickBlocks.includes(i)) {
        tile.play()
        if (gameData.mines.includes(i)) {
          bomb.play()
          setGameData((e) => ({ ...e, isGameOver: true }))
          setClickBlocks((e) => [...e, i])
        } else {
          setClickBlocks((e) => [...e, i])
        }
      }
    },
    [bomb, clickBlocks, gameData.isGameOver, gameData.mines, tile],
  )

  const onRestart = useCallback(() => {
    setClickBlocks([])
    setGameData((e) => ({ mines: generateMines(), isGameOver: false }))
    tile.play()
  }, [tile])

  useEffect(() => {
    switch (mineConfig.mode) {
      case 'easy':
        setGameData((prev) => ({ ...prev, mines: generateMines(2) }))
        break
      case 'medium':
        setGameData((prev) => ({ ...prev, mines: generateMines(3) }))
        break
      case 'hard':
        setGameData((prev) => ({ ...prev, mines: generateMines(4) }))
        break

      default:
        break
    }
  }, [mineConfig.mode])

  return (
    <Fragment>
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="w-full translucent shadow-xl p-4 rounded-lg">
          <div className={`grid grid-cols-${4}`}>
            {Array(4 * mineConfig.rows)
              .fill(0)
              .map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 0.9 }}
                  whileTap={{ scale: 1.1 }}
                  onClick={() => onCheckBlock(i)}
                  className={`${gameData?.isGameOver || clickBlocks.includes(i) ? (gameData?.mines.includes(i) ? 'tile-bomb' : 'tile-star') : 'tile-active'} transition-all`}
                >
                  {gameData?.isGameOver || clickBlocks.includes(i) ? (
                    <motion.div
                      key={`block-${i}`}
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.6 }}
                      transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                      className="p-0.5 md:p-2"
                    >
                      <Image
                        src={gameData?.mines.includes(i) ? BombLogo : TileLogo}
                        priority
                        alt={gameData?.mines.includes(i) ? 'bomb' : 'tile'}
                        className="object-cover w-full h-full"
                      />
                    </motion.div>
                  ) : null}
                </motion.div>
              ))}
          </div>
          <div className="flex flex-col mt-5 px-4">
            <motion.button
              onClick={onRestart}
              disabled={!gameData?.isGameOver}
              className="h-12 disabled:dark:bg-amber-600/10 disabled:cursor-not-allowed disabled:dark:text-zinc-500 w-full rounded-xl p-1 text-base font-semibold shadow transition-all dark:bg-amber-600 dark:focus:ring-2 dark:focus:ring-amber-600 dark:focus:ring-offset-1 dark:focus:ring-offset-secondary-dark"
            >
              Restart
            </motion.button>
          </div>
        </div>
      </motion.main>
    </Fragment>
  )
}
