import { Avatar } from '@/components/common/avatar/avatar'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { FormGroup } from '@/components/common/form/formGroup/fromGroup'
import { Label } from '@/components/common/form/label/label'
import { Radio } from '@/components/common/form/radio/radio'
import { RadioGroup } from '@/components/common/form/radioGroup/radioGroup'
import Select from '@/components/common/form/select/select'
import SelectButton from '@/components/common/form/select/selectButton/selectButton'
import SelectIcon from '@/components/common/form/select/selectIcon/selectIcon'
import SelectList from '@/components/common/form/select/selectList/selectList'
import SelectOption from '@/components/common/form/select/selectOption/selectOption'
import Table from '@/components/common/table/table'
import TableBody from '@/components/common/table/tableBody/tableBody'
import TableData from '@/components/common/table/tableData/tableData'
import TableDataWrapper from '@/components/common/table/tableDataWrapper/tableDataWrapper'
import TableHeader from '@/components/common/table/tableHeader/tableHeader'
import TableHeading from '@/components/common/table/tableHeading/tableHeading'
import TableRow from '@/components/common/table/tableRow/tableRow'
import TableWrapper from '@/components/common/table/tableWrapper/tableWrapper'
import ChevronDownIcon from '@/components/icons/chevronDown/chevronDown'
import { useAuth } from '@/hooks/useAuth'
import { useUserTransactionHistoryQuery } from '@/services/user/user.service'
import { updateNetwork, updateToken } from '@/store/slices/currency/currency.slice'
import { useDispatch, useSelector } from '@/store/store'
import { BaseProps, INetwork, TType } from '@/types/global.types'
import moment from 'moment'
import { useRouter } from 'next/router'
import { WalletHistoryProps } from './walletHistory.types'

const WalletHistory: BaseProps<WalletHistoryProps> = () => {
  const router = useRouter()
  const { pathname, query, push } = router

  const sort = [
    {
      id: 1,
      name: 'All',
      value: 'all',
    },
    {
      id: 2,
      name: 'Deposit',
      value: 'deposit',
    },
    {
      id: 3,
      name: 'Withdraw',
      value: 'withdraw',
    },
  ]

  const dispatch = useDispatch()
  const { isAuthorized } = useAuth()
  const { network } = useSelector((state) => state.currency)
  const { networks } = useSelector((state) => state.networks)

  const handleChangeQuery = (sortData: string) => {
    push(
      {
        pathname: pathname,
        query: { ...query, sort: sortData },
      },
      undefined,
      { shallow: true },
    )
  }

  const handleChangeNetwork = ({ id }: TType) => {
    const selectedNetwork = networks.find((net) => net.chainId === id) as INetwork
    dispatch(updateNetwork({ network: selectedNetwork }))
    dispatch(updateToken({ token: selectedNetwork.tokens[0] }))
  }

  const { data } = useUserTransactionHistoryQuery({ skip: 1, take: 10 }, { skip: !isAuthorized, pollingInterval: 20000 })

  return (
    <Card>
      <CardBody className="rounded-tr-none">
        {/* FILTERS */}
        <FormGroup>
          <RadioGroup>
            {sort.map(({ id, name, value }) => {
              return (
                <Radio key={`sort-${id}`} id={`sort-${id}`} name="sort" value={value} checked={value === query.sort} onClick={() => handleChangeQuery(value)}>
                  {name}
                </Radio>
              )
            })}
          </RadioGroup>
        </FormGroup>
        <FormGroup className="md:w-48">
          <Label>Select Chain</Label>
          <Select value={{ id: network.chainId, name: network.name, icon: network.icon }} onChange={handleChangeNetwork}>
            <SelectButton className="flex items-center justify-between">
              <div className="flex items-center text-sm text-main font-medium gap-x-2 truncate">
                {network.icon ? (
                  <Avatar src={network.icon} alt="flag" />
                ) : (
                  <SelectIcon>
                    <div className="w-6 h-6 bg-black rounded-full -ml-2" />
                  </SelectIcon>
                )}
                {network.name}
              </div>
              <ChevronDownIcon className="pointer-events-none size-4 fill-white/60" aria-hidden="true" />
            </SelectButton>
            <SelectList>
              {networks.map(({ chainId, name, icon }) => (
                <SelectOption value={{ id: chainId, name, icon }} key={chainId} className="flex items-center">
                  {icon ? (
                    <SelectIcon>
                      <Avatar className="flex-shrink-0 -ml-2" size="md" src={icon} alt="flag" />
                    </SelectIcon>
                  ) : (
                    <SelectIcon>
                      <div className="w-6 h-6 bg-black rounded-full -ml-2" />
                    </SelectIcon>
                  )}
                  <div className="text-sm text-main font-medium truncate">{name}</div>
                </SelectOption>
              ))}
            </SelectList>
          </Select>
        </FormGroup>

        {/* TABLE */}
        <TableWrapper>
          <Table className="text-white w-full ">
            <TableHeader>
              <TableRow>
                <TableHeading className="w-[165px]">
                  <div className="p-2">ID</div>
                </TableHeading>
                <TableHeading className="w-[165px]">
                  <div className="p-2">Type</div>
                </TableHeading>
                <TableHeading className="w-[165px]">
                  <div className="p-2">Network</div>
                </TableHeading>
                <TableHeading className="w-[165px]">
                  <div className="p-2">Coin</div>
                </TableHeading>
                <TableHeading className="w-[165px]">
                  <div className="p-2">Amount</div>
                </TableHeading>
                <TableHeading className="w-[165px]">
                  <div className="p-2">TX</div>
                </TableHeading>
                <TableHeading className="w-[165px]">
                  <div className="p-2">Status</div>
                </TableHeading>
                <TableHeading className="w-[165px]">
                  <div className="p-2">Detail</div>
                </TableHeading>
                <TableHeading className="w-[165px]">
                  <div className="p-2">Time</div>
                </TableHeading>
                <TableHeading className="w-[165px]">
                  <div className="p-2">Date</div>
                </TableHeading>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data ? (
                data.data.map((transaction) => {
                  const { amount, chain, createdAt, destination, id, remarks, source, status, token, type, trx } = transaction
                  const formattedDate = moment(createdAt).format('MMM DD YYYY')
                  const formattedTime = moment(createdAt).format('HH:MM')
                  return (
                    <TableRow className="text-center" key={id}>
                      <TableData>
                        <TableDataWrapper className="text-white bg-opacity-40">
                          <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                            <span>{id}</span>
                          </div>
                        </TableDataWrapper>
                      </TableData>
                      <TableData>
                        <TableDataWrapper className="text-white bg-opacity-40">
                          <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                            <span>{type}</span>
                          </div>
                        </TableDataWrapper>
                      </TableData>
                      <TableData>
                        <TableDataWrapper className="text-white bg-opacity-40">
                          <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                            <div className="flex items-center justify-center gap-x-2">
                              <Avatar size="md" src={`/assets/images/chains/${chain.name}.png`} alt={chain.name} />
                              <span>{chain.name}</span>
                            </div>
                          </div>
                        </TableDataWrapper>
                      </TableData>
                      <TableData>
                        <TableDataWrapper className="text-white bg-opacity-40">
                          <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                            <div className="flex items-center justify-center gap-x-2">
                              <Avatar size="md" src={`/assets/images/tokens/${token}.png`} alt={token} />
                              <span>{token}</span>
                            </div>
                          </div>
                        </TableDataWrapper>
                      </TableData>
                      <TableData>
                        <TableDataWrapper className="text-white bg-opacity-40">
                          <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                            <span>{amount}</span>
                          </div>
                        </TableDataWrapper>
                      </TableData>
                      <TableData>
                        <TableDataWrapper className="text-white bg-opacity-40">
                          <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                            <span>{trx ?? '----'}</span>
                          </div>
                        </TableDataWrapper>
                      </TableData>
                      <TableData>
                        <TableDataWrapper className="text-white bg-opacity-40">
                          <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                            <span>{status}</span>
                          </div>
                        </TableDataWrapper>
                      </TableData>
                      <TableData>
                        <TableDataWrapper className="text-white bg-opacity-40">
                          <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                            <span>{remarks.description}</span>
                          </div>
                        </TableDataWrapper>
                      </TableData>
                      <TableData>
                        <TableDataWrapper className="text-white bg-opacity-40">
                          <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                            <span>{formattedTime}</span>
                          </div>
                        </TableDataWrapper>
                      </TableData>
                      <TableData>
                        <TableDataWrapper className="text-white bg-opacity-40">
                          <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                            <span>{formattedDate}</span>
                          </div>
                        </TableDataWrapper>
                      </TableData>
                    </TableRow>
                  )
                })
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

export default WalletHistory
