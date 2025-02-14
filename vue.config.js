const { defineConfig } = require('@vue/cli-service')
const shell = require('shelljs')
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

const envFile = process.env.PROJECT_ENV === 'production' ? 'production' : 'develop'
console.log(envFile)
shell.cp('-R', `./src/config/${envFile}.env.js`, './src/config/env.js')
const resolve = dir => path.join(__dirname, dir)
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'docker/dist',
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/audioapi/dev/agent/speak': {
        target: 'http://121.43.189.187:8080/dev/agent/speak',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.module.rules.delete('svg')
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/icons')) // 仅处理 src/icons 目录下的 svg
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]' // 设置 symbolId，方便通过 ID 使用
      })
      .end()
      .before('svg-sprite-loader')
      .use('svgo-loader')
      .loader('svgo-loader')
      .end()
    config.when(process.env.PROJECT_ENV === 'production', config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          vantUI: {
            name: 'chunk-vantUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
          },
          asyncLibs: {
            test: /[\\/]node_modules[\\/]/,
            minChunks: 2, // 最小公用次数
            chunks: 'async',
            priority: 20,
            enforce: true,
            name: 'vendors-asynclibs'
          },
          coreJs: {
            test: /[\\/]node_modules[\\/]core-js[\\/]/,
            name: 'vendors-corejs',
            chunks: 'all',
            priority: 36,
            enforce: true
          },
          nprogress: {
            test: /[\\/]node_modules[\\/]nprogress[\\/]/,
            name: 'vendors-nprogress',
            chunks: 'all',
            priority: 36,
            enforce: true
          },
          vueLibs: {
            test: /[\\/]node_modules[\\/](vue|vuex|vue-router|vue-i18n)/,
            name: 'vendors-vueLibs',
            chunks: 'all',
            priority: 36,
            enforce: true
          },
          axiosLibs: {
            name: 'vendors-axiosLibs',
            chunks: 'all',
            priority: 39,
            enforce: true,
            test: /[\\/]node_modules[\\/](axios|qs)/
          },
          lodash: {
            name: 'vendors-lodash',
            chunks: 'all',
            priority: 20,
            enforce: true,
            test: /[\\/]node_modules[\\/]lodash[\\/]/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          },
          styles: {
            name: 'app',
            chunks: 'initial',
            test: /\.css$/,
            enforce: true
          },
          manifest: {
            name: 'manifest',
            minChunks: Infinity
          }
        }
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })
  },
  configureWebpack: {
    devServer: {
      port: 8100,
      hot: true,
      open: true,
      host: 'localhost'
    },
    plugins: [
      // 压缩混淆js代码插件
      new TerserJSPlugin({
        parallel: true,
        terserOptions: {
          // ie8: false,
          // ecma: 8,
          mangle: {
            // screw_ie8: true,
            keep_fnames: true
          },
          output: {
            comments: false,
            beautify: false
            // safari10: true,
          },
          compress: {
            drop_debugger: true,
            drop_console: true
          }
        }
      }),
      new CompressionWebpackPlugin({
        test: /\.(js|css|svg|woff|ttf|json|html)$/,
        threshold: 10000
      })
    ]
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: []
      },
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            green: '#FF8151',
            'checkbox-checked-icon-color': '#FF8151',
            'radio-checked-icon-color': '#FF8151',
            'button-default-color': '#646565',
            'tag-primary-color': '#FF8151',
            'button-default-background-color': '#F3F3F3'
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            // hack: 'true; @import "your-less-file-path.less";'
          }
        }
      }
    }
  },
  pluginOptions: {
    // 'cube-ui': {
    //   postCompile: false,
    //   theme: false
    // }
  },
  pwa: {
    name: 'config audio',
    themeColor: '#FF8151',
    backgroundColor: '#fff',
    manifestOptions: {
      orientation: 'portrait-primary',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#FF8151',
      description: 'config audio',
      display: 'minimal-ui'
    },
    workboxOptions: {
      exclude: [/index\.html$/, /manifest\.json$/, /externalSettings\.js$/],
      clientsClaim: true, // 快速启用服务
      skipWaiting: true,
      runtimeCaching: []
    }
  }
})
