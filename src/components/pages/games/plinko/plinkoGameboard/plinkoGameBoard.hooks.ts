import { setPlayingPlinkoGameStatus, setPlinkoConfig } from '@/store/slices/plinko/plinko.slice'
import { IPlinkoState } from '@/store/slices/plinko/plinko.slice.types'
import { useDispatch, useSelector } from '@/store/store'
import { useState } from 'react'
const usePlinkoGameBoardHelper = () => {
  const dispatch = useDispatch()
  const plinkoConfig: IPlinkoState = useSelector((state: any) => state.plinko.plinkoConfig)
  const [isBallDropping, setIsBallDropping] = useState(false)

  const winHandler = () => {
    dispatch(setPlayingPlinkoGameStatus('FINISHED'))
    // fireworks()
    // dispatch(endPlinkoGame({ hasWon: true })) // FIXME
  }

  const lostHandler = () => {
    // dispatch(endPlinkoGame({ hasWon: false })) // FIXME
  }

  const onDropBall = async (path: number[]) => {
    if (plinkoConfig.playing?.status === 'DROPPING') {
      try {
        // Simulate random win/loss
        const success = Math.random() > 0.5

        if (!success) {
          // dispatch(setPlinkoConfig({  })) // TODO:
          lostHandler()
        } else {
          dispatch(
            setPlinkoConfig({
              multipliers: plinkoConfig.multipliers, // Keep existing multipliers
            }),
          )
          winHandler()
        }
      } finally {
      }
    }
  }

  return {
    onDropBall,
    plinkoConfig,
    isBallDropping,
  }
}

export default usePlinkoGameBoardHelper
