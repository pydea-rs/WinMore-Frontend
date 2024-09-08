import MineLayout from '@/components/layouts/mine.layout'
import MineGame from '@/components/pages/games/mine/mine.game'
import { ReactElement } from 'react'

const Mine = () => {
  return <MineGame />
}

Mine.layout = (page: ReactElement) => <MineLayout>{page}</MineLayout>
export default Mine
