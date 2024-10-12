import Container from '@/components/common/container/container'
import { Spinner } from '@/components/common/spinner/spinner'
import MainLayout from '@/components/layouts/main.layout'
import MineGame from '@/components/pages/games/dreamMine/dreamMineGameboard/dreamMineGameboard'
import MineConfigForm from '@/components/pages/games/dreamMine/mineConfigForm/mineConfigForm'
import GameHistory from '@/components/snippets/gameHistory/gameHistory'
import { useAuth } from '@/hooks/useAuth'
import { useIsPlayingMineQuery, useMineGamesListQuery } from '@/services/games/mine/mine.service'
import { ReactElement } from 'react'

const Mine = () => {
  const { isAuthorized } = useAuth()
  const { isLoading } = useIsPlayingMineQuery({}, { skip: !isAuthorized })
  const { isLoading: IsGamesListLoading } = useMineGamesListQuery({ status: 'ONGOING' }, { skip: !isAuthorized })
  return (
    <>
      {isLoading || IsGamesListLoading ? (
        <div className="flex justify-center items-center h-[100vh] w-screen flex-col">
          <Spinner />
          Loading Game
        </div>
      ) : (
        <main>
          <section className="relative z-40 mb-20">
            <Container className="z-10 overflow-x-visible">
              <div className="flex flex-wrap">
                <aside className="w-full lg:max-w-[430px] lg:pt-[6vmax]">
                  <MineConfigForm />
                </aside>
                <div className="flex justify-end flex-grow">
                  <MineGame />
                </div>
              </div>
            </Container>
          </section>

          <section>
            <GameHistory />
          </section>
        </main>
      )}
    </>
  )
}

Mine.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>
export default Mine
