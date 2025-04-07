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
      updateProfile: {
        path: 'user/profile',
        get(slug: string) {
          return `/${this.path}/${slug}`
        },
      },
      currentBalance: {
        path: 'user/balance',
        get(slug: string) {
          return `/${this.path}/${slug}`
        },
      },
      withdraw: {
        path: 'user/withdraw',
      },
      userWallet: {
        path: 'user/wallet',
      },
      userTransactionHistory: {
        path: 'user/transactions',
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
        mineBlock: {
          path: 'dream-mine/mine/',
          get(id: number) {
            return `${this.path}${id}`
          },
        },
        backoffMine: {
          path: 'dream-mine/backoff/',
          get(id: number) {
            return `${this.path}${id}`
          },
        },
        history: {
          path: 'dream-mine',
        },
        myHistory: {
          path: 'dream-mine/my-history',
        },
      },
      plinko: {
        rules: {
          path: 'plinko/rules',
        },
        bet: {
          path: 'plinko/bet',
        },
        drop: {
          path: 'plinko/drop',
          get(id: number) {
            return `${this.path}/${id}`
          },
        },
        history: {
          path: 'plinko',
        },
        myHistory: {
          path: 'plinko/my-history',
        },
      },
      common: {
        list: {
          path: 'games',
        },
        mePlaying: {
          path: 'games/me-playing',
        },
      },
    },
  }
  return routes
}
