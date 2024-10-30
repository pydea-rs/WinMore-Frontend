import Container from '@/components/common/container/container'
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
import MainLayout from '@/components/layouts/main.layout'
import { Fragment, ReactElement } from 'react'

const TableDemo = () => {
  return (
    <Fragment>
      <Container className="z-10">
        <TableWrapper className="bg-[hsla(212,31%,10%,0.9)] p-[20px] rounded-2xl sm:filter-backdrop mb-8">
          <Table className="text-secondary w-full ">
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
              <TableRow className="text-center">
                <TableData>
                  <TableDataWrapper>
                    <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                      <DicesIcon className="w-6" />
                      <span>Dream Mine</span>
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
              <TableRow className="text-center">
                <TableData>
                  <TableDataWrapper>
                    <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                      <DicesIcon className="w-6" />
                      <span>Dream Mine</span>
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
              <TableRow className="text-center">
                <TableData>
                  <TableDataWrapper>
                    <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                      <DicesIcon className="w-6" />
                      <span>Dream Mine</span>
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
              <TableRow className="text-center">
                <TableData>
                  <TableDataWrapper>
                    <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                      <DicesIcon className="w-6" />
                      <span>Dream Mine</span>
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
              <TableRow className="text-center">
                <TableData>
                  <TableDataWrapper>
                    <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                      <DicesIcon className="w-6" />
                      <span>Dream Mine</span>
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
              <TableRow className="text-center">
                <TableData>
                  <TableDataWrapper>
                    <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                      <DicesIcon className="w-6" />
                      <span>Dream Mine</span>
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
              <TableRow className="text-center">
                <TableData>
                  <TableDataWrapper>
                    <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                      <DicesIcon className="w-6" />
                      <span>Dream Mine</span>
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
              <TableRow className="text-center">
                <TableData>
                  <TableDataWrapper>
                    <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                      <DicesIcon className="w-6" />
                      <span>Dream Mine</span>
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
              <TableRow className="text-center">
                <TableData>
                  <TableDataWrapper>
                    <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                      <DicesIcon className="w-6" />
                      <span>Dream Mine</span>
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
              <TableRow className="text-center">
                <TableData>
                  <TableDataWrapper>
                    <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                      <DicesIcon className="w-6" />
                      <span>Dream Mine</span>
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
              <TableRow className="text-center">
                <TableData>
                  <TableDataWrapper>
                    <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                      <DicesIcon className="w-6" />
                      <span>Dream Mine</span>
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
              <TableRow className="text-center">
                <TableData>
                  <TableDataWrapper>
                    <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                      <DicesIcon className="w-6" />
                      <span>Dream Mine</span>
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
              <TableRow className="text-center">
                <TableData>
                  <TableDataWrapper>
                    <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                      <DicesIcon className="w-6" />
                      <span>Dream Mine</span>
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
              <TableRow className="text-center">
                <TableData>
                  <TableDataWrapper>
                    <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                      <DicesIcon className="w-6" />
                      <span>Dream Mine</span>
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
            </TableBody>
          </Table>
        </TableWrapper>
      </Container>
      <Container kind="fluid" className="-z-1 hidden sm:block">
        <div className="sm:-mb-[40px] lg:-mb-[60px]  sm:-mt-[100px]  lg:-mt-[260px]">
          <img src="/assets/images/complex.svg" alt="complex" />
        </div>
      </Container>
    </Fragment>
  )
}

export default TableDemo

TableDemo.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>
