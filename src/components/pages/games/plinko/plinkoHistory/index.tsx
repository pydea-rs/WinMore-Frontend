import Container from '@/components/common/container/container'
import Tab from '@/components/common/tab/tab'
import TabBody from '@/components/common/tab/tabBody/tabBody'
import TabHeader from '@/components/common/tab/tabHeader/tabHeader'
import TabItem from '@/components/common/tab/tabItem/tabItem'
import TimeFastIcon from '@/components/icons/timeFast/timeFast'
import { useAuth } from '@/hooks/useAuth'
import { useGetPlinkoGamesListQuery } from '@/services/games/plinko/plinko.service'
import { expandPlinkoGameData, IFinishedPlinkoGame } from '@/services/games/plinko/plinko.service.types'
import { useUserPlinkoGamesListQuery } from '@/services/user/user.service'
import { IPlinkoState } from '@/store/slices/plinko/plinko.slice.types'
import { ElementProps } from '@/types/elements.types'
import classNames from 'classnames'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GamesBoard from '../../common/games-board'
import { IGameBoardRow } from '../../common/games-board.types'

type TabsType = 'all' | 'lucky' | 'mine'

const PlinkoHistory: React.FC<ElementProps> = (props) => {
  const { className } = props

  const [sort, setSort] = useState<'lucky' | 'rollers'>()
  const [orderDescending, setOrderDescending] = useState<boolean>(true)

  const { isAuthorized } = useAuth()

  const { data: userMineGamesList, refetch: refetchMyGames } = useUserPlinkoGamesListQuery({ take: 10, order: orderDescending ? 'desc' : 'asc' }, { skip: !isAuthorized })

  const [userGamesExpanded, setUserGamesExpanded] = useState<IGameBoardRow[]>([])
  const [dataExpanded, setDataExpanded] = useState<IGameBoardRow[]>([])

  const { data, refetch } = useGetPlinkoGamesListQuery({
    take: 10,
    sort,
    order: orderDescending ? 'desc' : 'asc',
  })
  const [currentTab, setCurrentTab] = useState<TabsType>('all')
  const plinkoConfig: IPlinkoState = useSelector((state: any) => state.plinko.plinkoConfig)

  useEffect(() => {
    refetch()
    refetchMyGames()
  }, [plinkoConfig.playing, refetch, refetchMyGames])

  const classList = classNames({
    [`${className}`]: className,
  })

  useEffect(() => {
    setDataExpanded(expandPlinkoGameData(data?.data.length ? (data.data as IFinishedPlinkoGame[]) : []))
  }, [data])

  useEffect(() => {
    setUserGamesExpanded(expandPlinkoGameData(userMineGamesList?.data.length ? (userMineGamesList.data as IFinishedPlinkoGame[]) : []))
  }, [userMineGamesList])

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
            {isAuthorized ? <TabItem onClick={() => isAuthorized && setTab('mine')}>MY BETS</TabItem> : <></>}
          </TabHeader>

          <TabBody className="">
            <GamesBoard data={{ data: currentTab === 'mine' && isAuthorized ? userGamesExpanded : dataExpanded, status: '', message: '' }}>Plinko</GamesBoard>
          </TabBody>
        </Tab>
        <Image alt="shape" src="/assets/images/dimond-red.svg" width={69} height={95} className="hidden sm:block absolute -bottom-6 -right-2 z-20 pointer-events-none" />
      </Container>
    </section>
  )
}

export default PlinkoHistory
