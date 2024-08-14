import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch } from '@/store/store'

export default function Home() {
  const dispatch = useDispatch()
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between `}>
      <button onClick={() => dispatch(triggerModal({ modal: 'login', trigger: true }))}>Connect Wallet</button>
    </main>
  )
}
