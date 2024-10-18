import Container from '@/components/common/container/container'
import MainLayout from '@/components/layouts/main.layout'
import { NextPageContext } from 'next'
import { ReactElement } from 'react'

export default function Error({ statusCode }: { statusCode: number }) {
  return (
    <Container>
      <div className="flex justify-center items-center h-[calc(100svh-205px)]">
        <p>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</p>
      </div>
    </Container>
  )
}
Error.layout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}
Error.getInitialProps = ({ res, err, ...context }: NextPageContext) => {
  if (res) {
    return { statusCode: res.statusCode }
  }
  return { statusCode: err ? err.statusCode : 400 }
}
