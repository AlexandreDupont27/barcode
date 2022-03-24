export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'barcode', // TO DO
    htmlAttrs: {
      lang: 'fr', // TO DO
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1', id: 'viewport-meta' },
      { hid: 'description', name: 'description', content: '' }, // TO DO
      { hid: 'og:image', property: 'og:image', content: '/images/og-image.png' }, // TO DO
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }], // TO DO
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.scss', '~/assets/css/mediaQueries.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxt/image', // https://image.nuxtjs.org/
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    [
      'nuxt-i18n',
      {
        lazy: true,
        // baseUrl: '[url du site web]',  // TO DO
        seo: true,
        loadLanguagesAsync: true,
        locales: [
          {
            name: 'Français',
            code: 'fr-ca',
            iso: 'fr-ca',
            file: 'fr-ca.js',
          },
          {
            name: 'Anglais',
            code: 'en-ca',
            iso: 'en-ca',
            file: 'en-ca.js',
          },
        ],
        langDir: 'locales/',
        defaultLocale: 'fr-ca',
        fallbackLocale: 'fr-ca',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          redirectOn: 'root',
        },
      },
    ],
    // '@nuxtjs/sitemap', // Laisser le sitemap à la fin des modules <-- activer lorsqu'on à des pages de créé
  ],

  // sitemap: { // <-- activer lorsqu'on à des pages de créé
  //   hostname: '[url du site]', // TO DO
  //   exclude: [],
  //   gzip: true,
  //   routes: [],
  // },
  router: {
    base: '/barcode/'
  },

  styleResources: {
    scss: ['~/assets/css/global/*.scss'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    fallback: '404.html',
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => ['script', 'style', 'font'].includes(type),
    },
  },
}
