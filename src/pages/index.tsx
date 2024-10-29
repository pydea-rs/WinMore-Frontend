import Container from '@/components/common/container/container'
import MainLayout from '@/components/layouts/main.layout'
import TopGames from '@/components/pages/home/top-games/top-game'
import GameHistory from '@/components/snippets/gameHistory/gameHistory'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment, ReactElement } from 'react'

const Hero = dynamic(() => import('../components/pages/home/hero/hero'), { ssr: false })

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Winmore | Home</title>
      </Head>
      <div className="flex flex-col flex-grow">
        <Hero className="mb-12" />
        <TopGames className="mb-12" />
        <GameHistory />
        <Container kind="fluid" className="-z-1 hidden sm:block mt-auto px-0">
          <div className="sm:-mb-[40px] lg:-mb-[64px]  sm:-mt-[100px]  lg:-mt-[260px]">
            <img src="/assets/images/complex.svg" alt="complex" />
          </div>
        </Container>
      </div>
    </Fragment>
  )
}

Home.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>
