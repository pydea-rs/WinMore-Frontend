import Container from '@/components/common/container/container'
import UserProfile from '@/components/pages/profile'
import Head from 'next/head'
import { Fragment } from 'react'

const User = () => {
  return (
    <Fragment>
      <Head>
        <title>Winmore | Profile</title>
      </Head>
      <div className="flex flex-col flex-grow">
        <section>
          <Container className="z-10 overflow-x-visible">
            <div className="left-4 top-0 mb-6">
              <div className="flex items gap-x-2 pr-4 md:pl-0">
                <span className="font-bold text-lg">Profile</span>
              </div>
            </div>

            <div className="profile-container-box">
              <UserProfile />
            </div>
          </Container>
        </section>
      </div>
    </Fragment>
  )
}

export default User
