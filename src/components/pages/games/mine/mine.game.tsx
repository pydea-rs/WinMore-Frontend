import { BorderBeam } from '@/components/common/borderBeam/borderBeam'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { HoldToActionButton } from '@/components/common/holdToAction/holdToActionButton/holdToActionButton'
import { HoldToActionComplete } from '@/components/common/holdToAction/holdToActionComplete/holdToActionComplete'
import { HoldToActionContent } from '@/components/common/holdToAction/holdToActionContent/holdToActionContent'
import { HoldToActionProvider } from '@/components/common/holdToAction/holdToActionProvider'
import { Spinner } from '@/components/common/spinner/spinner'
import DoneIcon from '@/components/icons/done/done.icon'
import { useBackoffMineMutation, useMineBlockMutation } from '@/services/games/mine/mine.service'
import { endMineGame, updateMineConfig } from '@/store/slices/mine/mine.slice'
import { useDispatch, useSelector } from '@/store/store'
import { motion } from 'framer-motion'
import { Howl } from 'howler'
import Image from 'next/image'
import { Fragment, useMemo, useState } from 'react'

export default function MineGame() {
  const tile = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/tile.mp3'], volume: 0.7, preload: true }), [])
  const bomb = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/bomb.mp3'], volume: 0.7, preload: true }), [])
  const { mineConfig } = useSelector((state) => state.mine)
  const dispatch = useDispatch()
  const [bombBlock, setBombBlock] = useState<{ index: number; row: number }[]>([])
  const [mineBlockMutation, { isLoading: isMineBlockLoading }] = useMineBlockMutation()
  const [loadingBlock, setLoadingBlock] = useState<{ index: number; row: number } | null>(null)
  const [backoffMine, { isLoading: isClaiming }] = useBackoffMineMutation()

  const winHandler = () => {
    backoffMine({ id: mineConfig.currentGameId as string })
    dispatch(endMineGame({ isWin: true }))
  }
  const lostHandler = () => {
    dispatch(endMineGame({ isWin: false }))
  }

  const onCheckBlock = async (i: number, row: number) => {
    const block = { index: i, row }

    if (mineConfig.isStarted && !mineConfig.selectedBlocks.includes(block) && !mineConfig.isGameOver && !!mineConfig.currentGameId) {
      setLoadingBlock(block) // Set the loading block

      tile.play()

      try {
        const { data } = await mineBlockMutation({ id: mineConfig.currentGameId }).unwrap()

        if (!data.success) {
          bomb.play()
          setBombBlock([...bombBlock, block])
          lostHandler()
        } else {
          dispatch(updateMineConfig({ selectedBlocks: [...mineConfig.selectedBlocks, block] }))
          dispatch(updateMineConfig({ activeRow: mineConfig.activeRow + 1 }))
        }
      } finally {
        setLoadingBlock(null) // Clear the loading block
      }
    }
  }

  const onClaim = () => {
    if (!mineConfig.isGameOver) {
      winHandler()
    }
  }
  return (
    <Card className="w-full max-w-[390px]">
      <CardBody>
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="w-full relative translucent shadow-xl p-4 rounded-lg">
            {Array(mineConfig.rows)
              .fill('')
              .map((item, rowIndex) => {
                const row = rowIndex + 1
                return (
                  <Fragment key={rowIndex}>
                    <div className="flex items-center gap-5 ">
                      <span>{mineConfig.coefficients[rowIndex]}</span>
                      <div
                        className={`grid gap-3 custom-cursor flex-grow-1 ${row === mineConfig.activeRow ? '' : 'inactive'} `}
                        style={{
                          gridTemplateColumns: `repeat(${mineConfig.mode.value}, minmax(0, 1fr))`,
                          // opacity: `${row <= mineConfig.activeRow ? '100%' : `${80 - (row * mineConfig.rows + 10)}%`}`,
                        }}
                      >
                        {Array(+mineConfig.mode.value)
                          .fill(0)
                          .map((_, blockIndex) => {
                            const isItemSelected = mineConfig.selectedBlocks.find((rows) => rows.row === row)?.index === blockIndex
                            const isBlockMine = bombBlock.find((rows) => rows.row === row)?.index === blockIndex
                            const isLoading = loadingBlock?.index === blockIndex && loadingBlock?.row === row

                            const imageSrc = isBlockMine
                              ? `/assets/games/mine/images/bomb.svg`
                              : isItemSelected
                                ? `/assets/games/mine/images/gold.svg`
                                : `/assets/games/mine/images/rock-${blockIndex + 1}.svg`

                            return (
                              <motion.div
                                key={blockIndex}
                                whileTap={{ scale: 1.1 }}
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
                                  {isLoading ? <Spinner /> : <Image src={imageSrc} alt="block" width={50} height={50} />}
                                </motion.div>
                              </motion.div>
                            )
                          })}
                      </div>
                    </div>
                  </Fragment>
                )
              })}
            <BorderBeam duration={3} size={300} borderWidth={5} />
          </div>
        </motion.main>
        <div className="flex flex-col mt-5 px-4">
          <HoldToActionProvider>
            <HoldToActionButton onFinish={onClaim} resetOnFinish duration={3000} disabled={!mineConfig.isStarted || (mineConfig.activeRow < 2 && !mineConfig.isGameOver)}>
              <HoldToActionContent> Claim {mineConfig.activeRow > 1 ? +mineConfig.betAmount * mineConfig.coefficients[mineConfig.activeRow - 2] : ''}</HoldToActionContent>
              <HoldToActionComplete>
                <DoneIcon className={'absolute-center z-10'} />
              </HoldToActionComplete>
            </HoldToActionButton>
          </HoldToActionProvider>
        </div>
      </CardBody>
    </Card>
  )
}
