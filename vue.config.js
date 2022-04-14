const TerserPlugin = require('terser-webpack-plugin');
const config = require('./src/config')


let BASE_URL = ''
switch (process.env.NODE_ENV) {
    case 'development':
        BASE_URL = config.publicPath.dev //这里是本地的请求url
        break
    case 'production':
        BASE_URL = config.publicPath.pro //生产环境url
        break
}

module.exports = {
    publicPath: BASE_URL,
    devServer: {
        port: 8000, // 端口
    },
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    // 打包时不生成.map文件
    productionSourceMap: false,
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    },
}