import { Avatar } from '@/components/common/avatar/avatar'
import Modal from '@/components/common/modal/modal'
import { setUserTimezone } from '@/store/slices/configs/configs.slice'
import { useDispatch, useSelector } from '@/store/store'
import { copyToClipboard } from '@/utils/strings'
import { Button } from '@headlessui/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useState } from 'react'
import { BsWallet2 } from 'react-icons/bs'
import { FaUserFriends } from 'react-icons/fa'
import { FiCopy } from 'react-icons/fi'
import { MdOutlineAccessTime } from 'react-icons/md'
import LoginRequiredPage from '../common/LoginRequiredPage'
import { EditProfileData } from './edit/editProfileData'

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth)
  const { configs } = useSelector((state) => state.configs)
  const { connectorName } = useSelector((state) => state.currency)

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const dispatch = useDispatch()

  const handleChangeTimezone = () => {
    dispatch(setUserTimezone(configs.timezone.toLowerCase() === 'utc' ? deviceTimezone : 'UTC'))
  }

  return user ? (
    <div className="p-4 sm:py-6 lg:py-10 bg-dark-900 rounded-2xl shadow-lg space-y-6">
      {/* Profile Header */}
      <div className="profile-avatar-background relative bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 rounded-xl p-6 flex items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="/assets/images/profile/user-1.jpg" // Replace with the actual avatar source
            alt="User Avatar"
            width={64}
            height={64}
            className="rounded-full border-2 border-white mb-2"
          />
        </div>

        <div className="text-center">
          <h3 className="text-white text-xl font-bold">{user.name}</h3>
          <p className="text-gray-200">{user.email}</p>
          <Avatar className="mx-auto mt-2" size="sm" src={`/assets/images/wallets/${connectorName}.svg`} alt={connectorName || 'Unknown Wallet Connector'} />
        </div>

        <PencilSquareIcon className="absolute top-4 right-4 text-white h-6 w-6 cursor-pointer" onClick={() => setIsEditProfileOpen(true)} />
      </div>

      <div className="flex items-center justify-between bg-dark-800 pt-4 rounded-xl">
        <div className="flex items-center space-x-4 profile-wallet-section">
          <BsWallet2 color="white" className="text-green-400 text-2xl profile-large-icons" />
          <div>
            <h4 className="text-white font-bold">Wallet</h4>
            <p className="text-gray-400 text-xs">{user.wallet}</p>
          </div>
        </div>
        {Boolean(user.wallet?.length) && <FiCopy onClick={() => copyToClipboard(user.wallet)} className="wallet-address-copy-icon text-gray-400 cursor-pointer" />}
      </div>

      <div className="flex items-center justify-between bg-dark-800 rounded-xl">
        <div className="flex items-center space-x-4 profile-wallet-section">
          <FaUserFriends color="white" className="text-green-400 text-2xl profile-large-icons" />
          <div>
            <h4 className="text-white font-bold">Referral Code</h4>
            <p className="text-gray-400 text-xs">{user.profile?.referralCode}</p>
          </div>
        </div>
        {Boolean(user.profile?.referralCode?.length) && (
          <FiCopy onClick={() => copyToClipboard(user.profile.referralCode)} className="wallet-address-copy-icon text-gray-400 cursor-pointer" />
        )}
      </div>

      <div className="flex items-center justify-between bg-dark-800 rounded-xl">
        <div className="flex items-center space-x-4 profile-timezone-section">
          <MdOutlineAccessTime color="white" className="text-blue-400 text-2xl profile-large-icons" />
          <div>
            <h4 className="text-white font-bold">Time Zone</h4>
            <p className="text-gray-400 text-sm">Current Time Zone: {configs.timezone}</p>
          </div>
        </div>
        {deviceTimezone !== 'UTC' && (
          <Button onClick={handleChangeTimezone} className="text-green-400 text-sm font-medium profile-timezone-change">
            Change to {configs.timezone === deviceTimezone ? 'UTC' : deviceTimezone}
          </Button>
        )}
      </div>
      <Modal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)}>
        <EditProfileData onClose={() => setIsEditProfileOpen(false)} />
      </Modal>
    </div>
  ) : (
    <LoginRequiredPage />
  )
}

export default UserProfile
