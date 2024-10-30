import MainLayout from '@/components/layouts/main.layout'
import SettingsLayout from '@/components/layouts/settings.layout'
import AuthProvider from '@/providers/auth.provider'
import ChainProvider from '@/providers/chain.provider'
import Modals from '@/providers/modals.provider'
import { Web3Provider } from '@/providers/wagmi.provider'
import { persistor, store } from '@/store/store'
import '@/styles/globals.css'
import { AppPropsWithLayout } from '@/types/global.types'
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar'

import { DM_Sans } from 'next/font/google'
import LocalFont from 'next/font/local'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Slide, ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'

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
        <PersistGate loading={null} persistor={persistor}>
          <Web3Provider>
            <ChainProvider>
              <AuthProvider>
                <SettingsLayout>{getLayout(<Component {...pageProps} />)}</SettingsLayout>
                <Modals />
              </AuthProvider>
            </ChainProvider>
          </Web3Provider>
        </PersistGate>
      </Provider>
      <ProgressBar height="4px" color="#ff0000" options={{ showSpinner: false }} shallowRouting />

      <ToastContainer
        position="top-right"
        className="!z-[999999999999999999] !font-fractul"
        autoClose={3000}
        closeButton={false}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </div>
  )
}
