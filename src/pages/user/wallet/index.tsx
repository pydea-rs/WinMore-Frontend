import { Avatar } from '@/components/common/avatar/avatar'
import { Button } from '@/components/common/button/button'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import Container from '@/components/common/container/container'
import Data from '@/components/common/data/data'
import DataBody from '@/components/common/data/dataBody/dataBody'
import DataCol from '@/components/common/data/dataCol/dataCol'
import DataHeader from '@/components/common/data/dataHeader/dataHeader'
import DataHeading from '@/components/common/data/dataHeading/dataHeading'
import DataRow from '@/components/common/data/dataRow/dataRow'
import { FormGroup } from '@/components/common/form/formGroup/fromGroup'
import { Label } from '@/components/common/form/label/label'
import { Radio } from '@/components/common/form/radio/radio'
import { RadioGroup } from '@/components/common/form/radioGroup/radioGroup'
import Select from '@/components/common/form/select/select'
import SelectButton from '@/components/common/form/select/selectButton/selectButton'
import SelectIcon from '@/components/common/form/select/selectIcon/selectIcon'
import SelectList from '@/components/common/form/select/selectList/selectList'
import SelectOption from '@/components/common/form/select/selectOption/selectOption'
import { Spinner } from '@/components/common/spinner/spinner'
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
import ChevronDownIcon from '@/components/icons/chevronDown/chevronDown'
import { networks } from '@/constants/networks'
import { useGetUserTokenBalanceMutation } from '@/services/user/user.service'
import { updateNetwork, updateToken } from '@/store/slices/currency/currency.slice'
import { triggerModal, triggerWithdrawModal } from '@/store/slices/modal/modal.slice'
import { useDispatch, useSelector } from '@/store/store'
import { INetwork, IToken, TType } from '@/types/global.types'
import Head from 'next/head'
import { Fragment, useState } from 'react'

const Wallet = () => {
  const dispatch = useDispatch()
  const { network } = useSelector((state) => state.currency)
  const [GetTokenBalanceMutate, { isLoading: isLoadingBalance }] = useGetUserTokenBalanceMutation()
  const [selectedTokenWithdrawId, setSelectedTokenWithdrawId] = useState<number>()
  const handleOpenDepositModal = (id: number) => {
    dispatch(triggerModal({ modal: 'deposit', trigger: true }))
  }

  const handleChangeNetwork = ({ id }: TType) => {
    const selectedNetwork = networks.find((net) => net.chainId === id) as INetwork
    dispatch(updateNetwork({ network: selectedNetwork }))
    dispatch(updateToken({ token: selectedNetwork.tokens[0] }))
  }

  const handleOpenWithdrawModal = async (token: IToken) => {
    const balance = await GetTokenBalanceMutate({ chain: network.chainId, token: token.symbol }).unwrap()
    dispatch(
      triggerWithdrawModal({
        trigger: true,
        data: {
          token: token.symbol,
          balance: balance.data,
          chainId: network.chainId,
        },
      }),
    )
  }

  return (
    <Fragment>
      <Head>
        <title>Winmore | Wallet</title>
      </Head>
      <div className="flex flex-col flex-grow">
        <section>
          <Container className="z-10 overflow-x-visible">
            <Tab className="mb-8">
              <TabHeader>
                <TabItem>Deposit/Withdraw</TabItem>
                <TabItem>History</TabItem>
              </TabHeader>

              <TabBody>
                <TabContent>
                  <Card>
                    {/* bg-opacity-60 sm:filter-backdrop */}
                    <CardBody className="rounded-tl-none lg:rounded-tr-none">
                      <FormGroup className="md:w-48">
                        <Label>Select Chain</Label>
                        <Select value={{ id: network.chainId, name: network.name, icon: network.icon }} onChange={handleChangeNetwork}>
                          <SelectButton className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-main font-medium gap-x-2">
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
                                <div className="text-sm text-main font-medium">{name}</div>
                              </SelectOption>
                            ))}
                          </SelectList>
                        </Select>
                      </FormGroup>
                      <Data>
                        <DataHeader className="hidden md:flex">
                          <DataHeading className="w-full md:w-1/5">Chain</DataHeading>
                          <DataHeading className="w-full md:w-1/5">Coin</DataHeading>
                          <DataHeading className="w-full md:w-1/5">My Wallet</DataHeading>
                          <DataHeading className="w-full md:w-1/5">withdraw</DataHeading>
                          <DataHeading className="w-full md:w-1/5">Deposit</DataHeading>
                        </DataHeader>
                        <DataBody>
                          {network.tokens.map((token) => {
                            return (
                              <DataRow key={token.id}>
                                <DataCol className="w-full md:w-1/5 flex justify-between md:justify-center items-center">
                                  <DataHeading className="md:hidden">Chain</DataHeading>
                                  <div className="flex items-center justify-center gap-x-2">
                                    {network.icon ? <Avatar src={network.icon} alt="flag" /> : <div className="w-6 h-6 bg-black rounded-full" />}
                                    <span>{network.name}</span>
                                  </div>
                                </DataCol>
                                <DataCol className="w-full md:w-1/5 flex justify-between md:justify-center items-center">
                                  <DataHeading className="md:hidden">Coin</DataHeading>
                                  <div className="flex items-center justify-center gap-x-2">
                                    <Avatar size="md" src={token.icon} alt="tether" />
                                    <span>{token.symbol}</span>
                                  </div>
                                </DataCol>
                                <DataCol className="w-full md:w-1/5 flex justify-between md:justify-center items-center">
                                  <DataHeading className="md:hidden">My Wallet</DataHeading>
                                  <span>0</span>
                                </DataCol>
                                <DataCol className="w-full md:w-1/5">
                                  <Button
                                    kind="primary"
                                    variant="success"
                                    full
                                    disabled={isLoadingBalance && selectedTokenWithdrawId === token.id}
                                    onClick={() => {
                                      setSelectedTokenWithdrawId(token.id)
                                      handleOpenWithdrawModal(token)
                                    }}
                                  >
                                    <div className="flex items-center gap-x-2">
                                      Withdraw
                                      {isLoadingBalance && selectedTokenWithdrawId === token.id ? <Spinner size="sm" /> : <></>}
                                    </div>
                                  </Button>
                                </DataCol>
                                <DataCol className="w-full md:w-1/5">
                                  <Button
                                    kind="primary"
                                    variant="primary"
                                    full
                                    onClick={() => {
                                      handleOpenDepositModal(token.id)
                                    }}
                                  >
                                    Deposit
                                  </Button>
                                </DataCol>
                              </DataRow>
                            )
                          })}
                        </DataBody>
                      </Data>
                    </CardBody>
                  </Card>
                </TabContent>

                <TabContent>
                  <Card>
                    <CardBody className="rounded-tr-none">
                      {/* FILTERS */}
                      <FormGroup>
                        <RadioGroup>
                          <Radio id="21" name="2" value="21">
                            All
                          </Radio>
                          <Radio id="22" name="2" value="22">
                            Deposit
                          </Radio>
                          <Radio id="23" name="2" value="23">
                            Withdraw
                          </Radio>
                        </RadioGroup>
                      </FormGroup>
                      <FormGroup className="md:w-48">
                        <Label>Select Chain</Label>
                        <Select value={{ id: network.chainId, name: network.name, icon: network.icon }} onChange={handleChangeNetwork}>
                          <SelectButton className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-main font-medium gap-x-2">
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
                                <div className="text-sm text-main font-medium">{name}</div>
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
                                <div className="p-2">Time</div>
                              </TableHeading>
                              <TableHeading className="w-[165px]">
                                <div className="p-2">Date</div>
                              </TableHeading>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {new Array(4).fill(null).map((_, inx) => (
                              <TableRow className="text-center" key={inx}>
                                <TableData>
                                  <TableDataWrapper className="text-white bg-opacity-40">
                                    <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                                      <span>----</span>
                                    </div>
                                  </TableDataWrapper>
                                </TableData>
                                <TableData>
                                  <TableDataWrapper className="text-white bg-opacity-40">
                                    <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                                      <span>----</span>
                                    </div>
                                  </TableDataWrapper>
                                </TableData>
                                <TableData>
                                  <TableDataWrapper className="text-white bg-opacity-40">
                                    <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                                      <div className="flex items-center justify-center gap-x-2">
                                        <Avatar size="md" src="/assets/images/tokens/USDT.png" alt="tether" />
                                        <span>USDC</span>
                                      </div>
                                    </div>
                                  </TableDataWrapper>
                                </TableData>
                                <TableData>
                                  <TableDataWrapper className="text-white bg-opacity-40">
                                    <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                                      <div className="flex items-center justify-center gap-x-2">
                                        <Avatar size="md" src="/assets/images/tokens/USDT.png" alt="tether" />
                                        <span>USDT</span>
                                      </div>
                                    </div>
                                  </TableDataWrapper>
                                </TableData>
                                <TableData>
                                  <TableDataWrapper className="text-white bg-opacity-40">
                                    <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                                      <span>----</span>
                                    </div>
                                  </TableDataWrapper>
                                </TableData>
                                <TableData>
                                  <TableDataWrapper className="text-white bg-opacity-40">
                                    <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                                      <span>----</span>
                                    </div>
                                  </TableDataWrapper>
                                </TableData>
                                <TableData>
                                  <TableDataWrapper className="text-white bg-opacity-40">
                                    <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                                      <span>----</span>
                                    </div>
                                  </TableDataWrapper>
                                </TableData>
                                <TableData>
                                  <TableDataWrapper className="text-white bg-opacity-40">
                                    <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                                      <span>15:23</span>
                                    </div>
                                  </TableDataWrapper>
                                </TableData>
                                <TableData>
                                  <TableDataWrapper className="text-white bg-opacity-40">
                                    <div className="flex items-center justify-center gap-x-2 p-2 w-[100px] h-[40px]">
                                      <span>10/10/10</span>
                                    </div>
                                  </TableDataWrapper>
                                </TableData>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableWrapper>
                    </CardBody>
                  </Card>
                </TabContent>
              </TabBody>
            </Tab>
          </Container>
        </section>
      </div>
    </Fragment>
  )
}

export default Wallet
