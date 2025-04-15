import Container from '@/components/common/container/container'
import Tab from '@/components/common/tab/tab'
import TabBody from '@/components/common/tab/tabBody/tabBody'
import TabHeader from '@/components/common/tab/tabHeader/tabHeader'
import TabItem from '@/components/common/tab/tabItem/tabItem'
import TimeFastIcon from '@/components/icons/timeFast/timeFast'
import { useMineGamesListQuery } from '@/services/games/mine/mine.service'
import { ElementProps } from '@/types/elements.types'
import classNames from 'classnames'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import GamesBoard from '../../games/common/games-board'

type TabsType = 'all' | 'lucky'

const DreamMineHistory: React.FC<ElementProps> = (props) => {
  const { className } = props

  const [sort, setSort] = useState<'lucky' | 'rollers'>()
  const [orderDescending, setOrderDescending] = useState<boolean>(true)
  const { data, refetch } = useMineGamesListQuery({
    take: 10,
    sort,
    order: orderDescending ? 'desc' : 'asc',
  })
  const [currentTab, setCurrentTab] = useState<TabsType>('all')

  const classList = classNames({
    [`${className}`]: className,
  })

  useEffect(() => {
    refetch()
  }, [sort, refetch, orderDescending])

  const setTab = (tab: TabsType) => {
    if (currentTab === tab || !orderDescending) {
      setOrderDescending((order) => !order)
    }
    switch (tab) {
      case 'lucky':
        setSort('lucky')
        break
      default:
        setSort(undefined)
        break
    }
    setCurrentTab(tab)
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
            <TabItem onClick={() => setTab('all')}>All BETS</TabItem>
            <TabItem onClick={() => setTab('lucky')}>LUCKY BETS</TabItem>
          </TabHeader>

          <TabBody className="">
            <GamesBoard data={data} />
          </TabBody>
        </Tab>
        <Image alt="shape" src="/assets/images/dimond-red.svg" width={69} height={95} className="hidden sm:block absolute -bottom-6 -right-2 z-20 pointer-events-none" />
      </Container>
    </section>
  )
}

export default DreamMineHistory
