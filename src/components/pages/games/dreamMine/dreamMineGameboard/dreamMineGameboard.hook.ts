import { useAuth } from '@/hooks/useAuth'
import { useBackoffMineMutation, useMineBlockMutation, useMineGamesListQuery } from '@/services/games/mine/mine.service'
import { endMineGame, updateMineConfig } from '@/store/slices/mine/mine.slice'
import { IBlock } from '@/store/slices/mine/mine.slice.types'
import { useDispatch, useSelector } from '@/store/store'
import { useMemo, useState } from 'react'

const useDreamMineGameBoardHelper = () => {
  const tile = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/tile.mp3'], volume: 0.7, preload: true }), [])
  const bomb = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/bomb.mp3'], volume: 0.7, preload: true }), [])
  const { mineConfig } = useSelector((state) => state.mine)
  const dispatch = useDispatch()
  const { isAuthorized } = useAuth()
  const [mineBlockMutation, { isLoading: isMineBlockLoading }] = useMineBlockMutation()
  const [loadingBlock, setLoadingBlock] = useState<{ index: number; row: number } | null>(null)
  const { refetch: refetchList } = useMineGamesListQuery({}, { skip: !isAuthorized })
  const [backoffMine] = useBackoffMineMutation()

  const winHandler = async () => {
    await backoffMine({ id: mineConfig.currentGameId as string })
      .unwrap()
      .then((res) => {
        refetchList()
      })
    dispatch(endMineGame({ isWin: true }))
  }
  const lostHandler = () => {
    dispatch(endMineGame({ isWin: false }))
  }

  const onCheckBlock = async (i: number, row: number) => {
    if (mineConfig.isStarted && !mineConfig.isGameOver && !!mineConfig.currentGameId) {
      setLoadingBlock({ index: i, row }) // Set the loading block
      tile.play()

      try {
        const { data } = await mineBlockMutation({ id: mineConfig.currentGameId, choice: i }).unwrap()
        const block: IBlock = { index: i, row, status: data.success ? 'GOLD' : 'MINE' }

        if (!data.success) {
          bomb.play()
          dispatch(updateMineConfig({ selectedBlocks: [...mineConfig.selectedBlocks, block] }))
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
  return { winHandler, lostHandler, onCheckBlock, onClaim, mineConfig, loadingBlock, isMineBlockLoading }
}

export default useDreamMineGameBoardHelper
