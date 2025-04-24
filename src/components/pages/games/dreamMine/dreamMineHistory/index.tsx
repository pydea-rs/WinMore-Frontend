/* eslint-disable react-hooks/exhaustive-deps */
import Container from '@/components/common/container/container'
import Tab from '@/components/common/tab/tab'
import TabBody from '@/components/common/tab/tabBody/tabBody'
import TabHeader from '@/components/common/tab/tabHeader/tabHeader'
import TabItem from '@/components/common/tab/tabItem/tabItem'
import TimeFastIcon from '@/components/icons/timeFast'
import { useAuth } from '@/hooks/useAuth'
import { MineService, useMineGamesListQuery } from '@/services/games/mine/mine.service'
import { UserService, useUserMineGamesListQuery } from '@/services/user/user.service'
import { useDispatch, useSelector } from '@/store/store'
import { ElementProps } from '@/types/elements.types'
import classNames from 'classnames'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import GamesBoard from '../../common/games-board'

type TabsType = 'all' | 'lucky' | 'mine'

const DreamMineHistory: React.FC<ElementProps> = (props) => {
  const { className } = props
  const { mineConfig } = useSelector((state) => state.mine)
  const [orderDescending, setOrderDescending] = useState<boolean>(true)

  const { isAuthorized } = useAuth()
  const [currentTab, setCurrentTab] = useState<TabsType>('all')

  const {
    data: userMineGamesList,
    refetch: refetchMyGames,
    isUninitialized: isMyGamesFetchingUninitialized,
    isFetching: myGamesFetching,
  } = useUserMineGamesListQuery({ take: 10, order: orderDescending ? 'desc' : 'asc' }, { skip: !isAuthorized })

  const dispatch = useDispatch()

  const {
    data,
    refetch,
    isUninitialized: isAllGamesFetchingUninitialized,
    isFetching: allGamesFetching,
  } = useMineGamesListQuery({
    take: 10,
    sort: currentTab !== 'lucky' ? undefined : 'lucky',
    order: orderDescending ? 'desc' : 'asc',
  })

  const classList = classNames({
    [`${className}`]: className,
  })

  useEffect(() => {
    if (currentTab !== 'mine') {
      if (!isAllGamesFetchingUninitialized && !allGamesFetching) {
        refetch()
      }
    } else if (!isMyGamesFetchingUninitialized && !myGamesFetching) {
      refetchMyGames()
    }
  }, [mineConfig.currentGameStatus, currentTab])

  useEffect(() => {
    if (mineConfig.currentGameStatus !== 'ONGOING' || mineConfig.currentGameId == null || !mineConfig.activeRow) {
      return
    }
    if (currentTab !== 'mine') {
      const nextMultiplier = mineConfig.mode?.multipliers?.[mineConfig.activeRow - 1]
      // This is just to prevent unnecessary request when client has the data, but if the value was invalid any how, refetch:
      if (nextMultiplier != null) {
        dispatch(
          MineService.util.updateQueryData(
            'mineGamesList',
            {
              take: 10,
              sort: currentTab !== 'lucky' ? undefined : 'lucky',
              order: orderDescending ? 'desc' : 'asc',
            },
            (draft) => {
              if (draft?.data?.length) {
                const myGame = draft.data.find((game) => game.id === mineConfig.currentGameId)
                if (myGame) {
                  myGame.multiplier = nextMultiplier
                }
              }
            },
          ),
        )
      } else if (!isAllGamesFetchingUninitialized && !allGamesFetching) {
        refetch()
      }
    } else if (isAuthorized) {
      const nextMultiplier = mineConfig.mode?.multipliers?.[mineConfig.activeRow - 1]

      if (nextMultiplier != null) {
        dispatch(
          UserService.util.updateQueryData('userMineGamesList', { take: 10, order: orderDescending ? 'desc' : 'asc' }, (draft) => {
            if (draft?.data?.length) {
              const myGame = draft.data.find((game) => game.id === mineConfig.currentGameId)
              if (myGame) {
                myGame.multiplier = nextMultiplier
              }
            }
          }),
        )
      } else if (!isMyGamesFetchingUninitialized && !myGamesFetching) {
        refetchMyGames()
      }
    }
  }, [mineConfig.activeRow])

  const setTab = (tab: TabsType) => {
    if (currentTab === tab) {
      setOrderDescending((order) => !order)
      return
    }
    if (!orderDescending) {
      setOrderDescending(true)
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
            <GamesBoard data={currentTab === 'mine' && isAuthorized ? userMineGamesList : data}>Dream Mine</GamesBoard>
          </TabBody>
        </Tab>
        <Image alt="shape" src="/assets/images/dimond-red.svg" width={69} height={95} className="hidden sm:block absolute -bottom-6 -right-2 z-20 pointer-events-none" />
      </Container>
    </section>
  )
}

export default DreamMineHistory
