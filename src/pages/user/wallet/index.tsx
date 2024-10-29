import Container from '@/components/common/container/container'
import Tab from '@/components/common/tab/tab'
import TabBody from '@/components/common/tab/tabBody/tabBody'
import TabContent from '@/components/common/tab/tabContent/tabContent'
import TabHeader from '@/components/common/tab/tabHeader/tabHeader'
import TabItem from '@/components/common/tab/tabItem/tabItem'
import Head from 'next/head'
import { Fragment } from 'react'
import ChainTokenList from './chainTokenList/chainTokenList'
import WalletHistory from './walletHistory/walletHistory'

const Wallet = () => {
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
                  <ChainTokenList />
                </TabContent>

                <TabContent>
                  <WalletHistory />
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
