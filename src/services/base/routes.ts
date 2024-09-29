interface IRoute {
  path: string
  get: (slug: string) => string
}
type IRoutes = Record<string, IRoute>
export const getApiRoute = () => {
  const routes = {
    auth: {
      auth: {
        path: 'auth',
        get: function (slug: string) {
          return `/${this.path}/${slug}`
        },
      },
      message: {
        path: 'auth/message',
        get: function (slug: string) {
          return `/${this.path}/${slug}`
        },
      },
    },
    user: {
      getUser: {
        path: 'user',
        get(slug: string) {
          return `/${this.path}/${slug}`
        },
      },
      register: '/user/register',
    },
  }
  return routes
}
