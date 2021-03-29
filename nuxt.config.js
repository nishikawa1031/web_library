import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: 'web_library',
    title: 'web_library',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    [
      'nuxt-i18n',
      {
        strategy: 'prefix_and_default',
        // 切り替える言語を定義
        locales: [
          { code: 'ja', iso: 'ja_JP', file: 'ja.json' ,name: '日本語'},
          { code: 'en', iso: 'en-US', file: 'en.json' ,name: 'English'},
        ],
        // デフォルトの言語を↑で定義したcodeで記載
        defaultLocale: 'ja',
        vueI18n: {
          // ファイルが読めなかった場合の言語を定義
          fallbackLocale: 'en',
        },
        vueI18nLoader: true,
        lazy: true,
        // 言語ファイル(.json)のディレクトリを記載
        langDir: 'locales/',
      },
    ],
    'nuxt-basic-auth-module',
  ],
  basic: {
    name: 'lawsei',
    pass: 'ganbare',
    // enabled: process.env.ENABLE_BASIC_AUTH === 'true'
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  server: {
  　　port: 3335
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  generate: {
    dir: 'public'
  }
}
