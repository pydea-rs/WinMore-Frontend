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
