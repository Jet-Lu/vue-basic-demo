const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // prependData:` @import "@/styles/common.scss"; `
      }
    }
  },
  publicPath: './', // 基本路径
  outputDir: "dist", // 输出文件目录
  lintOnSave: false, // eslint 是否在保存时检查
  assetsDir: 'static', // 配置js、css静态资源二级目录的位置 
  productionSourceMap: false,  // 生产环境是否生成 sourceMap 文件
  configureWebpack: config => {
    if (isProd) {
      // 配置webpack 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          // 超过4kb压缩
          threshold: 4096
        })
      )
    }
  },
    devServer: {
      // 设置代理
      proxy: {
        '/coral-isc-server': { // '/api':匹配项
        // target: 'http://192.168.12.117:9010',
          target: 'http://39.99.167.215:9200',
          // target: 'http://192.168.12.139:8080', //设置你调用的接口域名和端口号 别忘了加http
          changeOrigin: true, //是否允许跨域
          pathRewrite: {
              '^/coral-isc-server': '/coral-isc-server' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://127.0.y0.1:3000/user/add'，直接写‘/api/user/add’即可
          }
        },
      },
      port: 8080,
    }
  };