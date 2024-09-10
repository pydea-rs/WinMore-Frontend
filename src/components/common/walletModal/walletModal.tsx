import DisabledIcon from '@/components/icons/disabled/disabled'
import EmailIcon from '@/components/icons/email/email'
import SingleUserIcon from '@/components/icons/singleUser/singleUser'
import { config } from '@/configs/wagmi.config'
import { useAuth } from '@/hooks/useAuth'
import classNames from 'classnames'
import Image from 'next/image'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useConnectors, useSignMessage } from 'wagmi'
import { Button } from '../button/button'
import { Card } from '../card/card'
import { CardBody } from '../card/card-body/card-body'
import { CardHeader } from '../card/card-header/card-header'
import { CardTitle } from '../card/card-title/card-title'
import { Checkbox } from '../form/checkbox/checkbox'
import { CheckboxGroup } from '../form/checkboxGroup/checkboxGroup'
import { FormGroup } from '../form/formGroup/fromGroup'
import { Label } from '../form/label/label'
import { TextForm } from '../form/textForm/textForm'
import { Input } from '../form/textInput/textInput'
import Modal from '../modal/modal'
import { Spinner } from '../spinner/spinner'
import { AccountForm, WalletModalProps } from './walletModal.types'

export const WalletModal: React.FC<WalletModalProps> = (props) => {
  const { isOpen, onClose } = props
  const connectors = useConnectors({ config: config })
  const { connectWallet } = useAuth()
  // Start Form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AccountForm>({ defaultValues: { confirm: false, email: '', name: '' } })

  const onSubmit: SubmitHandler<AccountForm> = (data) => {
    console.log(data)
  }
  const { isPending: isWaitingForSign } = useSignMessage()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* CONNECT TO WALLET */}
      <Card size="lg" className="w-full max-w-[431px]">
        <CardHeader>
          <CardTitle>Login/Sign up</CardTitle>
          <button
            onClick={onClose}
            className="appearance-none flex flex-col justify-center items-center p-2.5 focus:bg-primary focus:bg-opacity-60 hover:bg-primary hover:bg-opacity-60 active:bg-opacity-80 transition-all rounded-full "
          >
            <DisabledIcon />
          </button>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col items-center mb-5">
            <Image src={'/assets/images/logo-brand.svg'} alt="Winmore logo-brand" width={48} height={34} className="mb-2" />
            <h2 className="font-bold text-base leading-5 mb-2">WELCOME To WINMORE</h2>
            <span className="text-sm font-light">Please Connect your wallet to join us</span>
          </div>
          <div className="flex flex-col gap-4 mb-4">
            {connectors.map((wallet) => {
              return (
                <Button key={wallet.id} kind="primary" variant="warning" className="" size="lg" full onClick={() => connectWallet(wallet)} disabled={isWaitingForSign}>
                  {isWaitingForSign && (
                    <div className="absolute-center">
                      <Spinner />
                    </div>
                  )}
                  <div className={classNames({ invisible: isWaitingForSign, 'flex items-center gap-x-2': true })}>
                    {/* <MetaMaxIcon className="flex-shrink-0" />  */}
                    <img src={wallet.icon} alt={wallet.name} width={24} height={24} />
                    Connect {wallet.name}
                  </div>
                </Button>
              )
            })}
          </div>
          <span className="text-sm text-white font-normal">
            I agree to the collection of information in cookies, I agree with
            <a className="text-link" href="#" target="_blank">
              Privacy Policy
            </a>
            and with
            <a className="text-link" href="#" target="_blank">
              Terms of Use
            </a>
            , Gambling isnt forbidden by my local authorities and Im at least 18 years old.
          </span>
        </CardBody>
      </Card>

      {/* START FORM */}
      <Card size="lg" className="w-full max-w-[431px]">
        <CardHeader>
          <CardTitle>Complete your account</CardTitle>
          <button className="appearance-none flex flex-col justify-center items-center p-2.5 focus:bg-primary focus:bg-opacity-60 hover:bg-primary hover:bg-opacity-60 active:bg-opacity-80 transition-all rounded-full ">
            <DisabledIcon />
          </button>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col items-center mb-5">
            <Image src={'/assets/images/logo-brand.svg'} alt="Winmore logo-brand" width={48} height={34} className="mb-2" />
            <h2 className="font-bold text-base leading-5 mb-2">WELCOME To WINMORE</h2>
            <span className="text-sm font-light">{"We've saved your seat at the winning table."}</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start">
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FormGroup>
                    <Label htmlFor="2-1" className="flex items-center gap-x-2">
                      <SingleUserIcon />
                      <span>Name</span>
                    </Label>
                    <Input {...field} invalid={!!fieldState.error} placeholder="type here" id="2-1" />
                    {fieldState.error && <TextForm variant="invalid">This field is require!</TextForm>}
                  </FormGroup>
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FormGroup>
                    <Label htmlFor="2-2" className="flex items-center gap-x-2">
                      <EmailIcon />
                      <span>Email Address</span>
                    </Label>
                    <Input {...field} invalid={!!fieldState.error} placeholder="example@crypto.com" id="2-2" />
                    {fieldState.error && <TextForm variant="invalid">This field is require!</TextForm>}
                  </FormGroup>
                )}
              />
              <Controller
                name="confirm"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <CheckboxGroup className="flex-col">
                    <div className="flex">
                      <Checkbox {...field} id="6-3" />
                      <Label htmlFor="6-3" className="flex items-center">
                        <span className="inline-block text-white font-normal text-sm leading-5">
                          I agree to the collection of information in cookies, I agree with
                          <a className="text-link" href="#" target="_blank">
                            Privacy Policy
                          </a>
                          and with
                          <a className="text-link" href="#" target="_blank">
                            Terms of Use
                          </a>
                          , Gambling isnt forbidden by my local authorities and Im at least 18 years old.
                        </span>
                      </Label>
                    </div>
                    {fieldState.error && <TextForm variant="invalid">This field is require!</TextForm>}
                  </CheckboxGroup>
                )}
              />
              <Button kind="gradient" size="lg" full type="submit">
                Primary
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </Modal>
  )
}
