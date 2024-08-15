import Modals from '@/components/common/modals/modals'
import AuthProvider from '@/providers/auth.provider'
import { Web3Provider } from '@/providers/wagmi.provider'
import store from '@/store/store'
import '@/styles/globals.css'
import { AppPropsWithLayout } from '@/types/global.types'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const emptyPage = (page: ReactElement): ReactNode => page
  const getLayout = Component.layout ?? emptyPage

  return (
    <Provider store={store}>
      <Web3Provider>
        <AuthProvider>
          {getLayout(<Component {...pageProps} />)}
          <Modals />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </Web3Provider>
    </Provider>
  )
}
