import DisabledIcon from '@/components/icons/disabled/disabled'
import EmailIcon from '@/components/icons/email/email'
import MetaMaxIcon from '@/components/icons/metaMax/metaMax'
import SingleUserIcon from '@/components/icons/singleUser/singleUser'
import { useGetNonce } from '@/services/authentication/useGetNounce/useGetNonce.hook'
import { login } from '@/store/slices/auth/auth.slice'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch } from '@/store/store'
import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { CreateConnectorFn, useConnect, useSignMessage } from 'wagmi'
import { injected, metaMask } from 'wagmi/connectors'
import { Button } from '../button/button'
import { Card } from '../card/card'
import { CardBody } from '../card/card-body/card-body'
import { CardHeader } from '../card/card-header/card-header'
import { CardTitle } from '../card/card-title/card-title'
import { Checkbox } from '../form/checkbox/checkbox'
import { FormCheck } from '../form/formCheck/formCheck'
import { FormGroup } from '../form/formGroup/fromGroup'
import { Label } from '../form/label/label'
import { TextForm } from '../form/textForm/textForm'
import { Input } from '../form/textInput/textInput'
import Modal from '../modal/modal'
import { Spinner } from '../spinner/spinner'
import { AccountForm, WalletModalProps } from './walletModal.types'

export const WalletModal: React.FC<WalletModalProps> = (props) => {
  const { isOpen, onClose } = props
  // Start Form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AccountForm>({ defaultValues: { confirm: false, email: '', name: '' } })

  const onSubmit: SubmitHandler<AccountForm> = (data) => {
    console.log(data)
  }
  // END Form
  const { connect } = useConnect()
  const [error, setError] = useState<string | null>(null)
  const { data: nonceData } = useGetNonce({})
  const dispatch = useDispatch()
  const { signMessage, isPending: isWaitingForSign } = useSignMessage({
    mutation: {
      onSuccess: (data) => {
        dispatch(
          login({
            user: {
              email: 'example@gmail.com',
              jwt_token: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto explicabo fuga reiciendis nostrum? Amet est maiores sed vel molestiae minima?',
              name: 'Max',
              public_key: data,
              signed: true,
            },
          }),
        )
        dispatch(triggerModal({ modal: 'login', trigger: false }))
      },
    },
  })

  const handleConnect = (walletName: string, connector: CreateConnectorFn) => {
    setError(null) // Reset error state
    switch (walletName) {
      case 'MetaMask':
        if (!window.ethereum) {
          setError('MetaMask is not installed. Please install it to continue.')
        }
        break
      case 'Phantom':
        // @ts-ignore
        if (!window.solana?.isPhantom) {
          setError('Phantom is not installed. Please install it to continue.')
        }
        break
      case 'Rabby':
        if (!window.ethereum?.isRabby) {
          setError('Rabby is not installed. Please install it to continue.')
        }
        break
      default:
        break
    }

    if (!nonceData) {
      return
    }

    if (!error) {
      connect(
        { connector },
        {
          onError: (error) => setError(error.message),
          onSettled: (data) => console.log(data),
          onSuccess: (data) => {
            signMessage({ message: nonceData.data.nonce })
          },
        },
      )
    }
  }

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
            <Button kind="primary" variant="warning" size="lg" full onClick={() => handleConnect('MetaMask', metaMask())}>
              <div className="flex items-center gap-x-2">
                <MetaMaxIcon className="flex-shrink-0" /> Connect MetaMask
              </div>
            </Button>

            <Button
              kind="primary"
              variant="warning"
              className=""
              size="lg"
              full
              onClick={() => handleConnect('Phantom', injected({ target: 'phantom' }))}
              disabled={isWaitingForSign}
            >
              {isWaitingForSign && (
                <div className="absolute-center">
                  <Spinner />
                </div>
              )}
              <div className={classNames({ invisible: isWaitingForSign, 'flex items-center gap-x-2': true })}>
                <MetaMaxIcon className="flex-shrink-0" /> Connect Phantom
              </div>
            </Button>

            <Button kind="primary" variant="warning" size="lg" full onClick={() => handleConnect('Rabby', injected({ target: 'rabby' }))}>
              <div className="flex items-center gap-x-2">
                <MetaMaxIcon className="flex-shrink-0" /> Connect Rabby
              </div>
            </Button>
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

          {error && (
            <div className="mt-6 text-center text-red-500">
              <p>{error}</p>
              <a
                href={error.includes('MetaMask') ? 'https://metamask.io/download/' : error.includes('Phantom') ? 'https://phantom.app/' : 'https://rabby.io/'}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-500 hover:underline"
              >
                Install {error.includes('MetaMask') ? 'MetaMask' : error.includes('Phantom') ? 'Phantom' : 'Rabby'}
              </a>
            </div>
          )}
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
                  <FormCheck className="flex-col">
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
                  </FormCheck>
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
