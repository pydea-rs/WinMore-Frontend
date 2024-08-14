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
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Web3Provider>
    </Provider>
  )
}
