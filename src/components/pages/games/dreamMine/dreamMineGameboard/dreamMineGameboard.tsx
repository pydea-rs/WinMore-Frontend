import { BorderBeam } from '@/components/common/borderBeam/borderBeam'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { HoldToActionButton } from '@/components/common/holdToAction/holdToActionButton/holdToActionButton'
import { HoldToActionComplete } from '@/components/common/holdToAction/holdToActionComplete/holdToActionComplete'
import { HoldToActionContent } from '@/components/common/holdToAction/holdToActionContent/holdToActionContent'
import { HoldToActionProvider } from '@/components/common/holdToAction/holdToActionProvider'
import { Spinner } from '@/components/common/spinner/spinner'
import DoneIcon from '@/components/icons/done/done.icon'
import { IMineGameStatus } from '@/store/slices/mine/mine.slice.types'
import { Nullable } from '@/types/global.types'
import { createNumberArray } from '@/utils/createNumberArray.util'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Fragment } from 'react'
import useDreamMineGameBoardHelper from './dreamMineGameBoard.hooks'

export default function DreamMineGameBoard() {
  const { onCheckBlock, onClaim, mineConfig, loadingBlock, isMineBlockLoading } = useDreamMineGameBoardHelper()
  const blockPerRows = createNumberArray(1, mineConfig.mode.value)

  const getGameStateColor = (status: Nullable<IMineGameStatus>) => {
    switch (status) {
      case 'LOST': {
        return {
          colorFrom: '#F40F46',
          colorTo: '#BF9C2C',
        }
      }

      case 'WON': {
        return {
          colorFrom: '#1db954',
          colorTo: '#1db954',
        }
      }

      case 'NOT_STARTED': {
        return {
          colorFrom: '#ffaa40',
          colorTo: '#ffaa40',
        }
      }

      case 'ONGOING': {
        return {
          colorFrom: '#ffaa40',
          colorTo: '#ffaa40',
        }
      }

      case 'WITHDRAWN': {
        return {
          colorFrom: '#ffaa40',
          colorTo: '#ffaa40',
        }
      }

      default: {
        return {
          colorFrom: '#ffaa40',
          colorTo: '#ffaa40',
        }
      }
    }
  }

  return (
    <Card className="w-full max-w-[410px]">
      <CardBody className="p-4 sm:p-6">
        <motion.div className="rounded-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="w-full relative overflow-hidden translucent shadow-xl p-4 rounded-lg">
            <div className="relative flex flex-col gap-y-4">
              {mineConfig.isStarted || (!mineConfig.isStarted && mineConfig.isGameOver) ? (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: 'red',
                    top: `${mineConfig.activeRow * 16 + mineConfig.activeRow * 60 - 8}px`,
                    left: '35px',
                    right: '-5px',
                    bottom: '-5px',
                    background: 'linear-gradient(179.79deg, rgba(22, 26, 31, 0) 0%, #111820 100%)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 2,
                  }}
                ></div>
              ) : (
                <></>
              )}
              {!mineConfig.isStarted && mineConfig.isGameOver ? (
                <div className="absolute inset-1/2 z-10 w-fit h-fit -translate-x-[50%]">
                  <span className="block whitespace-nowrap text-red-700 font-bold text-2xl">Game Over</span>
                </div>
              ) : (
                <></>
              )}

              {Array(mineConfig.rows)
                .fill(null)
                .map((_, row) => {
                  return (
                    <Fragment key={row}>
                      <div className="flex items-center gap-x-4 sm:gap-x-5">
                        <div
                          className={classNames({
                            'flex justify-center items-center text-xs w-12 h-6 rounded-full border': true,
                            'border-green-500': row + 1 < mineConfig.activeRow,
                            'border-[#798998]': row + 1 === mineConfig.activeRow,
                            'border-[#3B3D47CC]': row + 1 > mineConfig.activeRow,
                          })}
                        >
                          <span className="relative top-[1px] font-fractul font-medium">x{mineConfig.mode.coefficient[row]?.toFixed(2)}</span>
                        </div>
                        <div
                          // grid gap-3 custom-cursor flex-grow-1
                          className={`flex  custom-cursor flex-grow-1 h-[60px] w-full ${mineConfig.mode.label === 'EASY' ? 'justify-between' : 'justify-around'} ${row === mineConfig.activeRow ? '' : 'inactive'} `}
                          style={{
                            gridTemplateColumns: `repeat(${mineConfig.mode.value}, minmax(0, 1fr))`,
                          }}
                        >
                          {blockPerRows.map((block) => {
                            const currentRowSelectedItem = mineConfig.selectedBlocks.find((item) => item.row === row + 1 && item.index === block)
                            const isLoading = loadingBlock?.index === block && loadingBlock?.row === row + 1
                            const imageSrc =
                              mineConfig.selectedBlocks.length && (row + 1 < mineConfig.activeRow || mineConfig.isGameOver)
                                ? currentRowSelectedItem?.status === 'NULL'
                                  ? `/assets/games/mine/images/bomb.svg`
                                  : `/assets/games/mine/images/gold.svg`
                                : `/assets/games/mine/images/rock-${block}.svg`

                            return (
                              <motion.div
                                key={block}
                                whileTap={{ scale: 1.1 }}
                                onClick={() => {
                                  row + 1 === mineConfig.activeRow && !isMineBlockLoading ? onCheckBlock(block, row + 1) : null
                                }}
                                // className={`transition-all flex-shrink-0 ${currentRowSelectedItem?.status === 'GOLD' ? 'block-gold' : `block-${block}`}`}>
                                className={`transition-all flex-shrink-0 block-stone`}
                              >
                                <motion.div
                                  key={`block-${block}`}
                                  initial={{ scale: 0.6 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0.6 }}
                                  transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                                  className="flex justify-center items-center h-full w-full"
                                >
                                  {isLoading ? (
                                    <Spinner />
                                  ) : (
                                    <Image
                                      src={imageSrc}
                                      alt="block"
                                      className={classNames({
                                        'opacity-50': mineConfig.isStarted && row + 1 !== mineConfig.activeRow && currentRowSelectedItem?.status !== 'GOLD',
                                      })}
                                      width={55}
                                      height={60}
                                    />
                                  )}
                                </motion.div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>
                    </Fragment>
                  )
                })}
            </div>
          </div>

          <BorderBeam
            className="rounded-[20px]"
            duration={3}
            size={400}
            borderWidth={3}
            colorFrom={getGameStateColor(mineConfig.currentGameStatus).colorFrom}
            colorTo={getGameStateColor(mineConfig.currentGameStatus).colorTo}
          />
        </motion.div>
        <div className="flex flex-col pt-5">
          <HoldToActionProvider>
            <HoldToActionButton
              onFinish={onClaim}
              resetOnFinish
              duration={3000}
              disabled={(!mineConfig.isStarted && mineConfig.activeRow !== 1) || mineConfig.isGameOver || mineConfig.activeRow < 2}
            >
              <HoldToActionContent> Hold to Stop and Earn {mineConfig.activeRow > 1 ? mineConfig.stake : ''}</HoldToActionContent>
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
