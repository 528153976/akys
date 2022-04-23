const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const target = "http://192.168.11.161:19088";

module.exports = {
    publicPath: '/akys/',
    outputDir: 'akys',
    lintOnSave: false,
    devServer: {
        port: 19014,
        proxy: {

            '/api/farmhouse/': {
                target: target,
                secure: false,
                changeOrigin: true,
                // target: "http://192.168.100.155:9821",
                // target: "http://192.168.100.197:9821",
                pathRewrite: { // 发送请求时,请求路径重写；将/farmhouse/xxx  ---->/xxx (去掉api)
                    '^/api/farmhouse': '/farmhouse'
                }
            },
            '/api/': { // 文件
                secure: false,
                changeOrigin: true,
                target: target,
                pathRewrite: { // 发送请求时,请求路径重写；将/farmhouse/xxx  ---->/xxx (去掉api)
                    '^/api/': '/'
                }
            },
        }
    },
    // 设为false打包时不生成.map文件
    productionSourceMap: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [

                ]
            }
        }
    }
}