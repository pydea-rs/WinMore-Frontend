import { Avatar } from '@/components/common/avatar/avatar'
import { Button } from '@/components/common/button/button'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import Data from '@/components/common/data/data'
import DataBody from '@/components/common/data/dataBody/dataBody'
import DataCol from '@/components/common/data/dataCol/dataCol'
import DataHeader from '@/components/common/data/dataHeader/dataHeader'
import DataHeading from '@/components/common/data/dataHeading/dataHeading'
import DataRow from '@/components/common/data/dataRow/dataRow'
import { FormGroup } from '@/components/common/form/formGroup/fromGroup'
import { Label } from '@/components/common/form/label/label'
import Select from '@/components/common/form/select/select'
import SelectButton from '@/components/common/form/select/selectButton/selectButton'
import SelectIcon from '@/components/common/form/select/selectIcon/selectIcon'
import SelectList from '@/components/common/form/select/selectList/selectList'
import SelectOption from '@/components/common/form/select/selectOption/selectOption'
import { Spinner } from '@/components/common/spinner/spinner'
import ChevronDownIcon from '@/components/icons/chevronDown/chevronDown'
import { useAuth } from '@/hooks/useAuth'
import { useGetUserInfoQuery, useGetUserTokenBalanceMutation } from '@/services/user/user.service'
import { updateNetwork, updateToken } from '@/store/slices/currency/currency.slice'
import { triggerModal, triggerWithdrawModal } from '@/store/slices/modal/modal.slice'
import { useDispatch, useSelector } from '@/store/store'
import { BaseProps, INetwork, IToken, TType } from '@/types/global.types'
import { useState } from 'react'
import { ChainTokenListProps } from './chainTokenList.types'

const ChainTokenList: BaseProps<ChainTokenListProps> = (props) => {
  const [selectedTokenWithdrawId, setSelectedTokenWithdrawId] = useState<number>()
  const dispatch = useDispatch()
  const { network } = useSelector((state) => state.currency)
  const { networks } = useSelector((state) => state.networks)
  const { isAuthorized } = useAuth()
  const { data: UserData } = useGetUserInfoQuery({}, { skip: !isAuthorized })

  const [GetTokenBalanceMutate, { isLoading: isLoadingBalance }] = useGetUserTokenBalanceMutation()

  const handleOpenDepositModal = (id: number) => {
    if (!UserData?.data.profile || !UserData?.data.name) {
      dispatch(triggerModal({ modal: 'login', trigger: true }))
    } else {
      dispatch(triggerModal({ modal: 'deposit', trigger: true }))
    }
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

  const data = networks.find((item) => item.chainId === network.chainId)?.tokens as IToken[]

  return (
    <>
      <Card>
        {/* bg-opacity-60 sm:filter-backdrop */}
        <CardBody className="rounded-tl-none lg:rounded-tr-none">
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
          <Data>
            <DataHeader className="hidden md:flex">
              <DataHeading className="w-full md:w-1/5">Chain</DataHeading>
              <DataHeading className="w-full md:w-1/5">Coin</DataHeading>
              <DataHeading className="w-full md:w-1/5">My Wallet</DataHeading>
              <DataHeading className="w-full md:w-1/5">withdraw</DataHeading>
              <DataHeading className="w-full md:w-1/5">Deposit</DataHeading>
            </DataHeader>
            <DataBody>
              {data.map((token) => {
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
                      <span>{token.balance}</span>
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
    </>
  )
}

export default ChainTokenList
