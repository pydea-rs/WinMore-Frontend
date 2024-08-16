export const useGetApiRoutes = (slug?: string) => {
  const routes = {
    auth: {
      nonce: '/auth/nonce',
    },
  }
  return routes
}
