import { BorderBeam } from '@/components/common/borderBeam/borderBeam'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { HoldToActionButton } from '@/components/common/holdToAction/holdToActionButton/holdToActionButton'
import { HoldToActionComplete } from '@/components/common/holdToAction/holdToActionComplete/holdToActionComplete'
import { HoldToActionContent } from '@/components/common/holdToAction/holdToActionContent/holdToActionContent'
import { HoldToActionProvider } from '@/components/common/holdToAction/holdToActionProvider'
import { Spinner } from '@/components/common/spinner/spinner'
import DoneIcon from '@/components/icons/done/done.icon'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Fragment } from 'react'
import useDreamMineGameBoardHelper from './dreamMineGameboard.hook'

export default function DreamMineGameBoard() {
  const { onCheckBlock, onClaim, mineConfig, loadingBlock, isMineBlockLoading } = useDreamMineGameBoardHelper()
  return (
    <Card className="w-full max-w-[390px]">
      <CardBody>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="w-full relative overflow-hidden translucent shadow-xl p-4 rounded-lg">
            {mineConfig.isStarted ? (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: 'red',
                  top: `${mineConfig.activeRow * 68}px`,
                  left: '15px',
                  right: '15px',
                  bottom: '20px',
                  background: 'linear-gradient(179.79deg, rgba(22, 26, 31, 0) 0%, #111820 100%)',
                  backdropFilter: 'blur(4px)',
                  zIndex: 2,
                }}
              ></div>
            ) : (
              <></>
            )}
            {mineConfig.isStarted && mineConfig.isGameOver ? (
              <div className="absolute inset-1/2 z-10 w-fit h-fit -translate-x-[50%]">
                <span className="block whitespace-nowrap text-red-700 font-bold text-2xl">Game Over</span>
              </div>
            ) : (
              <></>
            )}

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
                        }}
                      >
                        {Array(+mineConfig.mode.value)
                          .fill(0)
                          .map((_, blockIndex) => {
                            const currentRowSelectedItem = mineConfig.selectedBlocks.find((item) => item.row === row && item.index === blockIndex)
                            const isLoading = loadingBlock?.index === blockIndex && loadingBlock?.row === row
                            const imageSrc = !currentRowSelectedItem
                              ? `/assets/games/mine/images/rock-${blockIndex + 1}.svg`
                              : currentRowSelectedItem.status === 'GOLD'
                                ? `/assets/games/mine/images/gold.svg`
                                : `/assets/games/mine/images/bomb.svg`

                            return (
                              <motion.div
                                key={blockIndex}
                                whileTap={{ scale: 1.1 }}
                                onClick={() => {
                                  row === mineConfig.activeRow && !isMineBlockLoading ? onCheckBlock(blockIndex, row) : null
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
          </div>
          <BorderBeam duration={3} size={300} borderWidth={5} />
        </motion.div>
        <div className="flex flex-col mt-5 px-4">
          <HoldToActionProvider>
            <HoldToActionButton
              onFinish={onClaim}
              resetOnFinish
              duration={3000}
              disabled={(!mineConfig.isStarted && mineConfig.activeRow !== 1) || mineConfig.isGameOver || mineConfig.activeRow < 2}
            >
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
