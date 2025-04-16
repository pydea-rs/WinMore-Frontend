import CasinoIcon from '@/components/icons/casino'
import ConstructionTool from '@/components/icons/constructionTool'
import { internalLinks, socialMediaLinks } from '@/configs/app-routes'
import { ElementProps } from '@/types/elements.types'
import { useRouterTools } from '@/utils/router'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '../button/button'
import Container from '../container/container'

const socialMediaItems = Object.values(socialMediaLinks).filter(({ url }) => url)

const QuickAccess: React.FC<ElementProps> = (props) => {
  const { className } = props
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAtSubPath } = useRouterTools()

  console.warn('RENDERED')
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

  const gameIsAlreadyOn = (gameName: string) => {
    return isAtSubPath(gameName, { exact: true })
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
          <Link href={internalLinks.games.mine.path}>
            <Button kind="primary" variant="info" className={`w-14 h-14 hover:!bg-primary/90 ${gameIsAlreadyOn(internalLinks.games.mine.slug) ? '!bg-gradient-gray' : ''}`}>
              <CasinoIcon className="w-6 h-6" />
            </Button>
          </Link>
          {
            <Link href={internalLinks.games.plinko.path}>
              <Button kind="primary" variant="info" className={`w-14 h-14 hover:!bg-primary/90 ${gameIsAlreadyOn(internalLinks.games.plinko.slug) ? '!bg-gradient-gray' : ''}`}>
                <ConstructionTool className="w-6 h-6" />
              </Button>
            </Link>
          }
          <hr style={{ border: '1px solid #333' }} />
          {socialMediaItems.map(({ url, Icon }, idx) => (
            <Link href={url || '#'} key={idx}>
              <Button kind="primary" variant="info" className={`w-14 h-14 hover:!bg-warning/90`}>
                <Icon className="w-6 h-6" />
              </Button>
            </Link>
          ))}
        </div>
      </motion.aside>
    </Container>
  )
}

export default QuickAccess
