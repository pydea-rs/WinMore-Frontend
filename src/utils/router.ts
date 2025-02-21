import { useRouter } from 'next/router'

export const useRouterTools = () => {
  const router = useRouter()

  const isAtHome = () => !router.pathname?.replaceAll('/', '')?.length

  const isAtPath = (path: string) => router.pathname === path

  const isAtSubPath = (path: string) => router.pathname.includes(path)

  return {
    isAtHome,
    isAtPath,
    isAtSubPath,
  }
}
