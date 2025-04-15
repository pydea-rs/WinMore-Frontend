import Container from '@/components/common/container/container'
import { Spinner } from '@/components/common/spinner/spinner'
import GameLayout from '@/components/layouts/game.layout'
import PlinkoConfigForm from '@/components/pages/games/plinko/plinkoConfigForm/plinkoConfigForm'
import PlinkoGameBoard from '@/components/pages/games/plinko/plinkoGameboard/plinkoGameboard'
import PlinkoHistory from '@/components/pages/games/plinko/plinkoHistory'
import { useAuth } from '@/hooks/useAuth'
import NotFoundPage from '@/pages/404'
import { useGetPlinkoGamesListQuery } from '@/services/games/plinko/plinko.service'
// import { usePlinkoGamesListQuery } from '@/services/games/plinko/plinko.service'
import { useIsPlayingQuery } from '@/services/user/user.service'
import { isDevelopmentMode } from '@/utils/dev'
import { useMediaQueries } from '@react-hook/media-query'
import Image from 'next/image'
import { ReactElement } from 'react'

const Plinko = () => {
  const { isAuthorized } = useAuth()
  const { isLoading } = useIsPlayingQuery({}, { skip: !isAuthorized })
  const { isLoading: IsGamesListLoading } = useGetPlinkoGamesListQuery(
    {
      take: 10,
    },
    { skip: !isAuthorized },
  ) // FIXME: Update this section after backend implementation.

  const { matches } = useMediaQueries({
    width: '(min-width: 920px)',
  })

  if (!isDevelopmentMode()) {
    return <NotFoundPage />
  }

  return (
    <>
      {isLoading || IsGamesListLoading ? (
        <div className="flex justify-center items-center h-[100vh] w-screen flex-col">
          <Spinner />
          Loading Game
        </div>
      ) : (
        <>
          <section className="relative mb-20">
            <Container className="relative z-[300] overflow-x-visible ">
              <div className="flex flex-wrap gap-y-6">
                <aside className="flex justify-center lg:justify-start w-full lg:max-w-[430px] lg:pt-[6vmax] order-2">
                  <PlinkoConfigForm />
                </aside>
                <div className="flex justify-center lg:justify-end flex-grow order-1 lg:order-2 pt-6 lg:pt-0 ">
                  <PlinkoGameBoard />
                </div>
              </div>
            </Container>
            <div className="absolute left-0 right-0 top-0 min-h-[920px]">
              <div
                className="absolute left-0 right-0 top-40 md:top-auto md:bottom-0 bg-no-repeat h-[500px] bg-bottom pointer-events-none"
                style={{ backgroundImage: `url("/assets/images/wave.svg")`, backgroundSize: 'auto 520px' }}
              ></div>
            </div>

            <div
              className="absolute top-0 left-0 right-0
            bottom-0 z-1 pointer-events-none "
            >
              <div className="absolute top-[-3%] left-[10%] lg:top-[40%] lg:left-auto lg:right-[10%]">
                <Image src={'/assets/images/coin-5.svg'} alt="coin" width={26} height={28} className="vacuum-animate-3" />
              </div>
              <div className="absolute top-[-2%] right-[10%] lg:right-auto lg:top-[10%] lg:left-[37%] w-10 h-10">
                <Image
                  src={'/assets/images/coin-4.svg'}
                  alt="coin"
                  width={20}
                  height={22}
                  className="vacuum-animate "
                  style={{ animationDuration: '25s', animationFillMode: 'backwards' }}
                />
              </div>
              {matches && (
                <>
                  <div className="absolute top-[20%] left-[37%]">
                    <Image src={'/assets/images/coin-3.svg'} alt="coin" width={32} height={34} className="vacuum-animate-2" />
                  </div>
                  <div className="absolute top-[30%] right-[37%]">
                    <Image src={'/assets/images/coin-2.svg'} alt="coin" width={26} height={28} className="vacuum-animate-3" />
                  </div>
                  <div className="absolute top-[10%] right-[27%]">
                    <Image src={'/assets/images/coin-1.svg'} alt="coin" width={20} height={22} className="vacuum-animate" />
                  </div>
                </>
              )}
            </div>
          </section>
          <PlinkoHistory />
        </>
      )}
    </>
  )
}

Plinko.getLayout = function getLayout(page: ReactElement) {
  return <GameLayout>{page}</GameLayout>
}

export default Plinko
