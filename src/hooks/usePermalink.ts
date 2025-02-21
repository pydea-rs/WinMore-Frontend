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

export const usePermalink = () => {
  const internalLinks = {
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
      slug: 'games',
      get path() {
        return `/${this.slug}`
      },
      mine: {
        slug: 'mine',
        parent: {} as Record<string, any>,
        get path() {
          return `${this.parent?.path || ''}/${this.slug}`
        },
      },
      plinko: {
        slug: 'plinko',
        parent: {} as Record<string, any>,
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
      slug: 'user',
      get path() {
        return `/${this.slug}`
      },
      wallet: {
        slug: 'wallet',
        parent: {} as Record<string, any>,
        get path() {
          return `${this.parent?.path || ''}/${this.slug}`
        },
      },
      messages: {
        slug: 'messages',
        parent: {} as Record<string, any>,
        get path() {
          return `${this.parent?.path || ''}/${this.slug}`
        },
      },
    },
  }
  internalLinks.user.wallet.parent = internalLinks.user.messages.parent = internalLinks.user
  internalLinks.game.mine.parent = internalLinks.game.plinko.parent = internalLinks.game

  const socialMediaLinks: Record<string, SocialMediaItemType> = {
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

  return { internalLinks, socialMediaLinks }
}
