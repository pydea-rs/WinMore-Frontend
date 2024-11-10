import Container from '@/components/common/container/container'
import Tab from '@/components/common/tab/tab'
import TabBody from '@/components/common/tab/tabBody/tabBody'
import TabContent from '@/components/common/tab/tabContent/tabContent'
import TabHeader from '@/components/common/tab/tabHeader/tabHeader'
import TabItem from '@/components/common/tab/tabItem/tabItem'
import TimeFastIcon from '@/components/icons/timeFast/timeFast'
import { useAuth } from '@/hooks/useAuth'
import { useMineGamesListQuery } from '@/services/games/mine/mine.service'
import { useUserMineGamesListQuery } from '@/services/user/user.service'
import { ElementProps } from '@/types/elements.types'
import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'
import AllBets from './allBets/allBets'
import LuckyBets from './luckyBets/luckyBets'
import MyBets from './myBets/myBets'

const DreamMineHistory: React.FC<ElementProps> = (props) => {
  const { className } = props

  const [sort, setSort] = useState<'lucky' | 'rollers'>()
  const { isAuthorized } = useAuth()

  const { data: userMineGamesList } = useUserMineGamesListQuery({ take: 10 }, { skip: !isAuthorized })

  const { data, refetch } = useMineGamesListQuery({
    take: 10,
    sort,
    // order,
  })

  const classList = classNames({
    [`${className}`]: className,
  })

  const handleSort = (sort: 'lucky' | 'rollers' | undefined) => {
    setSort(sort)
    refetch()
  }

  return (
    <section className={classList}>
      <Container className="z-10 overflow-x-visible">
        <div className="md:absolute left-4 top-0 ">
          <div className="flex items-center gap-x-2 pr-4 py-8 md:p-4 md:pl-0">
            <TimeFastIcon />
            <span className="font-bold text-lg">Game History</span>
          </div>
        </div>

        <Tab className="mb-8">
          <TabHeader>
            <TabItem onClick={() => handleSort(undefined)}>All BETS</TabItem>
            <TabItem onClick={() => handleSort('lucky')}>LUCKY BETS</TabItem>
            {isAuthorized ? <TabItem>MY BETS</TabItem> : <></>}
          </TabHeader>

          <TabBody className="">
            <TabContent>
              <AllBets data={data} />
            </TabContent>
            <TabContent>
              <LuckyBets data={data} />
            </TabContent>
            {isAuthorized ? (
              <TabContent>
                <MyBets data={userMineGamesList} />
              </TabContent>
            ) : (
              <></>
            )}
          </TabBody>
        </Tab>
        <Image alt="shape" src="/assets/images/dimond-red.svg" width={69} height={95} className="hidden sm:block absolute -bottom-6 -right-2 z-20 pointer-events-none" />
      </Container>
    </section>
  )
}

export default DreamMineHistory
