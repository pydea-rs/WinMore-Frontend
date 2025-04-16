import { IPlinkoState } from '@/store/slices/plinko/plinko.slice.types'
import { useSelector } from '@/store/store'
import { Howl } from 'howler'
import { useMemo } from 'react'

export type PlinkoSoundsType = { playDrop: () => number | false; playLanding: () => number | false; playCollision: (index: number) => number | false }

const usePlinkoGameBoardHelper = () => {
  const plinkoConfig: IPlinkoState = useSelector((state: any) => state.plinko.plinkoConfig)
  const { configs } = useSelector((state) => state.configs)

  const dropSoundTile = useMemo(() => new Howl({ src: ['/assets/games/plinko/sounds/drop.wav'], volume: 1, preload: true }), [])

  const landSoundTile = useMemo(() => new Howl({ src: ['/assets/games/plinko/sounds/land.mp3'], volume: 1, preload: true }), [])
  const celebrationSoundTile = useMemo(() => new Howl({ src: ['/assets/games/common/sounds/celebration.mp3'], volume: 1, preload: true }), [])

  const collisionSounds = [
    useMemo(() => new Howl({ src: ['/assets/games/plinko/sounds/collision1.mp3'], volume: 1, preload: true }), []),
    useMemo(() => new Howl({ src: ['/assets/games/plinko/sounds/collision2.mp3'], volume: 1, preload: true }), []),
  ]

  return {
    plinkoConfig,
    sounds: {
      playDrop: () => configs.sound && dropSoundTile.play(),
      playLanding: () => configs.sound && landSoundTile.play(),
      playCollision: (index: number) => configs.sound && collisionSounds[index].play(),
      playCelebration: () => configs.sound && celebrationSoundTile.play(),
    },
  }
}

export default usePlinkoGameBoardHelper
