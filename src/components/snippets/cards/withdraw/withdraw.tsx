import { Alert } from '@/components/common/alert/alert'
import { Button } from '@/components/common/button/button'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { CardHeader } from '@/components/common/card/card-header/card-header'
import { CardTitle } from '@/components/common/card/card-title/card-title'
import { FormGroup } from '@/components/common/form/formGroup/fromGroup'
import { Label } from '@/components/common/form/label/label'
import Select from '@/components/common/form/select/select'
import SelectButton from '@/components/common/form/select/selectButton/selectButton'
import SelectIcon from '@/components/common/form/select/selectIcon/selectIcon'
import SelectList from '@/components/common/form/select/selectList/selectList'
import SelectOption from '@/components/common/form/select/selectOption/selectOption'
import { TextForm } from '@/components/common/form/textForm/textForm'
import { Input } from '@/components/common/form/textInput/textInput'
import { Spinner } from '@/components/common/spinner/spinner'
import ChevronDownIcon from '@/components/icons/chevronDown/chevronDown'
import DisabledIcon from '@/components/icons/disabled/disabled'
import WalletIcon from '@/components/icons/wallet/walet.icon'
import WarningIcon from '@/components/icons/warning/warning'
import { useWithdrawMutation } from '@/services/user/user.service'
import { triggerWithdrawModal } from '@/store/slices/modal/modal.slice'
import { useDispatch, useSelector } from '@/store/store'
import { TType } from '@/types/global.types'
import { Fragment } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { WithdrawCardProps, WithdrawForm } from './withdraw.types'

const gasList: Array<TType> = [{ id: 0, name: 'Medium (Fee: 0.00900000 USDC)', icon: undefined }]

function arrayToObject(array: TType[]): Record<number, TType> {
  return array.reduce((obj: Record<number, TType>, item: TType) => {
    obj[`${item.id}`] = item
    return obj
  }, {})
}

export const WithdrawCard: React.FC<WithdrawCardProps> = (props) => {
  const { isOpenModal, onCloseModal, onComplete } = props
  const { network, token } = useSelector((state) => state.currency)
  const { data: modalData } = useSelector((state) => state.modal.modals.withdraw)
  const { networks } = useSelector((state) => state.networks)

  const dispatch = useDispatch()
  const {
    control: withdrawFormController,
    handleSubmit: withdrawFormHandleSubmit,
    watch: withdrawFormWatch,
    setValue: withdrawFormSetValue,
    formState: { errors },
  } = useForm<WithdrawForm>({ defaultValues: { chain: network.chainId, amount: '' } })
  const [withdrawMutate, { isLoading: isSendingWithdrawRequest }] = useWithdrawMutation()
  const handleSubmit = async (values: WithdrawForm) => {
    await withdrawMutate({
      amount: +values.amount,
      chain: network.chainId,
      token: modalData?.token || '',
    })
      .unwrap()
      .then((res) => {
        toast.success(res.data.trxHash)
      })
      .catch((err) => console.log(err))
    dispatch(triggerWithdrawModal({ data: null, trigger: false }))
  }
  const amountValueWatch = withdrawFormWatch('amount')
  const gasListOBJ: any = arrayToObject(gasList)

  return (
    <Card size="lg" className="w-full max-w-[430px]">
      <CardHeader>
        <CardTitle>Withdraw</CardTitle>
        <button
          onClick={onCloseModal}
          className="appearance-none flex flex-col justify-center items-center p-2.5 focus:bg-primary focus:bg-opacity-60 hover:bg-primary hover:bg-opacity-60 active:bg-opacity-80 transition-all rounded-full "
        >
          <DisabledIcon />
        </button>
      </CardHeader>
      <CardBody>
        <form onSubmit={withdrawFormHandleSubmit(handleSubmit)}>
          <FormGroup>
            <Label className="flex items-center justify-between">
              Chain
              <span className="text-sm font-medium text-[#2A323A]">24h remaining limit: 0.00 / 9900 {modalData?.token}</span>
            </Label>

            <Controller
              name="chain"
              control={withdrawFormController}
              rules={{
                required: { value: true, message: "It's require" },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <Select
                  value={{ id: network.chainId, name: network.name }}
                  onChange={(op) => {
                    onChange(op.id.toString())
                  }}
                >
                  <SelectButton className="flex items-center justify-between ">
                    <div className="flex items-center text-sm text-main font-medium gap-x-2">
                      {/* {network?.icon ? <Avatar src={network?.icon} alt="flag" /> : <div className="w-6 h-6 bg-black rounded-full" />} */}
                      <div className="w-6 h-6 bg-black rounded-full" />
                      {network.name}
                    </div>
                    <ChevronDownIcon className="pointer-events-none size-6 fill-white/60" aria-hidden="true" />
                  </SelectButton>
                  <SelectList>
                    {networks.map(({ chainId: id, name }) => (
                      <SelectOption value={{ id, name }} key={id} className="flex items-center">
                        {/* {icon ? (
                          <SelectIcon>
                            <Avatar className="flex-shrink-0" size="md" src={icon} alt="flag" />
                          </SelectIcon>
                        ) : ( */}
                        <SelectIcon>
                          <div className="w-6 h-6 bg-black rounded-full" />
                        </SelectIcon>
                        {/* )} */}
                        <span className="inline-block text-sm text-main font-medium group-data-[selected]:text-white">{name}</span>
                      </SelectOption>
                    ))}
                  </SelectList>
                  {fieldState.invalid && <TextForm variant="invalid">put your error message</TextForm>}
                </Select>
              )}
            />
          </FormGroup>

          {/* <FormGroup>
            <Label className="flex items-center justify-between">
              Coin
              <span className="text-main">
                Available: <span className="text-white">10.22</span>
              </span>
            </Label>
            <Controller
              name="coin"
              control={withdrawFormController}
              rules={{
                required: { value: true, message: "It's require" },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <Fragment>
                  <div className="relative">
                    <button
                      className="appearance-none w-10 h-10 text-sm font-medium text-main absolute left-3 z-10 top-2.5 active:opacity-70 rounded-full active:bg-white/20"
                      type="button">
                      Min.
                    </button>
                    <button
                      className="appearance-none w-10 h-10 text-sm font-medium text-primary absolute right-3 top-2.5 z-10 active:opacity-70 rounded-full active:bg-white/20"
                      type="button">
                      Max
                    </button>
                    <NumberInput className="px-16" onChange={onChange} onBlur={onBlur} value={value} id="id-233" placeholder="0" />
                  </div>
                  {fieldState.invalid && <TextForm variant="invalid">put your error message</TextForm>}
                </Fragment>
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label className="flex items-center gap-x-2">
              <FinanceIcon />
              <span>Gas level</span>
            </Label>

            <Controller
              name="gas_level"
              control={withdrawFormController}
              rules={{
                required: { value: true, message: "It's require" },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <Select
                  value={gasListOBJ[value]}
                  onChange={(op) => {
                    onChange(op.id.toString())
                  }}>
                  <SelectButton className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-main font-medium gap-x-2 w-full">
                      <span>{gasListOBJ[value]?.name}</span>
                      <div className="flex ml-auto gap-x-1">
                        <ChevronDownIcon className="pointer-events-none size-6 text-white" aria-hidden="true" />
                      </div>
                    </div>
                  </SelectButton>
                  <SelectList>
                    {gasList.map(({ icon, id, name }) => (
                      <SelectOption value={{ id, name, icon }} key={id} className="flex items-center">
                        <span className="inline-block text-sm text-main font-medium group-data-[selected]:text-white">{name}</span>
                        <div className="flex ml-auto gap-x-1">
                          <ChevronDownIcon className="pointer-events-none size-6 text-white" aria-hidden="true" />
                        </div>
                      </SelectOption>
                    ))}
                  </SelectList>
                  {fieldState.invalid && <TextForm variant="invalid">put your error message</TextForm>}
                </Select>
              )}
            />
          </FormGroup> */}
          <FormGroup>
            <Label className="flex items-center justify-between ">
              <div className="flex items-center gap-x-2">
                <WalletIcon />
                <span>{modalData?.token} Wallet</span>
              </div>
              <span className="text-main">
                Available: <span className="text-white">{modalData?.balance.toLocaleString() || 0}</span>
              </span>
            </Label>
            <Controller
              name="amount"
              control={withdrawFormController}
              rules={{
                required: { value: true, message: "It's require" },
                validate: (value) => parseFloat(value) <= (modalData?.balance || 0) || `Bet amount cannot exceed ${modalData?.balance}`,
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <Fragment>
                  <div className="relative">
                    <button
                      className="appearance-none w-16 h-10 text-sm font-medium text-primary absolute right-3 top-2.5 z-10 active:opacity-70 rounded-full active:bg-white/20"
                      onClick={() => {
                        withdrawFormSetValue('amount', modalData?.balance.toString() || '0')
                      }}
                      type="button"
                    >
                      AutoSet
                    </button>
                    <Input className="pr-20" onChange={onChange} onBlur={onBlur} value={value} id="id-233" placeholder="Amount" />
                  </div>
                  {fieldState.invalid && <TextForm variant="invalid">{fieldState.error?.message}</TextForm>}
                </Fragment>
              )}
            />
            <span className="text-sm text-main font-medium block pt-[2px]">
              You will receive:{' '}
              <span className="text-white">
                {Number(amountValueWatch).toLocaleString()} {modalData?.token}
              </span>
            </span>
          </FormGroup>

          <Alert variant="warning" className="flex gap-2 mb-4 ">
            <WarningIcon className="flex-shrink-0" />
            <span>To ensure security, large or suspicious withdrawal may take 1-24 hours for audit. Thank you for your patience</span>
          </Alert>

          {/* check the demo button page to find the loading examples */}
          <Button kind="gradient" className="w-36" full type="submit" size="lg" disabled={isSendingWithdrawRequest}>
            <div className="flex items-center gap-x-2">
              Withdraw
              {isSendingWithdrawRequest ? <Spinner size="sm" /> : <></>}
            </div>
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
