import { useDispatch, useSelector } from '@/store/store'
import { BaseProps } from '@/types/global.types'

const AuthProvider: BaseProps = (props) => {
  const { children } = props
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  if (!user) {
    // dispatch(triggerModal({ modal: 'login', trigger: true }))
    // Actions That needs to be done if user was not authenticated
  }
  return <>{children}</>
}

export default AuthProvider
