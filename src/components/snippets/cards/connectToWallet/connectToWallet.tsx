import { Button } from '@/components/common/button/button'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { CardHeader } from '@/components/common/card/card-header/card-header'
import { CardTitle } from '@/components/common/card/card-title/card-title'
import { Spinner } from '@/components/common/spinner/spinner'
import DisabledIcon from '@/components/icons/disabled/disabled'
import { config } from '@/configs/wagmi.config'
import { useAuth } from '@/hooks/useAuth'
import classNames from 'classnames'
import Image from 'next/image'
import { useAccount, useConnectors, useSignMessage } from 'wagmi'
import { ConnectToWalletCardProps } from './connectToWallet.types'

export const ConnectToWalletCard: React.FC<ConnectToWalletCardProps> = (props) => {
  const { isOpenModal, onCloseModal, onComplete } = props
  const connectors = useConnectors({ config: config })
  const { connectWallet } = useAuth()
  const { isConnecting, isReconnecting, status } = useAccount()
  const { isPending: isWaitingForSign } = useSignMessage()
  const isLoading = isWaitingForSign || isConnecting || isReconnecting
  return (
    <Card size="lg" className="w-full max-w-[431px]">
      <CardHeader>
        <CardTitle>Login/Sign up</CardTitle>
        <button
          onClick={onCloseModal}
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
              <Button
                key={wallet.id}
                kind="primary"
                variant="warning"
                className=""
                size="lg"
                full
                onClick={() => {
                  connectWallet(wallet)
                }}
                disabled={isLoading}
              >
                {isLoading && (
                  <div className="absolute-center">
                    <Spinner />
                  </div>
                )}
                <div className={classNames({ invisible: isWaitingForSign, 'flex items-center gap-x-2': true })}>
                  {/* <MetaMaxIcon className="flex-shrink-0" />  */}
                  <Image src={`/assets/images/wallets/${wallet.name}.svg` || ''} alt={wallet.name} width={24} height={24} />
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
  )
}
