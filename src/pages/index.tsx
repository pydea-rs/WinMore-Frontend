import Container from '@/components/common/container/container'
import MainLayout from '@/components/layouts/main.layout'
import HomeGameHistory from '@/components/pages/home/homeGameHistory/homeGameHistory'
import TopGames from '@/components/pages/home/top-games/top-game'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { Fragment, ReactElement } from 'react'

const Hero = dynamic(() => import('../components/pages/home/hero/hero'), { ssr: false })

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Winmore | Home</title>
      </Head>
      <div className="flex flex-col flex-grow">
        <Hero className="mb-12">
          {Array(3)
            .fill(0)
            .map((_, idx) => `banners/lg/${idx + 1}.png`)}
        </Hero>

        <TopGames className="mb-12" />
        <HomeGameHistory />
        <Container kind="fluid" className="-z-1 hidden sm:block mt-auto px-0">
          <div className="sm:-mb-[40px] lg:-mb-[64px]  sm:-mt-[100px]  lg:-mt-[260px]">
            <Image src="/assets/images/complex.svg" alt="complex" width={1920} height={300} priority />
          </div>
        </Container>
      </div>
    </Fragment>
  )
}

Home.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>
