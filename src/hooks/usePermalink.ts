export const usePermalink = () => {
  const internalLinks = {
    home: {
      slug: '/',
      get: function () {
        return '/'
      },
    },
    game: {
      slug: 'game',
      get: function (slug: string) {
        return `/${this.slug}/${slug}`
      },
    },
    aboutUs: {
      slug: 'about-us',
      get: function () {
        return `/${this.slug}`
      },
    },
    contactUs: {
      slug: 'contact-us',
      get: function () {
        return `/${this.slug}`
      },
    },
    faq: {
      slug: 'faq',
      get: function () {
        return `/${this.slug}`
      },
    },
    help: {
      slug: 'help',
      get: function () {
        return `/${this.slug}`
      },
    },
    referral: {
      slug: 'referral',
      get: function () {
        return `/${this.slug}`
      },
    },
    user: {
      slug: 'user',
      get: function () {
        return `/${this.slug}`
      },
    },
    userWallet: {
      slug: 'user/wallet',
      get: function () {
        return `/${this.slug}`
      },
    },
  }

  const externalLinks = {
    telegram: {
      slug: '/',
      get: function () {
        return '/'
      },
    },
    discord: {
      slug: '/',
      get: function () {
        return '/'
      },
    },
    youtube: {
      slug: '/',
      get: function () {
        return '/'
      },
    },
    x: {
      slug: '/',
      get: function () {
        return '/'
      },
    },
    instagram: {
      slug: '/',
      get: function () {
        return '/'
      },
    },
  }

  return { internalLinks, externalLinks }
}
