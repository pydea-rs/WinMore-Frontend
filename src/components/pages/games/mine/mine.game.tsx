import { endMineGame, updateMineConfig } from '@/store/slices/games/games.slice'
import { useDispatch, useSelector } from '@/store/store'
import { motion } from 'framer-motion'
import { Howl } from 'howler'
import Image from 'next/image'
import { Fragment, useMemo, useState } from 'react'

export default function MineGame() {
  const tile = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/tile.mp3'], volume: 0.7, preload: true }), [])
  const bomb = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/bomb.mp3'], volume: 0.7, preload: true }), [])
  const { mineConfig } = useSelector((state) => state.game)
  const dispatch = useDispatch()
  const [bombBlock, setBombBlock] = useState<{ index: number; row: number }[]>([])

  const winHandler = () => {
    dispatch(endMineGame({ isWin: true }))
    console.log('You Win')
  }

  // const checkWinCondition = useCallback(() => {
  //   const totalBlocks = mineConfig.rows * 4
  //   const safeBlocks = totalBlocks - mineConfig.mines.length
  //   if (mineConfig.selectedBlocks.length + 1 === safeBlocks) {
  //     winHandler()
  //   }
  // }, [mineConfig.selectedBlocks])
  // function resolveAfter(): boolean {
  //   const result = Math.random() > 0.5 // Randomly return true or false
  //   // return new Promise((resolve) => {
  //   //   setTimeout(() => {
  //   //     resolve(result)
  //   //   }, 200)
  //   // })
  //   return result
  // }

  const onCheckBlock = async (i: number, row: number) => {
    const block = { index: i, row }
    if (mineConfig.isStarted && !mineConfig.selectedBlocks.includes(block) && !mineConfig.isGameOver) {
      tile.play()
      //todo: if it was bomb
      const isMine = false
      if (isMine) {
        bomb.play()
        setBombBlock([...bombBlock, block])
        // dispatch(endMineGame({ isWin: false })) // Game over, user clicked on a mine
      } else {
        dispatch(updateMineConfig({ selectedBlocks: [...mineConfig.selectedBlocks, block] }))
        dispatch(updateMineConfig({ activeRow: mineConfig.activeRow + 1 }))
        // checkWinCondition()
      }
    }
  }
  const onClaim = () => {
    if (!mineConfig.isGameOver) {
      console.log('claim')
      winHandler()
    }
  }
  console.log(mineConfig.activeRow < 2 && mineConfig.isGameOver && mineConfig.isStarted)
  console.log(mineConfig)

  return (
    <Fragment>
      <div className="max-w-[324px]">
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="w-full translucent shadow-xl p-4 rounded-lg">
            {Array(mineConfig.rows)
              .fill('')
              .map((item, rowIndex) => {
                const row = rowIndex + 1
                return (
                  <div
                    key={rowIndex}
                    className={`grid gap-3 custom-cursor  ${row === mineConfig.activeRow ? '' : 'inactive'} `}
                    style={{
                      gridTemplateColumns: `repeat(${mineConfig.mode}, minmax(0, 1fr))`,
                      opacity: `${row <= mineConfig.activeRow ? '100%' : `${90 - (row * mineConfig.rows + 10)}%`}`,
                    }}
                  >
                    {Array(+mineConfig.mode)
                      .fill(0)
                      .map((_, blockIndex) => {
                        const isItemSelected = mineConfig.selectedBlocks.find((rows) => rows.row === row)?.index === blockIndex
                        const isBlockMine = bombBlock.find((rows) => rows.row === row)?.index === blockIndex

                        const imageSrc = isBlockMine
                          ? `/assets/games/mine/images/bomb.svg`
                          : isItemSelected
                            ? `/assets/games/mine/images/gold.svg`
                            : `/assets/games/mine/images/rock-${blockIndex + 1}.svg`

                        return (
                          <motion.div
                            key={blockIndex}
                            // whileTap={{ scale: 1.1 }}
                            onClick={() => {
                              row === mineConfig.activeRow ? onCheckBlock(blockIndex, row) : null
                            }}
                            className={`transition-all`}
                          >
                            <motion.div
                              key={`block-${blockIndex}`}
                              initial={{ scale: 0.6 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0.6 }}
                              transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                              className="p-0.5 md:p-2"
                            >
                              <Image src={imageSrc} alt="block" width={50} height={50} />
                            </motion.div>
                          </motion.div>
                        )
                      })}
                  </div>
                )
              })}
          </div>
        </motion.main>

        <div className="flex flex-col mt-5 px-4">
          {mineConfig.isStarted ? (
            <motion.button
              onClick={onClaim}
              disabled={mineConfig.activeRow < 2 && !mineConfig.isGameOver}
              className="h-12 disabled:dark:bg-amber-600/10 disabled:cursor-not-allowed disabled:dark:text-zinc-500 w-full rounded-xl p-1 text-base font-semibold shadow transition-all dark:bg-amber-600 dark:focus:ring-2 dark:focus:ring-amber-600 dark:focus:ring-offset-1 dark:focus:ring-offset-secondary-dark"
            >
              Claim
            </motion.button>
          ) : (
            <>
              <motion.button
                onClick={onClaim}
                disabled={true}
                className="h-12 disabled:dark:bg-amber-600/10 disabled:cursor-not-allowed disabled:dark:text-zinc-500 w-full rounded-xl p-1 text-base font-semibold shadow transition-all dark:bg-amber-600 dark:focus:ring-2 dark:focus:ring-amber-600 dark:focus:ring-offset-1 dark:focus:ring-offset-secondary-dark"
              >
                Claim
              </motion.button>
            </>
          )}
        </div>
      </div>
    </Fragment>
  )
}
