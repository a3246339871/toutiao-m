const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    open: true,
    host: 'localhost'

  },
  // 关闭eslint
  lintOnSave: false
})
