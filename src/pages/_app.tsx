import Modals from '@/components/common/modals/modals'
import AuthProvider from '@/providers/auth.provider'
import { Web3Provider } from '@/providers/wagmi.provider'
import store from '@/store/store'
import '@/styles/globals.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Web3Provider>
        <AuthProvider>
          <Component {...pageProps} />
          <Modals />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </Web3Provider>
    </Provider>
  )
}
