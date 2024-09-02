import CasinoIcon from '@/components/icons/casino/casino'
import ConstructionTool from '@/components/icons/constructionTool/constructionTool'
import { ElementProps } from '@/types/elements.types'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from '../button/button'
import Container from '../container/container'

const QuickAccess: React.FC<ElementProps> = (props) => {
  const { className } = props
  const [isScrolled, setIsScrolled] = useState(false)

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

  return (
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
      <Container kind="fluid">
        <div className="w-fit flex flex-col gap-4">
          <Button kind="primary" variant="info" className="w-14 h-14 hover:bg-primary/90">
            <CasinoIcon className="w-6 h-6" />
          </Button>
          <Button kind="primary" variant="info" className="w-14 h-14 hover:bg-primary/90">
            <ConstructionTool className="w-6 h-6" />
          </Button>
        </div>
      </Container>
    </motion.aside>
  )
}

export default QuickAccess
