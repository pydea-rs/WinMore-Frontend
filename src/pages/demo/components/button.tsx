import { Button } from '@/components/common/button/button'
import Container from '@/components/common/container/container'
import { HoldToActionButton } from '@/components/common/holdToAction/holdToActionButton/holdToActionButton'
import { HoldToActionComplete } from '@/components/common/holdToAction/holdToActionComplete/holdToActionComplete'
import { HoldToActionContent } from '@/components/common/holdToAction/holdToActionContent/holdToActionContent'
import { HoldToActionProvider } from '@/components/common/holdToAction/holdToActionProvider'
import { useHoldToAction } from '@/components/common/holdToAction/holdToActionProvider.hook'
import { Spinner } from '@/components/common/spinner/spinner'
import ArrowRightIcon from '@/components/icons/arrowRight/arrowRight'
import ChevronDownIcon from '@/components/icons/chevronDown/chevronDown'
import ChevronRightIcon from '@/components/icons/chevronRight/chevronRight'
import CryptoCurrencyIcon from '@/components/icons/cryptoCurrency/cryptoCurrency'
import DiceThreeIcon from '@/components/icons/diceThree/diceThree'
import DoneIcon from '@/components/icons/done/done.icon'
import MetaMaxIcon from '@/components/icons/metaMax/metaMax'
import MoneyIcon from '@/components/icons/money/money'
import SingleUserIcon from '@/components/icons/singleUser/singleUser'
import SphereIcon from '@/components/icons/sphere/sphere'
import classNames from 'classnames'
import Image from 'next/image'

const ButtonComponentDemo = () => {
  const isLoading = true
  return (
    <Container kind="fluid">
      <div className="flex gap-2 p-5 flex-wrap">
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Primary Button - Small</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="primary" size="sm" className="w-36" variant="primary">
              Primary
            </Button>
            <Button kind="primary" size="sm" className="w-36" variant="secondary">
              Secondary
            </Button>
            <Button kind="primary" size="sm" className="w-36" variant="success">
              Success
            </Button>
            <Button kind="primary" size="sm" className="w-36" variant="info">
              Info
            </Button>
            <Button kind="primary" size="sm" className="w-36" variant="warning">
              Warning
            </Button>
            <Button kind="primary" size="sm" className="w-36" variant="danger">
              Danger
            </Button>
            <Button kind="primary" size="sm" className="w-36" variant="white">
              White
            </Button>
            <Button kind="primary" size="sm" className="w-36" variant="dark">
              Dark
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Primary Button - Regular</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="primary" className="w-36" variant="primary">
              Primary
            </Button>
            <Button kind="primary" className="w-36" variant="secondary">
              Secondary
            </Button>
            <Button kind="primary" className="w-36" variant="success">
              Success
            </Button>
            <Button kind="primary" className="w-36" variant="info">
              Info
            </Button>
            <Button kind="primary" className="w-36" variant="warning">
              Warning
            </Button>
            <Button kind="primary" className="w-36" variant="danger">
              Danger
            </Button>
            <Button kind="primary" className="w-36" variant="white">
              White
            </Button>
            <Button kind="primary" className="w-36" variant="dark">
              Dark
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Primary Button - Large</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="primary" className="w-36" size="lg" variant="primary">
              Primary
            </Button>
            <Button kind="primary" className="w-36" size="lg" variant="secondary">
              Secondary
            </Button>
            <Button kind="primary" className="w-36" size="lg" variant="success">
              Success
            </Button>
            <Button kind="primary" className="w-36" size="lg" variant="info">
              Info
            </Button>
            <Button kind="primary" className="w-36" size="lg" variant="warning">
              Warning
            </Button>
            <Button kind="primary" className="w-36" size="lg" variant="danger">
              Danger
            </Button>
            <Button kind="primary" className="w-36" size="lg" variant="white">
              White
            </Button>
            <Button kind="primary" className="w-36" size="lg" variant="dark">
              Dark
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Primary Button - block</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="primary" size="sm" full variant="primary">
              Primary
            </Button>
            <Button kind="primary" size="sm" full variant="secondary">
              Secondary
            </Button>
            <Button kind="primary" full variant="success">
              Success
            </Button>
            <Button kind="primary" full variant="info">
              Info
            </Button>
            <Button kind="primary" full variant="warning">
              Warning
            </Button>
            <Button kind="primary" size="lg" full variant="danger">
              Danger
            </Button>
            <Button kind="primary" size="lg" full variant="white">
              White
            </Button>
            <Button kind="primary" size="lg" full variant="dark">
              Dark
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Primary Button - pilled</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="primary" pilled className="w-36" variant="primary">
              Primary
            </Button>
            <Button kind="primary" pilled className="w-36" variant="secondary">
              Secondary
            </Button>
            <Button kind="primary" pilled className="w-36" variant="success">
              Success
            </Button>
            <Button kind="primary" pilled className="w-36" variant="info">
              Info
            </Button>
            <Button kind="primary" pilled className="w-36" variant="warning">
              Warning
            </Button>
            <Button kind="primary" pilled className="w-36" variant="danger">
              Danger
            </Button>
            <Button kind="primary" pilled className="w-36" variant="white">
              White
            </Button>
            <Button kind="primary" pilled className="w-36" variant="dark">
              Dark
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Primary Button - disabled</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="primary" disabled className="w-36" variant="primary">
              Primary
            </Button>
            <Button kind="primary" disabled className="w-36" variant="secondary">
              Secondary
            </Button>
            <Button kind="primary" disabled className="w-36" variant="success">
              Success
            </Button>
            <Button kind="primary" disabled className="w-36" variant="info">
              Info
            </Button>
            <Button kind="primary" disabled className="w-36" variant="warning">
              Warning
            </Button>
            <Button kind="primary" disabled className="w-36" variant="danger">
              Danger
            </Button>
            <Button kind="primary" disabled className="w-36" variant="white">
              White
            </Button>
            <Button kind="primary" disabled className="w-36" variant="dark">
              Dark
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Primary Button - Icon</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="primary" className="w-36" variant="primary">
              <div className="flex items-center gap-x-2">
                <MetaMaxIcon className="flex-shrink-0" /> Primary
              </div>
            </Button>
            <Button kind="primary" className="w-36" variant="secondary">
              <div className="flex items-center gap-x-2">
                <MetaMaxIcon className="flex-shrink-0" />
                Secondary
              </div>
            </Button>
            <Button kind="primary" className="w-36" variant="success">
              <div className="flex items-center gap-x-2">
                <MetaMaxIcon className="flex-shrink-0" />
                Success
              </div>
            </Button>
            <Button kind="primary" className="w-36" variant="info">
              <div className="flex items-center gap-x-2">
                <MetaMaxIcon className="flex-shrink-0" />
                Info
              </div>
            </Button>
            <Button kind="primary" className="w-36" variant="warning">
              <div className="flex items-center gap-x-2">
                <MetaMaxIcon className="flex-shrink-0" />
                Warning
              </div>
            </Button>
            <Button kind="primary" className="w-36" variant="danger">
              <div className="flex items-center gap-x-2">
                <MetaMaxIcon className="flex-shrink-0" />
                Danger
              </div>
            </Button>
            <Button kind="primary" className="w-36" variant="white">
              <div className="flex items-center gap-x-2">
                <MetaMaxIcon className="flex-shrink-0" />
                White
              </div>
            </Button>
            <Button kind="primary" className="w-36" variant="dark">
              <div className="flex items-center gap-x-2">
                <MetaMaxIcon className="flex-shrink-0" />
                Dark
              </div>
            </Button>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Gradient Button - Small</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="gradient" className="w-36" size="sm">
              Primary
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Gradient Button - Regular</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="gradient" className="w-36">
              Primary
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Gradient Button - Large</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="gradient" className="w-36" size="lg">
              Primary
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Gradient Button - Block</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="gradient" className="w-36" size="sm" full>
              Primary
            </Button>
            <Button kind="gradient" className="w-36" full>
              Primary
            </Button>
            <Button kind="gradient" className="w-36" size="lg" full>
              Primary
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Gradient Button - Pilled</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="gradient" className="w-36" pilled>
              Primary
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Gradient Button - Disabled</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="gradient" className="w-36" disabled>
              Primary
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Gradient Button - Icon</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="gradient" className="w-36" size="sm">
              <div className="flex items-center gap-x-2">
                <DiceThreeIcon className="flex-shrink-0" />
                Primary
              </div>
            </Button>
            <Button kind="gradient" className="w-36">
              <div className="flex items-center gap-x-2">
                <DiceThreeIcon className="flex-shrink-0" />
                Primary
              </div>
            </Button>
            <Button kind="gradient" className="w-36" size="lg">
              <div className="flex items-center gap-x-2">
                <DiceThreeIcon className="flex-shrink-0" />
                Primary
              </div>
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Primary Button - Multiple Icon</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="primary" variant="secondary" className="flex justify-between font-medium " full size="lg">
              <div className="flex items-center gap-x-2 text-primary">
                <CryptoCurrencyIcon className="flex-shrink-0" />
                Primary
              </div>
            </Button>
            <Button kind="primary" variant="secondary" className="flex justify-between font-medium " full size="lg">
              <div className="flex items-center gap-x-2 text-primary">
                <CryptoCurrencyIcon className="flex-shrink-0" />
                Wallet Address
              </div>
            </Button>
            <Button kind="primary" variant="secondary" className="flex justify-between font-medium  text-primary" full size="lg">
              <div className="flex items-center gap-x-2 ">
                <SphereIcon className="flex-shrink-0" />
                Web 3 Wallets
              </div>
              <div className="flex items-center gap-x-1">
                <MetaMaxIcon className="mr-0" />
                <ChevronRightIcon />
              </div>
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-secondary w-80">
          <h1 className="text-main mb-4">Primary Button - Gradient with border</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="gradient" variant="yellow-dark" className="flex justify-between font-medium font-dmSans" pilled bordered>
              <div className="flex items-center gap-x-2">
                <MoneyIcon className="flex-shrink-0 text-yellow-500" />
                13941
              </div>
            </Button>

            <Button kind="primary" size="lg" bordered full>
              primary
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-[#2D305D] w-80">
          <h1 className="text-main mb-4">Primary Button - Light</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="primary" variant="light" pilled>
              <div className="flex items-center gap-x-2">
                Play Plinko
                <ArrowRightIcon />
              </div>
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-secondary w-80">
          <h1 className="text-main mb-4">Primary Button - Pattern</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="pattern" variant="glitch">
              Connect Wallet
            </Button>
            <Button kind="pattern" bordered pilled>
              <div className="flex items-center gap-x-2">
                <SingleUserIcon />
                <span>Macan</span>
                <ChevronDownIcon />
              </div>
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-secondary w-80">
          <h1 className="text-main mb-4">Primary Button - Custom</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="pattern" className="px-2.5" bordered pilled>
              <div className="flex justify-between items-center gap-x-2">
                <Image src={'/assets/images/tether.png'} width={24} height={24} alt="tether" />
                <div className="flex items-center gap-x-1 font-normal text-xs">
                  <span className="text-main">Balance:</span>
                  <span className="text-white">0.000</span>
                </div>
                <ChevronDownIcon />
              </div>
            </Button>
            <Button kind="pattern" className="px-2" bordered pilled>
              <div className="flex rounded-full justify-between items-center gap-x-2 bg-gradient-primary px-3 py-2">Deposit</div>
            </Button>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white w-80">
          <h1 className="text-main mb-4">Primary Button - Loading</h1>
          <div className="flex flex-col items-start gap-y-2">
            <Button kind="primary" className="w-36" variant="primary" disabled={isLoading}>
              {isLoading && (
                <div className="absolute-center">
                  <Spinner />
                </div>
              )}
              <span className={classNames({ invisible: isLoading })}>Primary</span>
            </Button>
            <Button kind="primary" className="w-36" variant="secondary" disabled={isLoading}>
              {isLoading && (
                <div className="absolute-center">
                  <Spinner kind="grow" />
                </div>
              )}
              <span className={classNames({ invisible: isLoading })}>Secondary</span>
            </Button>
            <div className="bg-secondary p-4">
              <Button kind="pattern" className="px-2.5" bordered pilled>
                {isLoading && (
                  <div className="absolute-center">
                    <Spinner kind="grow" />
                  </div>
                )}

                <div className={classNames({ 'flex justify-between items-center gap-x-2': true, invisible: isLoading })}>
                  <Image src={'/assets/images/tether.png'} width={24} height={24} alt="tether" />
                  <div className="flex items-center gap-x-1 font-normal text-xs">
                    <span className="text-main">Balance:</span>
                    <span className="text-white">0.000</span>
                  </div>
                  <ChevronDownIcon />
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-secondary w-80">
          <h1 className="text-main mb-4">Hold to Action</h1>
          <div className="flex flex-col items-start gap-y-2">
            <HoldToActionProvider>
              <HoldToActionButton
                keepInitialContent
                onFinish={() => {
                  console.log("I'm firing!")
                }}
              >
                <HoldToActionContent>Basic - keep Initial Content</HoldToActionContent>
                <HoldToActionComplete>{" I'm not wanted here :( "}</HoldToActionComplete>
              </HoldToActionButton>
            </HoldToActionProvider>

            <HoldToActionProvider>
              <HoldToActionButton
                disabled
                onFinish={() => {
                  console.log("I'm firing!")
                }}
              >
                <HoldToActionContent>Disabled</HoldToActionContent>
                <HoldToActionComplete>{" I'm not wanted here :( "}</HoldToActionComplete>
              </HoldToActionButton>
            </HoldToActionProvider>

            <HoldToActionProvider>
              <HoldToActionButton
                onFinish={() => {
                  console.log("I'm firing!")
                }}
              >
                <HoldToActionContent>with success content</HoldToActionContent>
                <HoldToActionComplete>
                  <DoneIcon className={'absolute-center z-10'} />
                </HoldToActionComplete>
              </HoldToActionButton>
            </HoldToActionProvider>

            <HoldToActionProvider>
              <HoldToActionButton
                resetOnFinish
                keepInitialContent
                onFinish={() => {
                  console.log("I'm firing!")
                }}
              >
                <HoldToActionContent>Reset after done</HoldToActionContent>
                <HoldToActionComplete>{' Me neither :( '}</HoldToActionComplete>
              </HoldToActionButton>
            </HoldToActionProvider>

            <HoldToActionProvider>
              <HoldToActionButton
                resetOnFinish
                onFinish={() => {
                  console.log("I'm firing!")
                }}
              >
                <HoldToActionContent>Reset after showing complete content</HoldToActionContent>
                <HoldToActionComplete>
                  <DoneIcon className={'absolute-center z-10'} />
                </HoldToActionComplete>
              </HoldToActionButton>
            </HoldToActionProvider>

            <HoldToActionProvider>
              <HoldToActionButtonControlled />
            </HoldToActionProvider>

            <HoldToActionProvider>
              <HoldToActionButtonControlledWithContent />
            </HoldToActionProvider>
          </div>
        </div>
      </div>
    </Container>
  )
}

const HoldToActionButtonControlled = () => {
  const context = useHoldToAction()
  if (!context) return null

  return (
    <div className="w-full flex flex-col border border-blue-300 p-4 gap-2">
      <Button
        variant="info"
        kind="primary"
        size="sm"
        onClick={() => {
          context.onReset()
        }}
      >
        Reset my brother
      </Button>
      <HoldToActionButton
        keepInitialContent
        onFinish={() => {
          console.log("I'm firing!")
        }}
      >
        <HoldToActionContent>keep Initial Content</HoldToActionContent>
        <HoldToActionComplete>No one sees me here</HoldToActionComplete>
      </HoldToActionButton>
    </div>
  )
}

const HoldToActionButtonControlledWithContent = () => {
  const context = useHoldToAction()
  if (!context) return null

  return (
    <div className="w-full flex flex-col border border-blue-300 p-4 gap-2">
      <Button
        variant="info"
        kind="primary"
        size="sm"
        onClick={() => {
          context.onReset()
        }}
      >
        Reset my brother
      </Button>
      <HoldToActionButton
        duration={5000}
        onFinish={() => {
          console.log("I'm firing!")
        }}
      >
        <HoldToActionContent>with success content + custom duration</HoldToActionContent>
        <HoldToActionComplete>
          <DoneIcon className={'absolute-center z-10'} />
        </HoldToActionComplete>
      </HoldToActionButton>
    </div>
  )
}

export default ButtonComponentDemo
