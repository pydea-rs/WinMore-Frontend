import { Button } from '@/components/common/button/button'
import Container from '@/components/common/container/container'
import ArrowRightIcon from '@/components/icons/arrowRight'
import GameControllerIcon from '@/components/icons/game-controller'
import { internalLinks } from '@/configs/app-routes'
import { ElementProps } from '@/types/elements.types'
import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const TopGames: React.FC<ElementProps> = (props) => {
  const { className } = props
  const router = useRouter()
  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <section className={classList}>
      <Container className="overflow-x-visible">
        <div className="flex items-end">
          <div className="flex items-center gap-x-2 pr-4 py-8 md:p-4 md:pl-0">
            <GameControllerIcon />
            <span className="font-bold text-lg">Top Games</span>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <div className="relative max-w-96 mx-auto">
              <div className="relative flex flex-col justify-center items-center overflow-hidden rounded-3xl bg-gradient-hot-pink aspect-[358/144]">
                <Image
                  alt="shape"
                  src="/assets/images/square-pattern.svg"
                  width={114}
                  height={114}
                  className="w-20 h-20 sm:w-[114px] sm:h-[114px] pointer-events-none absolute -top-0 -right-0 z-20"
                />
                <h2 className="text-4xl font-bold mb-2">DREAM MINE</h2>
                <Button
                  onClick={() => router.push(internalLinks.games.mine.path)}
                  kind="primary"
                  variant="light"
                  className="text-xs md:text-sm flex items-center gap-[10px] px-4"
                  pilled
                >
                  Play Dream Mine
                  <ArrowRightIcon className="w-6 h-6" />
                </Button>
                <Image
                  alt="shape"
                  src="/assets/images/square-pattern-1.svg"
                  width={120}
                  height={120}
                  className="w-20 h-20 sm:w-[120px] sm:h-[120px] pointer-events-none absolute -bottom-5 left-0 z-20"
                />
              </div>
              <Image alt="shape" src="/assets/images/gem-hot-pink.svg" width={95} height={95} className="hidden md:block absolute -top-14 -right-12 z-20 pointer-events-none" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <div className="relative max-w-96 mx-auto">
              <div className="relative flex flex-col justify-center items-center rounded-3xl bg-gradient-navy aspect-[358/144] overflow-hidden ">
                <Image
                  alt="shape"
                  src="/assets/images/polygon-1.svg"
                  width={108}
                  height={108}
                  className="w-32 h-32 sm:w-52 sm:h-52 pointer-events-none absolute -top-12 left-0 z-20"
                />
                <h2 className="text-4xl font-bold mb-2">Plinko</h2>
                {/* <Button kind="primary" variant="light" className="text-xs md:text-sm flex items-center gap-[8px] px-4" pilled disabled>
                  Coming Soon
                  <ArrowRightIcon className="w-6 h-6" />
                </Button> */}
                <Button
                  onClick={() => router.push(internalLinks.games.plinko.path)}
                  kind="primary"
                  variant="light"
                  className="text-xs md:text-sm flex items-center gap-[10px] px-4"
                  pilled
                >
                  Play Plinko
                  <ArrowRightIcon className="w-6 h-6" />
                </Button>
                <Image
                  alt="shape"
                  src="/assets/images/polygon.svg"
                  width={108}
                  height={108}
                  className="w-32 h-32 sm:w-52 sm:h-52 pointer-events-none absolute -bottom-12 -right-2 z-20"
                />
              </div>
              <Image
                alt="shape"
                src="/assets/images/gem-navy.svg"
                width={100}
                height={90}
                className="w-[100px] block absolute -right-5 -top-12 md:right-[unset] md:top-[unset] md:-bottom-5 md:left-[-40px] pointer-events-none z-20"
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="relative overflow-hidden max-w-96 mx-auto">
              <Image alt="shape" src="/assets/images/gem-blue-1.svg" width={86} height={86} className="hidden- sm:block- pointer-events-none absolute top-4 right-4 -z-20" />
              <div className="relative flex flex-col justify-center items-center overflow-hidden rounded-3xl aspect-[358/144] bg-gradient-dark-purple filter-backdrop">
                <h2 className="text-4xl font-bold mb-2">Coming Soon</h2>
              </div>
              <Image alt="shape" src="/assets/images/gem-blue-1.svg" width={86} height={86} className="hidden- sm:block- pointer-events-none absolute bottom-0 left-0 -z-20" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default TopGames
