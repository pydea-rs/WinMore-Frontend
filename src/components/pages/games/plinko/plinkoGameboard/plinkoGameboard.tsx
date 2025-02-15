import { BorderBeam } from '@/components/common/borderBeam/borderBeam'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { Spinner } from '@/components/common/spinner/spinner'
import { IPlinkoStatus } from '@/store/slices/plinko/plinko.slice.types'
import { Nullable } from '@/types/global.types'
import { createNumberArray } from '@/utils/createNumberArray.util'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { Fragment } from 'react'
import usePlinkoGameBoardHelper from './plinkoGameBoard.hooks'

export default function PlinkoGameBoard() {
  const { onDropBall, plinkoConfig, loadingBlock, isBallDropping } = usePlinkoGameBoardHelper()
  const rows = createNumberArray(1, plinkoConfig.rows)

  const getGameStateColor = (status: Nullable<IPlinkoStatus>) => {
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
              {plinkoConfig.isStarted && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: 'red',
                    top: `${plinkoConfig.rows * 16 + plinkoConfig.rows * 60 - 8}px`,
                    left: '35px',
                    right: '-5px',
                    bottom: '-5px',
                    background: 'linear-gradient(179.79deg, rgba(22, 26, 31, 0) 0%, #111820 100%)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 2,
                  }}
                ></div>
              )}

              {rows.map((row, rowIndex) => (
                <Fragment key={row}>
                  <div className="flex flex-col gap-y-4">
                    <div className="flex items-center justify-center gap-x-4">
                      {plinkoConfig.multipliers[plinkoConfig.mode.label.toLowerCase()].map((multiplier: number, index: number) => (
                        <motion.div key={`${row}-${index}`} className="relative" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2, delay: index * 0.05 }}>
                          <motion.div
                            className={classNames('relative cursor-pointer transition-all duration-300', {
                              'animate-pulse': loadingBlock?.index === index && loadingBlock?.dropping,
                            })}
                          >
                            {loadingBlock?.index === index && loadingBlock?.dropping ? (
                              <Spinner className="w-[55px] h-[60px]" />
                            ) : (
                              <div className="w-[55px] h-[60px] flex items-center justify-center bg-gray-800 rounded-md">
                                <span className="text-white">{multiplier}x</span>
                              </div>
                            )}
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          <BorderBeam
            className="rounded-[20px]"
            duration={3}
            size={500}
            borderWidth={5}
            colorFrom={getGameStateColor(plinkoConfig.currentGameStatus).colorFrom}
            colorTo={getGameStateColor(plinkoConfig.currentGameStatus).colorTo}
          />
        </motion.div>
      </CardBody>
    </Card>
  )
}
