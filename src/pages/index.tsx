import Tab from '@/components/common/tab/tab'
import TabBody from '@/components/common/tab/tabBody/tabBody'
import TabContent from '@/components/common/tab/tabContent/tabContent'
import TabHeader from '@/components/common/tab/tabHeader/tabHeader'
import TabItem from '@/components/common/tab/tabItem/tabItem'
import Table from '@/components/common/table/table'
import TableBody from '@/components/common/table/tableBody/tableBody'
import TableData from '@/components/common/table/tableData/tableData'
import TableDataWrapper from '@/components/common/table/tableDataWrapper/tableDataWrapper'
import TableHeader from '@/components/common/table/tableHeader/tableHeader'
import TableHeading from '@/components/common/table/tableHeading/tableHeading'
import TableRow from '@/components/common/table/tableRow/tableRow'
import TableWrapper from '@/components/common/table/tableWrapper/tableWrapper'
import CentIcon from '@/components/icons/cent/cent'
import Cent1Icon from '@/components/icons/cent1/cent1'
import DicesIcon from '@/components/icons/dices/dices'
import SingleUserIcon from '@/components/icons/singleUser/singleUser'
import TimeFastIcon from '@/components/icons/timeFast/timeFast'
import MainLayout from '@/components/layouts/main.layout'
import Hero from '@/components/pages/home/hero/hero'
import { TabPanel } from '@headlessui/react'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Winmore | Home</title>
      </Head>
      <div className="flex flex-col flex-grow">
        <Hero />

        <div className="relative z-10 overflow-x-visible">
          <div className="absolute left-4 top-0 hidden md:block">
            <div className="flex items-center gap-x-2 p-4 pl-0">
              <TimeFastIcon />
              <span className="font-bold text-lg">Game History</span>
            </div>
          </div>
          <Tab className="mb-8">
            <TabHeader>
              <TabItem>All BETS</TabItem>
              <TabItem>HIGH ROLLERS</TabItem>
              <TabItem>LUCKY BETS</TabItem>
              <TabItem>MY BETS</TabItem>
            </TabHeader>

            <TabBody className="bg-[hsla(212,31%,10%,0.85)] p-[20px] rounded-2xl rounded-tr-none sm:filter-backdrop">
              <TabContent>
                <TableWrapper>
                  <Table className="text-white w-full ">
                    <TableHeader>
                      <TableRow>
                        <TableHeading className="w-[165px]">
                          <div className="p-2">Game Name</div>
                        </TableHeading>
                        <TableHeading className="w-[165px]">
                          <div className="p-2">Player Name</div>
                        </TableHeading>
                        <TableHeading className="w-[165px]">
                          <div className="p-2">Time</div>
                        </TableHeading>
                        <TableHeading className="w-[165px]">
                          <div className="p-2">WAGER</div>
                        </TableHeading>
                        <TableHeading className="w-[165px]">
                          <div className="p-2">MULTIPLIER</div>
                        </TableHeading>
                        <TableHeading className="w-[165px]">
                          <div className="p-2">PAYOUT</div>
                        </TableHeading>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {new Array(8).fill(null).map((_, inx) => (
                        <TableRow className="text-center" key={inx}>
                          <TableData>
                            <TableDataWrapper>
                              <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                                <DicesIcon className="w-6" />
                                <span>Dream Tower</span>
                              </div>
                            </TableDataWrapper>
                          </TableData>
                          <TableData>
                            <TableDataWrapper>
                              <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                                <SingleUserIcon className="w-6" />
                                <span>Macan</span>
                              </div>
                            </TableDataWrapper>
                          </TableData>
                          <TableData>
                            <TableDataWrapper>
                              <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                                <span>3m</span>
                              </div>
                            </TableDataWrapper>
                          </TableData>
                          <TableData>
                            <TableDataWrapper>
                              <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                                <Cent1Icon className="w-6 text-[rgba(255,170,0)]" />
                                <span>1.25</span>
                              </div>
                            </TableDataWrapper>
                          </TableData>
                          <TableData>
                            <TableDataWrapper>
                              <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                                <span>0.00.x</span>
                              </div>
                            </TableDataWrapper>
                          </TableData>
                          <TableData>
                            <TableDataWrapper>
                              <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                                <CentIcon className="w-6 text-[rgba(255,170,0)]" />
                                <span>0.00</span>
                              </div>
                            </TableDataWrapper>
                          </TableData>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableWrapper>
              </TabContent>
              <TabPanel>Content 2</TabPanel>
              <TabPanel>Content 3</TabPanel>
              <TabPanel>Content 4</TabPanel>
            </TabBody>
          </Tab>
          <Image alt="shape" src="/assets/images/dimond-red.svg" width={69} height={95} className="hidden sm:block absolute -bottom-6 -right-2 z-20" />
        </div>

        <div className="2xl:container relative -z-1 hidden sm:block mt-auto">
          <div className="sm:-mb-[40px] lg:-mb-[64px]  sm:-mt-[100px]  lg:-mt-[260px]">
            <img src="/assets/images/complex.svg" alt="complex" />
          </div>
        </div>
      </div>
    </>
  )
}

Home.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>
