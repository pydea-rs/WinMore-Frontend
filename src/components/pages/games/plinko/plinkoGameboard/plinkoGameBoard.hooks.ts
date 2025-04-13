import { setPlayingPlinkoGameStatus } from '@/store/slices/plinko/plinko.slice'
import { IPlinkoState } from '@/store/slices/plinko/plinko.slice.types'
import { useDispatch, useSelector } from '@/store/store'
import { Howl } from 'howler'
import { useMemo } from 'react'

export type PlinkoSoundsType = { playDrop: () => number | false; playLanding: () => number | false; playCollision: (index: number) => number | false }

const usePlinkoGameBoardHelper = () => {
  const dispatch = useDispatch()
  const plinkoConfig: IPlinkoState = useSelector((state: any) => state.plinko.plinkoConfig)
  const { configs } = useSelector((state) => state.configs)

  const dropSoundTile = useMemo(() => new Howl({ src: ['/assets/games/plinko/sounds/drop.wav'], volume: 1, preload: true }), [])

  const landSoundTile = useMemo(() => new Howl({ src: ['/assets/games/plinko/sounds/land.mp3'], volume: 1, preload: true }), [])
  const collisionSounds = [
    useMemo(() => new Howl({ src: ['/assets/games/plinko/sounds/collision1.mp3'], volume: 1, preload: true }), []),
    useMemo(() => new Howl({ src: ['/assets/games/plinko/sounds/collision2.mp3'], volume: 1, preload: true }), []),
  ]
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
    sounds: {
      playDrop: () => configs.sound && dropSoundTile.play(),
      playLanding: () => configs.sound && landSoundTile.play(),
      playCollision: (index: number) => configs.sound && collisionSounds[index].play(),
    },
  }
}

export default usePlinkoGameBoardHelper
