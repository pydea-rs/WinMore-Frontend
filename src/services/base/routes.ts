export const useGetApiRoutes = (slug?: string) => {
  const routes = {
    auth: {
      nonce: '/auth/nonce',
      getUser: '/auth/getUser',
    },
  }
  return routes
}
