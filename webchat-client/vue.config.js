var path = require('path')
module.exports = {
  // 废弃baseUrl  一般运维会配置好的。项目访问的路径
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  //打包输出目录
  outputDir:"dist",
  //保存是否校验
  lintOnSave:true,
  //静态资源打包路径
  assetsDir: "static",
  //默认false，可以快速打包
  productionSourceMap: false,
  //打包后的启动文件
  indexPath: "index.html",
  //打包文件是否使用hash
  filenameHashing:true,
  runtimeCompiler: false,




  devServer: {
      port: 8888,
      open: true,
      proxy: {
          '/socket.io': {
            target: 'http://106.54.86.220:3004',
            ws: true,
            changeOrigin: true,
          },
          '/img': {
            target: 'http://106.54.86.220:3004',
            changeOrigin: true,
          }
        }
      }
};