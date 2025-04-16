import { useRouter } from 'next/router'

export const useRouterTools = () => {
  const router = useRouter()

  const isAtHome = () => !router.pathname?.replaceAll('/', '')?.length

  const isAtPath = (path: string) => router.pathname === path

  const isAtSubPath = (path: string, { exact = false, ignoreParams = true }: { exact?: boolean; ignoreParams?: boolean } = {}) =>
    !exact
      ? router.pathname.includes(path)
      : (ignoreParams ? router.pathname : router.asPath)
          ?.split('/')
          .filter((x) => x?.length)
          .pop() === path

  return {
    isAtHome,
    isAtPath,
    isAtSubPath,
  }
}

export const getDomain = () => {
  // let domain = window.location.hostname
  // domain = domain.split('.').slice(-2).join('.')
  // domain = '.' + domain
  const domain = process.env.NEXT_PUBLIC_DOMAIN || ''
  return domain
}

export const getHostName = () => {
  let hostname = window.location.hostname
  hostname = hostname.split('.').slice(-2).join('.')
  return hostname
}
