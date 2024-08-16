import List from '@/components/common/list/list'
import ListExternalLink from '@/components/common/list/listExternalLink/listExternalLink'
import ListItem from '@/components/common/list/listItem/listItem'
import ListLink from '@/components/common/list/listLink/listLink'
import DiscordIcon from '@/components/icons/discord/discord.icon'
import InstagramIcon from '@/components/icons/instagram/instagram.icon'
import TelegramIcon from '@/components/icons/telegram/telegram.icon'
import XIcon from '@/components/icons/x/x.icon'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { useState } from 'react'
import { IFooter } from './footer.types'

const Footer: BaseProps<IFooter> = (props) => {
  const { className } = props
  const [staticData] = useState({
    menu: {
      quickAccess: [
        {
          title: 'Home',
          link: '',
          id: 'wm2339474',
        },
        {
          title: 'Help',
          link: '',
          id: 'wm434545',
        },
        {
          title: 'FAQ',
          link: '',
          id: 'wm4354566',
        },
        {
          title: 'About Us',
          link: '',
          id: 'wm6245465',
        },
        {
          title: 'Contact Us',
          link: '',
          id: 'wm5346564',
        },
      ],
      socialMedia: [
        {
          id: 'wm5673536',
          title: 'Telegram',
          link: 'https://t.com/',
          Icon: TelegramIcon,
        },
        {
          id: 'wm5657333',
          title: 'Discord',
          link: 'https://discord.com/',
          Icon: DiscordIcon,
        },
        {
          id: 'wm5666463',
          title: 'X',
          link: 'https://x.com/',
          Icon: XIcon,
        },
        {
          id: 'wm5556533',
          title: 'Instagram',
          link: 'https://instagram.com/',
          Icon: InstagramIcon,
        },
      ],
    },
  })

  const classList = classNames({
    [`footer`]: true,
    [`${className}`]: className,
  })

  return (
    <footer className={classList}>
      <div className="px-4 2xl:container">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6 flex items-center">
            <List>
              {staticData.menu.quickAccess.map(({ link, title, id }) => (
                <ListItem key={`quick-access-${id}`}>
                  <ListLink href={link}>{title}</ListLink>
                </ListItem>
              ))}
            </List>
          </div>
          <div className="col-span-12 sm:col-span-6 flex items-center justify-end">
            <List className="gap-x-[0.9rem]">
              {staticData.menu.socialMedia.map(({ link, title, Icon, id }) => (
                <ListItem key={`social-media-${id}`}>
                  <ListExternalLink target="_blank" href={link} title={title} className="p-[0.625rem] text-white hover:text-cyan-300">
                    <Icon />
                  </ListExternalLink>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
