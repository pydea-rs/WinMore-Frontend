import { setPlayingPlinkoGameStatus } from '@/store/slices/plinko/plinko.slice'
import { IPlinkoState } from '@/store/slices/plinko/plinko.slice.types'
import { useDispatch, useSelector } from '@/store/store'
const usePlinkoGameBoardHelper = () => {
  const dispatch = useDispatch()
  const plinkoConfig: IPlinkoState = useSelector((state: any) => state.plinko.plinkoConfig)

  const winHandler = () => {
    dispatch(setPlayingPlinkoGameStatus('FINISHED'))
    // fireworks()
    // dispatch(endPlinkoGame({ hasWon: true })) // FIXME
  }

  const lostHandler = () => {
    // dispatch(endPlinkoGame({ hasWon: false })) // FIXME
  }

  return {
    plinkoConfig,
  }
}

export default usePlinkoGameBoardHelper
