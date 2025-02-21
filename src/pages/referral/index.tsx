import ComingSoonPage from '@/components/pages/common/ComingSoonPage'
import LoginRequiredPage from '@/components/pages/common/MustLoginFirst'
import { useAuth } from '@/hooks/useAuth'
import { useDispatch } from '@/store/store'

const Referral = () => {
  const dispatch = useDispatch()

  const { isAuthorized, token } = useAuth()

  if (!isAuthorized || !token?.length) {
    return <LoginRequiredPage />
  }

  return (
    <div>
      <ComingSoonPage />
    </div>
  )
}

export default Referral
