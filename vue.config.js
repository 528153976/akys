// const target = "http://39.101.187.212:8090";
const target = "http://101.200.209.98:8090";

module.exports = {
    // publicPath: '/akys/',
    outputDir: 'akys',
    lintOnSave: false,
    devServer: {
        port: 19014,
        proxy: {
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