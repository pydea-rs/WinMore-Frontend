import { useSelector } from '@/store/store'
import { BaseProps, INetwork } from '@/types/global.types'
import { Avatar } from '../avatar/avatar'
import { AvatarSizes } from '../avatar/avatar.types'

export const reshapeNetworksList = (networks: INetwork[]) => {
  const result: Record<string, INetwork> = {}
  for (const network of networks) {
    result[network.chainId] = network
  }
  return result
}

const MatchedChainIcon: BaseProps<{ children: number; className?: string; size?: AvatarSizes }> = (props) => {
  const { children, className, size = 'sm' } = props
  const { networks } = useSelector((state) => state.networks)

  const networksShortcut = reshapeNetworksList(networks)
  return networksShortcut?.[children] && <Avatar size={size} src={networksShortcut[children].icon} alt={networksShortcut[children].name} className={className || '-mt-1'} />
}

export default MatchedChainIcon
