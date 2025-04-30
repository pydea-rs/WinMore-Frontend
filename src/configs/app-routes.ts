import DiscordIcon from '@/components/icons/discord'
import InstagramIcon from '@/components/icons/instagram'
import TelegramIcon from '@/components/icons/telegram'
import XIcon from '@/components/icons/x/x.icon'
import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'

export type SocialMediaItemType = {
  title: string
  slug: string
  url: string
  Icon: BaseProps<ElementProps>
}

const parentRoutes = {
  games: {
    slug: 'games',
    get path() {
      return `/${this.slug}`
    },
  },
  user: {
    slug: 'user',
    get path() {
      return `/${this.slug}`
    },
  },
}

export const internalLinks = {
  home: {
    slug: '/',
    get path() {
      return '/'
    },
  },
  blogs: {
    slug: 'blogs',
    get path() {
      return 'blogs'
    },
  },
  games: {
    ...parentRoutes.games,
    mine: {
      slug: 'mine',
      parent: parentRoutes.games,
      get path() {
        return `${this.parent?.path || ''}/${this.slug}`
      },
    },
    plinko: {
      slug: 'plinko',
      parent: parentRoutes.games,
      get path() {
        return `${this.parent?.path || ''}/${this.slug}`
      },
    },
  },
  aboutUs: {
    slug: 'about-us',
    get path() {
      return `/${this.slug}`
    },
  },
  contactUs: {
    slug: 'contact-us',
    alternative: 'footer-social-media',
    get path() {
      return `/${this.slug}`
    },
  },
  faq: {
    slug: 'faq',
    get path() {
      return `/${this.slug}`
    },
  },
  help: {
    slug: 'help',
    get path() {
      return `/${this.slug}`
    },
  },
  docs: {
    slug: 'docs',
    get path() {
      return `/${this.slug}`
    },
  },
  referral: {
    slug: 'referral',
    get path() {
      return `/${this.slug}`
    },
  },
  user: {
    ...parentRoutes.user,
    wallet: {
      slug: 'wallet',
      parent: parentRoutes.user,
      get path() {
        return `${this.parent?.path || ''}/${this.slug}`
      },
    },
    messages: {
      slug: 'messages',
      parent: parentRoutes.user,
      get path() {
        return `${this.parent?.path || ''}/${this.slug}`
      },
    },
  },
}

export const socialMediaLinks: SocialMediaItemType[] = [
  {
    slug: 'x-twitter',
    title: 'X',
    url: 'https://x.com/winmore_xyz',
    Icon: XIcon,
  },
  {
    slug: 'discord',
    title: 'Discord',
    url: 'https://discord.gg/MA98WqRjbd',
    Icon: DiscordIcon,
  },
]

export const allSocialMediaLinks: SocialMediaItemType[] = [
  ...socialMediaLinks,
  {
    slug: 'telegram',
    title: 'Telegram',
    url: '',
    Icon: TelegramIcon,
  },
  {
    slug: 'instagram',
    title: 'Instagram',
    url: '',
    Icon: InstagramIcon,
  },
]
