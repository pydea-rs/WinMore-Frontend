import Container from '@/components/common/container/container'
import { useDispatch } from '@/store/store'
import Head from 'next/head'
import { Fragment } from 'react'

const UserMessages = () => {
  const dispatch = useDispatch()

  return (
    <Fragment>
      <Head>
        <title>Winmore | Messages</title>
      </Head>
      <div className="flex flex-col flex-grow">
        <section>
          <Container className="z-10 overflow-x-visible">User Messages</Container>
        </section>
      </div>
    </Fragment>
  )
}

export default UserMessages
