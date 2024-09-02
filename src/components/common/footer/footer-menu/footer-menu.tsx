import List from '@/components/common/list/list'
import ListExternalLink from '@/components/common/list/listExternalLink/listExternalLink'
import ListItem from '@/components/common/list/listItem/listItem'
import ListLink from '@/components/common/list/listLink/listLink'
import DiscordIcon from '@/components/icons/discord/discord'
import InstagramIcon from '@/components/icons/instagram/instagram'
import TelegramIcon from '@/components/icons/telegram/telegram'
import XIcon from '@/components/icons/x/x.icon'
import { usePermalink } from '@/hooks/usePermalink'
import { BaseProps } from '@/types/global.types'
import classNames from 'classnames'
import { useState } from 'react'
import Container from '../../container/container'
import { IFooterMenu } from './footer-menu.types'

const FooterMenu: BaseProps<IFooterMenu> = (props) => {
  const { className } = props
  const { internalLinks, externalLinks } = usePermalink()
  const [staticData] = useState({
    menu: {
      quickAccess: [
        {
          title: 'Home',
          link: internalLinks.home.get(),
          id: 'wm2339474',
        },
        {
          title: 'Help',
          link: internalLinks.help.get(),
          id: 'wm434545',
        },
        {
          title: 'FAQ',
          link: internalLinks.faq.get(),
          id: 'wm4354566',
        },
        {
          title: 'About Us',
          link: internalLinks.aboutUs.get(),
          id: 'wm6245465',
        },
        {
          title: 'Contact Us',
          link: internalLinks.contactUs.get(),
          id: 'wm5346564',
        },
      ],
      socialMedia: [
        {
          id: 'wm5673536',
          title: 'Telegram',
          link: externalLinks.telegram.get(),
          Icon: TelegramIcon,
        },
        {
          id: 'wm5657333',
          title: 'Discord',
          link: externalLinks.discord.get(),
          Icon: DiscordIcon,
        },
        {
          id: 'wm5666463',
          title: 'X',
          link: externalLinks.x.get(),
          Icon: XIcon,
        },
        {
          id: 'wm5556533',
          title: 'Instagram',
          link: externalLinks.instagram.get(),
          Icon: InstagramIcon,
        },
      ],
    },
  })

  const classList = classNames({
    [`footer-menu`]: true,
    [`${className}`]: className,
  })

  return (
    <div className={classList}>
      <Container kind="fluid">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6 flex items-center">
            <List>
              {staticData.menu.quickAccess.map(({ link, title, id }) => (
                <ListItem key={`quick-access-${id}`}>
                  <ListLink href={link} className="text-white transition">
                    {title}
                  </ListLink>
                </ListItem>
              ))}
            </List>
          </div>
          <div className="col-span-12 sm:col-span-6 flex items-center justify-end">
            <List className="gap-x-[0.9rem]">
              {staticData.menu.socialMedia.map(({ link, title, Icon, id }) => (
                <ListItem key={`social-media-${id}`}>
                  <ListExternalLink target="_blank" href={link} title={title} className="p-[0.625rem] text-white transition">
                    <Icon />
                  </ListExternalLink>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default FooterMenu
