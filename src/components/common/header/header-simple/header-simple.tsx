import { internalLinks } from '@/configs/app-routes'
import Image from 'next/image'
import Link from 'next/link'
import Container from '../../container/container'

const HeaderSimple = () => {
  return (
    <header className="mb-10">
      <Container kind="fluid">
        <div className="pt-8 flex items-center justify-center z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-[230px] h-[120px] z-10">
            <Image src={'/assets/images/shadow.svg'} alt="shadow" width={230} height={150} className="scale-125" />
          </div>
          <Link href={internalLinks.home.path} className="flex justify-center">
            <Image src={'/assets/images/logo.svg'} alt="shadow" width={140} height={40} />
          </Link>
        </div>
      </Container>
    </header>
  )
}

export default HeaderSimple
