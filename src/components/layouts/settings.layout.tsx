import { closeNavbar } from '@/store/slices/navbar/navbar.slice'
import { hideQuickAccess, showQuickAccess } from '@/store/slices/quickAccess/quickAccess.slice'
import { useDispatch, useSelector } from '@/store/store'
import { BaseProps } from '@/types/global.types'
import { Router } from 'next/router'
import { useEffect } from 'react'

const SettingsLayout: BaseProps = (props) => {
  const { children } = props
  const { navbar } = useSelector((state) => state.navbar)
  const { quickAccess } = useSelector((state) => state.quickAccess)
  const dispatch = useDispatch()

  const handleCloseNavbar = () => {
    console.log('before ', navbar.open)
    if (navbar.open) {
      console.log('handleCloseNavbar')
      dispatch(closeNavbar())
    }
  }

  const closeNavbarOnViewport = () => {
    if (window.innerWidth > 720) {
      handleCloseNavbar()
    }
  }

  const handledQuickAccessState = () => {
    if (window.innerWidth > 1300) {
      if (!quickAccess) showQuickAccess()
    } else {
      if (quickAccess) hideQuickAccess()
    }
  }

  useEffect(() => {
    // initial
    handledQuickAccessState()

    window.addEventListener('resize', () => {
      closeNavbarOnViewport()
      handledQuickAccessState()
    })
    return window.removeEventListener('resize', () => {
      closeNavbarOnViewport()
      handledQuickAccessState()
    })
  }, [navbar.open])

  useEffect(() => {
    const closeNavbarAfterNavigate = () => {
      handleCloseNavbar()
    }
    Router.events.on('routeChangeComplete', closeNavbarAfterNavigate)

    return () => {
      Router.events.off('routeChangeComplete', closeNavbarAfterNavigate)
    }
  }, [navbar.open])

  return <>{children}</>
}

export default SettingsLayout
