import GamesLayout from '@/components/layouts/games.layout'
import { ReactElement } from 'react'

const Mine = () => {
  return <div>Mine</div>
}

Mine.layout = (page: ReactElement) => <GamesLayout>{page}</GamesLayout>
export default Mine
