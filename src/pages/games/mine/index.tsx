import GamesLayout from '@/components/layouts/games.layout'
import MineGame from '@/components/pages/mine/mine.game'
import { ReactElement } from 'react'

const Mine = () => {
  return (
    <>
      <MineGame />
    </>
  )
}

Mine.layout = (page: ReactElement) => <GamesLayout>{page}</GamesLayout>
export default Mine
