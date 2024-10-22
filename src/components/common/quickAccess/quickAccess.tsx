import CasinoIcon from '@/components/icons/casino/casino'
import ConstructionTool from '@/components/icons/constructionTool/constructionTool'
import { usePermalink } from '@/hooks/usePermalink'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from '../button/button'
import Container from '../container/container'
import { QuickAccessProps } from './quickAccess.types'

const QuickAccess: React.FC<QuickAccessProps> = (props) => {
  const { className } = props
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const { internalLinks } = usePermalink()

  const variants = {
    open: { top: '20px' },
    closed: { top: '140px' },
  }

  const classList = classNames({
    [`quick-access`]: true,
    [`animated`]: isScrolled,
    [`${className}`]: className,
  })

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const checkGameName = (url: string, valueToMatch: string) => {
    const urlToArr = url.split('/')
    const gameName = urlToArr[urlToArr.length - 1]

    return gameName === valueToMatch
  }

  return (
    <Container kind="fluid">
      <motion.aside
        initial={{ top: '140px' }}
        animate={isScrolled ? 'open' : 'closed'}
        variants={variants}
        className={classList}
        transition={{
          ease: 'easeInOut',
          duration: 0.3,
          delay: 0,
        }}
      >
        <div className="w-fit flex flex-col gap-4 ">
          <Link href={internalLinks.game.get('mine')}>
            <Button kind="primary" variant="info" className={`w-14 h-14 hover:!bg-primary/90 ${checkGameName(router.asPath, 'mine') ? '!bg-gradient-gray' : ''}`}>
              <CasinoIcon className="w-6 h-6" />
            </Button>
          </Link>
          <Link href={internalLinks.game.get('plinko')}>
            <Button kind="primary" variant="info" className={`w-14 h-14 hover:!bg-primary/90 ${checkGameName(router.asPath, 'plinko') ? '!bg-gradient-gray' : ''}`}>
              <ConstructionTool className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </motion.aside>
    </Container>
  )
}

export default QuickAccess
