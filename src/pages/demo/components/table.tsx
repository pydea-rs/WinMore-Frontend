import Table from '@/components/common/table/table'
import TableBody from '@/components/common/table/tableBody/tableBody'
import TableData from '@/components/common/table/tableData/tableData'
import TableDataWrapper from '@/components/common/table/tableDataWrapper/tableDataWrapper'
import TableHeader from '@/components/common/table/tableHeader/tableHeader'
import TableHeading from '@/components/common/table/tableHeading/tableHeading'
import TableRow from '@/components/common/table/tableRow/tableRow'
import CentIcon from '@/components/icons/cent/cent.icon'
import Cent1Icon from '@/components/icons/cent1/cent1.icon'
import DicesIcon from '@/components/icons/dices/dices.icon'
import SingleUserIcon from '@/components/icons/singleUser/singleUser.icon'

const TableDemo = () => {
  return (
    <div className="container">
      <div className="bg-[rgba(17,24,32,0.6)] p-[20px] rounded-2xl filter-backdrop">
        <Table className="text-secondary">
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
                <TableDataWrapper className="filter-backdrop">
                  <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                    <DicesIcon className="w-6" />
                    <span>Dream Tower</span>
                  </div>
                </TableDataWrapper>
              </TableData>
              <TableData>
                <TableDataWrapper className="filter-backdrop">
                  <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                    <SingleUserIcon className="w-6" />
                    <span>Macan</span>
                  </div>
                </TableDataWrapper>
              </TableData>
              <TableData>
                <TableDataWrapper className="filter-backdrop">
                  <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                    <span>3m</span>
                  </div>
                </TableDataWrapper>
              </TableData>
              <TableData>
                <TableDataWrapper className="filter-backdrop">
                  <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                    <Cent1Icon className="w-6 text-[rgba(255,170,0)]" />
                    <span>1.25</span>
                  </div>
                </TableDataWrapper>
              </TableData>
              <TableData>
                <TableDataWrapper className="filter-backdrop">
                  <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                    <span>0.00.x</span>
                  </div>
                </TableDataWrapper>
              </TableData>
              <TableData>
                <TableDataWrapper className="filter-backdrop">
                  <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                    <CentIcon className="w-6 text-[rgba(255,170,0)]" />
                    <span>0.00</span>
                  </div>
                </TableDataWrapper>
              </TableData>
            </TableRow>
            <TableRow className="text-center">
              <TableData>
                <TableDataWrapper className="filter-backdrop">
                  <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                    <DicesIcon className="w-6" />
                    <span>Dream Tower</span>
                  </div>
                </TableDataWrapper>
              </TableData>
              <TableData>
                <TableDataWrapper className="filter-backdrop">
                  <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                    <SingleUserIcon className="w-6" />
                    <span>Macan</span>
                  </div>
                </TableDataWrapper>
              </TableData>
              <TableData>
                <TableDataWrapper className="filter-backdrop">
                  <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                    <span>3m</span>
                  </div>
                </TableDataWrapper>
              </TableData>
              <TableData>
                <TableDataWrapper className="filter-backdrop">
                  <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                    <Cent1Icon className="w-6 text-[rgba(255,170,0)]" />
                    <span>1.25</span>
                  </div>
                </TableDataWrapper>
              </TableData>
              <TableData>
                <TableDataWrapper className="filter-backdrop">
                  <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                    <span>0.00.x</span>
                  </div>
                </TableDataWrapper>
              </TableData>
              <TableData>
                <TableDataWrapper className="filter-backdrop">
                  <div className="flex items-center justify-center gap-x-2 p-2 w-[165px] h-[40px]">
                    <CentIcon className="w-6 text-[rgba(255,170,0)]" />
                    <span>0.00</span>
                  </div>
                </TableDataWrapper>
              </TableData>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default TableDemo
