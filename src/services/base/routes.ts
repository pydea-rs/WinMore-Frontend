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
      register: {
        path: 'user/register',
        get(slug: string) {
          return `/${this.path}/${slug}`
        },
      },
    },
    games: {
      mine: {
        rules: {
          path: 'dream-mine/rules',
        },
        bet: {
          path: 'dream-mine/bet',
        },
      },
    },
  }
  return routes
}
