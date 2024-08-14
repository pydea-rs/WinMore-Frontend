import { WalletModal } from '@/components/common/walletModal/walletModal'
import { useState } from 'react'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between `}>
      <button onClick={() => setModalOpen(true)}>Connect Wallet</button>
      <WalletModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}
