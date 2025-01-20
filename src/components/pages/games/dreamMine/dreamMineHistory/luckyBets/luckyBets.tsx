import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import Table from '@/components/common/table/table'
import TableBody from '@/components/common/table/tableBody/tableBody'
import TableData from '@/components/common/table/tableData/tableData'
import TableDataWrapper from '@/components/common/table/tableDataWrapper/tableDataWrapper'
import TableHeader from '@/components/common/table/tableHeader/tableHeader'
import TableHeading from '@/components/common/table/tableHeading/tableHeading'
import TableRow from '@/components/common/table/tableRow/tableRow'
import TableWrapper from '@/components/common/table/tableWrapper/tableWrapper'
import CentIcon from '@/components/icons/cent/cent'
import DicesIcon from '@/components/icons/dices/dices'
import SingleUserIcon from '@/components/icons/singleUser/singleUser'
import { BaseProps } from '@/types/global.types'
import { getTimePassed } from '@/utils/timeAndDate'
import { LuckyBetProps } from './luckyBets.types'

const LuckyBets: BaseProps<LuckyBetProps> = (props) => {
  const { data } = props

  return (
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
              {data ? (
                <>
                  {data.data.map((game) => {
                    return (
                      <TableRow className="text-center" key={game.id}>
                        <TableData>
                          <TableDataWrapper className="min-w-20 bg-opacity-40">
                            <div className="flex items-center justify-center gap-x-2  h-[40px]">
                              <DicesIcon className="hidden lg:inline-block w-6" />
                              <span>Dream Mine</span>
                            </div>
                          </TableDataWrapper>
                        </TableData>
                        <TableData>
                          <TableDataWrapper className="min-w-20 bg-opacity-40">
                            <div className="flex items-center justify-center gap-x-2  h-[40px]">
                              <SingleUserIcon className="hidden lg:inline-block w-6" />
                              <span>{game.user.name || 'Ghost 😱'}</span>
                            </div>
                          </TableDataWrapper>
                        </TableData>
                        <TableData>
                          <TableDataWrapper className="min-w-20 bg-opacity-40">
                            <div className="flex items-center justify-center gap-x-2  h-[40px]">
                              <span>{getTimePassed(new Date(game.createdAt))}</span>
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
                              {/* <CentIcon className="w-6 text-[rgba(255,170,0)]" /> */}
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
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      </CardBody>
    </Card>
  )
}

export default LuckyBets
