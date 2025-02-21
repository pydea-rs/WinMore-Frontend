import DiscordIcon from '@/components/icons/discord/discord'
import InstagramIcon from '@/components/icons/instagram/instagram'
import TelegramIcon from '@/components/icons/telegram/telegram'
import XIcon from '@/components/icons/x/x.icon'
import { ElementProps } from '@/types/elements.types'
import { BaseProps } from '@/types/global.types'

export type SocialMediaItemType = {
  title: string
  slug: string
  url: string | null
  Icon: BaseProps<ElementProps>
}

const parentRoutes = {
  game: {
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
  game: {
    ...parentRoutes.game,
    mine: {
      slug: 'mine',
      parent: parentRoutes.game,
      get path() {
        return `${this.parent?.path || ''}/${this.slug}`
      },
    },
    plinko: {
      slug: 'plinko',
      parent: parentRoutes.game,
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

export const socialMediaLinks: Record<string, SocialMediaItemType> = {
  telegram: {
    slug: 'telegram',
    title: 'Telegram',
    url: null,
    Icon: TelegramIcon,
  },
  x: {
    slug: 'x-twitter',
    title: 'X',
    url: 'https://x.com/winmore_xyz',
    Icon: XIcon,
  },
  discord: {
    slug: 'discord',
    title: 'Discord',
    url: 'https://discord.gg/MA98WqRjbd',
    Icon: DiscordIcon,
  },
  instagram: {
    slug: 'instagram',
    title: 'Instagram',
    url: null,
    Icon: InstagramIcon,
  },
}
