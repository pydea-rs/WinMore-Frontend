import Container from '@/components/common/container/container'
import ComingSoonPage from '@/components/pages/common/ComingSoonPage'
import LoginRequiredPage from '@/components/pages/common/MustLoginFirst'
import { useAuth } from '@/hooks/useAuth'
import { useDispatch } from '@/store/store'
import Head from 'next/head'
import { Fragment } from 'react'

const UserMessages = () => {
  const dispatch = useDispatch()

  const { isAuthorized, token } = useAuth()

  if (!isAuthorized || !token?.length) {
    return <LoginRequiredPage />
  }

  return (
    <Fragment>
      <Head>
        <title>Winmore | Messages</title>
      </Head>
      <div className="flex flex-col flex-grow">
        <section>
          <Container className="z-10 overflow-x-visible">
            <ComingSoonPage />
          </Container>
        </section>
      </div>
    </Fragment>
  )
}

export default UserMessages
