import Modals from '@/components/common/modals/modals'
import MainLayout from '@/components/layouts/main.layout'
import AuthProvider from '@/providers/auth.provider'
import { Web3Provider } from '@/providers/wagmi.provider'
import store from '@/store/store'
import '@/styles/globals.css'
import { AppPropsWithLayout } from '@/types/global.types'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DM_Sans } from 'next/font/google'
import LocalFont from 'next/font/local'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
export const Fractul = LocalFont({
  src: [
    {
      path: '../../public/assets/fonts/Fractul/woff2/Fractul-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Fractul/woff2/Fractul-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Fractul/woff2/Fractul-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Fractul/woff2/Fractul-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Fractul/woff2/Fractul-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Fractul/woff2/Fractul-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Fractul/woff2/Fractul-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Fractul/woff2/Fractul-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-fractul',
})
export const DMSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const defaultLayout = (page: ReactElement): ReactNode => <MainLayout>{page}</MainLayout>
  const getLayout = Component.layout ?? defaultLayout

  return (
    <div className={`${Fractul.className} ${DMSans.variable}`}>
      <Provider store={store}>
        <Web3Provider>
          <AuthProvider>
            {getLayout(<Component {...pageProps} />)}
            <Modals />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </Web3Provider>
      </Provider>
    </div>
  )
}
