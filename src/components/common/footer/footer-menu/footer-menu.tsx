import List from '@/components/common/list/list'
import ListExternalLink from '@/components/common/list/listExternalLink/listExternalLink'
import ListItem from '@/components/common/list/listItem/listItem'
import ListLink from '@/components/common/list/listLink/listLink'
import { usePermalink } from '@/hooks/usePermalink'
import { BaseProps } from '@/types/global.types'
import { isDevelopmentMode } from '@/utils/dev'
import { useRouterTools } from '@/utils/router'
import classNames from 'classnames'
import { useState } from 'react'
import Container from '../../container/container'
import { IFooterMenu } from './footer-menu.types'

const FooterMenu: BaseProps<IFooterMenu> = (props) => {
  const { className } = props
  const { internalLinks, socialMediaLinks } = usePermalink()
  const { isAtHome } = useRouterTools()

  const [staticData] = useState({
    menu: {
      quickAccess: [
        ...(!isAtHome()
          ? [
              {
                link: internalLinks.home.path,
                title: 'Home',
                disabled: false,
              },
            ]
          : []),
        ...(isDevelopmentMode()
          ? [
              {
                title: 'Docs',
                link: internalLinks.docs.path,
                id: 'wm434546',
              },
              {
                title: 'Help',
                link: internalLinks.help.path,
                id: 'wm434545',
              },
              {
                title: 'FAQ',
                link: internalLinks.faq.path,
                id: 'wm4354566',
              },
              {
                title: 'About Us',
                link: internalLinks.aboutUs.path,
                id: 'wm6245465',
              },
              {
                title: 'Contact Us',
                link: internalLinks.contactUs.path,
                id: 'wm5346564',
              },
            ]
          : []),
      ],
      socialMedia: Object.values(socialMediaLinks)
        .filter(({ url }) => url)
        .map(({ title, url, Icon }, idx) => ({
          id: `wm55${idx + 4}6533`,
          title,
          link: url || '',
          Icon,
        })),
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
          <div id={internalLinks.contactUs.alternative} className="col-span-12 sm:col-span-6 flex items-center justify-end">
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
