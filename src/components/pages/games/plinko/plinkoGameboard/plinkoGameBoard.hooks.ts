import { endPlinkoGame, updatePlinkoConfig } from '@/store/slices/plinko/plinko.slice'
import { useDispatch, useSelector } from '@/store/store'
import { useState } from 'react'
const usePlinkoGameBoardHelper = () => {
  const dispatch = useDispatch()
  const plinkoConfig = useSelector((state: any) => state.plinko.plinkoConfig)
  const [loadingBlock, setLoadingBlock] = useState<{ index: number; dropping: boolean }>({ index: 0, dropping: false })
  const [isBallDropping, setIsBallDropping] = useState(false)

  const winHandler = () => {
    dispatch(updatePlinkoConfig({ currentGameStatus: 'WON' }))
    // fireworks()
    dispatch(endPlinkoGame({ hasWon: true }))
  }

  const lostHandler = () => {
    dispatch(endPlinkoGame({ hasWon: false }))
  }

  const onDropBall = async (path: number[]) => {
    if (plinkoConfig.isStarted && plinkoConfig.currentGameStatus === 'ONGOING') {
      setLoadingBlock({ index: path[0], dropping: true })

      try {
        // Simulate random win/loss
        const success = Math.random() > 0.5

        if (!success) {
          dispatch(updatePlinkoConfig({ ballPath: path }))
          lostHandler()
        } else {
          dispatch(
            updatePlinkoConfig({
              ballPath: path,
              multipliers: plinkoConfig.multipliers, // Keep existing multipliers
            }),
          )
          winHandler()
        }
      } finally {
        setTimeout(() => {
          setLoadingBlock({ index: 0, dropping: false })
        }, 1000) // Add slight delay to make animation visible
      }
    }
  }

  return {
    onDropBall,
    plinkoConfig,
    loadingBlock,
    isBallDropping,
  }
}

export default usePlinkoGameBoardHelper
