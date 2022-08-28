const path = require('path')

// 配置 svg-sprite-loader 和 plugin 插件
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    // 获取 icons 所在目录 => dir
    const dir = path.resolve(__dirname, 'src/assets/icons')

    // 配置 svg-sprite-loader
    // Vue 把 webpack 的API封装并以 config 向外暴露给我们使用
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)     // 匹配 .svg文件
      .include.add(dir).end() // 只在 icons 目录里匹配.svg
      .use('svg-sprite-loader').loader('svg-sprite-loader')
      .options({extract: false}).end()    // 不解析出文件

    // 配置 plugin 插件
    config.plugin('svg-sprite')
      .use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    // 其他 svg loader 排除 icons 目录，不再走这个目录
    config.module.rule('svg').exclude.add(dir)

  }
}

