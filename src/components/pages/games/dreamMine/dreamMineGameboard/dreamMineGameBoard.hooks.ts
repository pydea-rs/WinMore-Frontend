import useWalletStateHelper from '@/components/pages/wallet/walletStateHelper'
import { useAuth } from '@/hooks/useAuth'
import { useBackoffMineMutation, useMineBlockMutation } from '@/services/games/mine/mine.service'
import { endMineGame, setDreamMineConfig } from '@/store/slices/mine/mine.slice'
import { IBlock } from '@/store/slices/mine/mine.slice.types'
import { useDispatch, useSelector } from '@/store/store'
import { useMemo, useState } from 'react'
import { celebratingAnimation } from '../../common/animations'

const useDreamMineGameBoardHelper = () => {
  const breakBlockSound = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/break.mp3'], volume: 0.7, preload: true }), [])
  const bomb = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/bomb.mp3'], volume: 0.7, preload: true }), [])
  const celebrationSound = useMemo(() => new Howl({ src: ['/assets/games/common/sounds/celebration.mp3'], volume: 0.7, preload: true }), [])
  const errorSoundHowl = useMemo(() => new Howl({ src: ['/assets/games/common/sounds/error.mp3'], volume: 0.7, preload: true }), [])

  const { mineConfig } = useSelector((state) => state.mine)
  const { configs } = useSelector((state) => state.configs)
  const dispatch = useDispatch()
  const { isAuthorized } = useAuth()
  const [mineBlockMutation, { isLoading: isMineBlockLoading }] = useMineBlockMutation()
  const { fetchBalance } = useWalletStateHelper()
  const [loadingBlock, setLoadingBlock] = useState<{ index: number; row: number } | null>(null)

  const [backoffMine] = useBackoffMineMutation()

  const winHandler = async () => {
    // FIXME: Also handle FLAWLESS_WIN
    if (mineConfig.currentGameId == null) {
      throw new Error('Game id must be specified!')
    }
    await backoffMine({ id: mineConfig.currentGameId })
      .unwrap()
      .then((res) => {
        const blocks = res.data.nulls.map((nullIndex, rowIndex) => ({ index: nullIndex, row: rowIndex + 1, status: 'NULL' }) as IBlock)
        dispatch(endMineGame({ isWin: true, blocks }))
        if (configs.sound) celebrationSound.play()
        fetchBalance()
        celebratingAnimation()
      })
  }
  const lostHandler = (blocks: IBlock[]) => {
    dispatch(endMineGame({ isWin: false, blocks }))
    fetchBalance()
  }

  const onCheckBlock = async (i: number, row: number) => {
    if (mineConfig.isStarted && !mineConfig.isGameOver && !!mineConfig.currentGameId) {
      setLoadingBlock({ index: i, row }) // Set the loading block
      if (configs.sound) breakBlockSound.play()

      try {
        const { data } = await mineBlockMutation({ id: mineConfig.currentGameId, choice: i }).unwrap()
        const previousBlocks = data.nulls.map((nullIndex, rowIndex) => ({ index: nullIndex, row: rowIndex + 1, status: 'NULL' }) as IBlock)
        if (!data.success) {
          if (configs.sound) bomb.play()
          lostHandler(previousBlocks)
        } else {
          dispatch(setDreamMineConfig({ selectedBlocks: previousBlocks, activeRow: mineConfig.activeRow + 1 }))
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
  return { winHandler, lostHandler, onCheckBlock, onClaim, mineConfig, loadingBlock, isMineBlockLoading, playErrorSound: () => configs.sound && errorSoundHowl.play() }
}

export default useDreamMineGameBoardHelper
