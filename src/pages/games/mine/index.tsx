import Container from '@/components/common/container/container'
import { Spinner } from '@/components/common/spinner/spinner'
import GameLayout from '@/components/layouts/game.layout'
import MineGame from '@/components/pages/games/dreamMine/dreamMineGameboard/dreamMineGameboard'
import MineConfigForm from '@/components/pages/games/dreamMine/mineConfigForm/mineConfigForm'
import DreamMineHistory from '@/components/snippets/dreamMineHistory/dreamMineHistory'

import { useAuth } from '@/hooks/useAuth'
import { useMineGamesListQuery } from '@/services/games/mine/mine.service'
import { useIsPlayingQuery } from '@/services/user/user.service'
import { useMediaQueries } from '@react-hook/media-query'
import Image from 'next/image'
import { ReactElement } from 'react'

const Mine = () => {
  const { isAuthorized } = useAuth()
  const { isLoading } = useIsPlayingQuery({}, { skip: !isAuthorized })
  const { isLoading: IsGamesListLoading } = useMineGamesListQuery(
    {
      skip: 1,
      take: 10,
    },
    { skip: !isAuthorized },
  )

  const { matches } = useMediaQueries({
    width: '(min-width: 920px)',
  })

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
                  <MineConfigForm />
                </aside>
                <div className="flex justify-center lg:justify-end flex-grow order-1 lg:order-2 pt-6 lg:pt-0 ">
                  <MineGame />
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
                  <div className="absolute top-[15%] left-[50%] w-10 h-10">
                    <Image
                      src={'/assets/images/coin-3.svg'}
                      alt="coin"
                      width={26}
                      height={28}
                      className="vacuum-animate-2"
                      style={{ animationDuration: '27s', animationFillMode: 'backwards', animationDelay: '1s' }}
                    />
                  </div>
                  <div className="absolute top-[25%] left-[46%] w-10 h-10">
                    <Image src={'/assets/images/coin-2.svg'} alt="coin" width={26} height={28} className="vacuum-animate" style={{ animationDuration: '20s' }} />
                  </div>
                  <div className="absolute top-[50%] left-[45%] ">
                    <Image src={'/assets/images/coin-1.svg'} alt="coin" width={50} height={52} className="vacuum-animate-2" style={{ animationDuration: '23s' }} />
                  </div>
                </>
              )}
            </div>
          </section>

          <section>
            <DreamMineHistory />
          </section>
        </>
      )}
    </>
  )
}

Mine.layout = (page: ReactElement) => <GameLayout>{page}</GameLayout>
export default Mine
