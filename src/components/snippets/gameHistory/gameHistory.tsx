import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import Container from '@/components/common/container/container'
import Tab from '@/components/common/tab/tab'
import TabBody from '@/components/common/tab/tabBody/tabBody'
import TabContent from '@/components/common/tab/tabContent/tabContent'
import TabHeader from '@/components/common/tab/tabHeader/tabHeader'
import TabItem from '@/components/common/tab/tabItem/tabItem'
import Table from '@/components/common/table/table'
import TableBody from '@/components/common/table/tableBody/tableBody'
import TableHeader from '@/components/common/table/tableHeader/tableHeader'
import TableHeading from '@/components/common/table/tableHeading/tableHeading'
import TableRow from '@/components/common/table/tableRow/tableRow'
import TableWrapper from '@/components/common/table/tableWrapper/tableWrapper'
import TimeFastIcon from '@/components/icons/timeFast/timeFast'
import { useAuth } from '@/hooks/useAuth'
import { ElementProps } from '@/types/elements.types'
import classNames from 'classnames'
import Image from 'next/image'

const GameHistory: React.FC<ElementProps> = (props) => {
  const { className } = props
  const { isAuthorized } = useAuth()

  const classList = classNames({
    [`${className}`]: className,
  })

  const calculateTime = (time: number): string => {
    if (time < 60) {
      return `${time.toFixed(2)} sec`
    }
    return `${time.toFixed(2)} min`
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
            <TabItem>All BETS</TabItem>
            <TabItem>HIGH ROLLERS</TabItem>
            <TabItem>MY BETS</TabItem>
          </TabHeader>

          <TabBody className="">
            <TabContent>
              <Card responsive>
                <CardBody className="bg-opacity-60 sm:filter-backdrop rounded-tl-none lg:rounded-tr-none">
                  <TableWrapper>
                    <Table className="text-white w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHeading className="w-[165px]">
                            <div className="p-2">
                              Game <span className="hidden lg:inline-block">Name</span>
                            </div>
                          </TableHeading>
                          <TableHeading className="w-[165px]">
                            <div className="p-2">Player</div>
                          </TableHeading>
                          <TableHeading className="w-[165px]">
                            <div className="p-2">Time</div>
                          </TableHeading>
                          <TableHeading className="w-[165px]">
                            <div className="p-2">MULTIPLIER</div>
                          </TableHeading>
                          <TableHeading className="w-[165px]">
                            <div className="p-2">PAYOUT</div>
                          </TableHeading>
                          <TableHeading className="w-[165px]">
                            <div className="p-2">STATUS</div>
                          </TableHeading>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* {data ? (
                          <>
                            {data.data.map((game) => {
                              return (
                                <TableRow className="text-center" key={game.id}>
                                  <TableData>
                                    <TableDataWrapper className="min-w-20 bg-opacity-40">
                                      <div className="flex items-center justify-center gap-x-2  h-[40px]">
                                        <DicesIcon className="hidden lg:inline-block w-6" />
                                        <span>Dream Tower</span>
                                      </div>
                                    </TableDataWrapper>
                                  </TableData>
                                  <TableData>
                                    <TableDataWrapper className="min-w-20 bg-opacity-40">
                                      <div className="flex items-center justify-center gap-x-2  h-[40px]">
                                        <SingleUserIcon className="hidden lg:inline-block w-6" />
                                        <span>{game.userId}</span>
                                      </div>
                                    </TableDataWrapper>
                                  </TableData>
                                  <TableData>
                                    <TableDataWrapper className="min-w-20 bg-opacity-40">
                                      <div className="flex items-center justify-center gap-x-2  h-[40px]">
                                        <span>{calculateTime(game.time)}</span>
                                      </div>
                                    </TableDataWrapper>
                                  </TableData>

                                  <TableData>
                                    <TableDataWrapper className="min-w-28 bg-opacity-40">
                                      <div className="flex items-center justify-center gap-x-2  h-[40px]">
                                        <span>{game.multiplier}.x</span>
                                      </div>
                                    </TableDataWrapper>
                                  </TableData>
                                  <TableData>
                                    <TableDataWrapper className="min-w-28 bg-opacity-40">
                                      <div className="flex items-center justify-center gap-x-2 h-[40px]">
                                        <CentIcon className="hidden lg:inline-block w-6 text-[rgba(255,170,0)]" />
                                        <span>{game.stake}</span>
                                      </div>
                                    </TableDataWrapper>
                                  </TableData>
                                  <TableData>
                                    <TableDataWrapper className="min-w-28 bg-opacity-40">
                                      <div className="flex items-center justify-center gap-x-2  h-[40px]">
                                        <span>{game.status}</span>
                                      </div>
                                    </TableDataWrapper>
                                  </TableData>
                                </TableRow>
                              )
                            })}
                          </>
                        ) : (
                          <></>
                        )} */}
                      </TableBody>
                    </Table>
                  </TableWrapper>
                </CardBody>
              </Card>
            </TabContent>
            <TabContent>
              <Card>
                <CardBody className="bg-opacity-60 sm:filter-backdrop">Content 2</CardBody>
              </Card>
            </TabContent>
            <TabContent>
              <Card>
                <CardBody className="bg-opacity-60 sm:filter-backdrop">Content 3</CardBody>
              </Card>
            </TabContent>
          </TabBody>
        </Tab>
        <Image alt="shape" src="/assets/images/dimond-red.svg" width={69} height={95} className="hidden sm:block absolute -bottom-6 -right-2 z-20 pointer-events-none" />
      </Container>
    </section>
  )
}

export default GameHistory
