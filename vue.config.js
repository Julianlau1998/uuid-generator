module.exports = {
    pwa: {
      name: 'UUID Generator',
      themeColor: '#ffffff',
      msTileColor: '#ffffff',
      backgroundColor: '#ffffff',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'default',
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        swSrc: 'src/service-worker.js'
      }
    },

  }
  