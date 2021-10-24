export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '奇思实验室 - 记录生活, 分享观点 | 周文恺的个人网站' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'keywords', content: `周文恺,个人网站,奇思实验室,KysLab,个人网页,个人站点,个人博客,个人主页,个人网站外包,个人博客外包,企业网站外包`}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/',
        redirect: '/home'
      })
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    {src: "~/assets/styles/index.scss", lang: "scss"}
  ],

  styleResources: {
    scss: [
      '@/assets/styles/variable.scss'
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  axios: {
    proxy: true,
    credential: true
  },

  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },

  loading: false
}
