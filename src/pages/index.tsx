import MainLayout from '@/components/layouts/main.layout'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch } from '@/store/store'
import { ReactElement } from 'react'

export default function Home() {
  const dispatch = useDispatch()
  return (
    <div className={``}>
      <button onClick={() => dispatch(triggerModal({ modal: 'login', trigger: true }))}>Connect Wallet</button>
    </div>
  )
}

Home.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>
