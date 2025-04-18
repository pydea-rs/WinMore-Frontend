import Container from '@/components/common/container/container'
import Tab from '@/components/common/tab/tab'
import TabBody from '@/components/common/tab/tabBody/tabBody'
import TabContent from '@/components/common/tab/tabContent/tabContent'
import TabHeader from '@/components/common/tab/tabHeader/tabHeader'
import TabItem from '@/components/common/tab/tabItem/tabItem'
import LoginRequiredPage from '@/components/pages/common/LoginRequiredPage'
import { useAuth } from '@/hooks/useAuth'
import { useUserTransactionHistoryQuery } from '@/services/user/user.service'
import { MainTransactionTypes } from '@/services/user/user.service.types'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import ChainTokenList from '../../../components/pages/wallet/chainTokenList/chainTokenList'
import WalletHistory from '../../../components/pages/wallet/walletHistory/walletHistory'

const Wallet = () => {
  const { isAuthorized, token } = useAuth()
  const router = useRouter()
  const { query } = router
  const { data } = useUserTransactionHistoryQuery({ type: query.type as MainTransactionTypes | 'BLOCKCHAIN' | 'ALL' }, { skip: !isAuthorized, pollingInterval: 20000 })

  if (!isAuthorized || !token?.length) {
    return <LoginRequiredPage />
  }

  return (
    <Fragment>
      <Head>
        <title>Winmore | Wallet</title>
      </Head>
      <div className="flex flex-col flex-grow">
        <section>
          <Container className="z-10 overflow-x-visible">
            <div className="md:absolute left-4 top-0 ">
              <div className="flex items-center gap-x-2 pr-4 py-8 md:p-4 md:pl-0">
                <span className="font-bold text-lg">Wallet</span>
              </div>
            </div>

            <Tab className="mb-8">
              <TabHeader>
                <TabItem>Deposit/Withdraw</TabItem>
                <TabItem>History</TabItem>
              </TabHeader>

              <TabBody>
                <TabContent>
                  <ChainTokenList />
                </TabContent>

                <TabContent>
                  <WalletHistory data={data?.data} />
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
