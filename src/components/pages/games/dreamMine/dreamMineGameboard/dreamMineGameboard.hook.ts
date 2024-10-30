import { useAuth } from '@/hooks/useAuth'
import { useBackoffMineMutation, useMineBlockMutation, useMineGamesListQuery } from '@/services/games/mine/mine.service'
import { useGetUserTokenBalanceMutation } from '@/services/user/user.service'
import { endMineGame, updateMineConfig } from '@/store/slices/mine/mine.slice'
import { IBlock } from '@/store/slices/mine/mine.slice.types'
import { useDispatch, useSelector } from '@/store/store'
import confetti from 'canvas-confetti'
import { useMemo, useState } from 'react'

const useDreamMineGameBoardHelper = () => {
  const tile = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/tile.mp3'], volume: 0.7, preload: true }), [])
  const bomb = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/bomb.mp3'], volume: 0.7, preload: true }), [])
  const { network, token } = useSelector((state) => state.currency)
  const { mineConfig } = useSelector((state) => state.mine)
  const dispatch = useDispatch()
  const { isAuthorized } = useAuth()
  const [mineBlockMutation, { isLoading: isMineBlockLoading }] = useMineBlockMutation()
  const [loadingBlock, setLoadingBlock] = useState<{ index: number; row: number } | null>(null)
  const { refetch: refetchList } = useMineGamesListQuery(
    {
      skip: 1,
      take: 10,
    },
    { skip: !isAuthorized },
  )
  const [backoffMine] = useBackoffMineMutation()
  const [refetchBalance, {}] = useGetUserTokenBalanceMutation()

  const fireworks = () => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        zIndex: 10000000,
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        zIndex: 10000000,
      })
    }, 250)
  }

  const winHandler = async () => {
    await backoffMine({ id: mineConfig.currentGameId as string })
      .unwrap()
      .then((res) => {
        refetchList()
        refetchBalance({ chain: network.chainId, token: token.symbol })
        dispatch(updateMineConfig({ currentGameStatus: 'WON' }))
        fireworks()
        dispatch(endMineGame({ isWin: true }))
      })
  }
  const lostHandler = () => {
    dispatch(endMineGame({ isWin: false }))
    refetchBalance({ chain: network.chainId, token: token.symbol })
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
