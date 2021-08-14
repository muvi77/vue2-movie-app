// plugin 가져와서 사용하기 
// import path from 'path'
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = { 
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
         '@': path.resolve(__dirname, 'src'),  // 경로 별칭 
        //  '~': path.resolve(__dirname, 'src') 
        }
    },
    // 진입점 (entry point)
    entry: './src/main.js',
    output: {
        // path와 filename은 현재 내용으로 기본설정되므로 주석 처리 
        // __dirname : node.js 에서 현재경로라는 전역변수 
        // path: path.resolve(__dirname, 'dist'),
        // filename: 'main.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.s?css$/,
                use: [
                    'vue-style-loader', //vue 파일안 style 해석
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    // 'sass-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: '@import "@/scss/main";'
                        }
                    }
                ],
            },
            {
                // .js로 끝나는 파일을 찾아서 babel 이라는 로더로 사용
                test: /\.js$/,
                use: 'babel-loader',
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            template: './index.html',
        }),
        // 정적 정보를 dist안에 넣어서 같이 배포하게 해준다 
        new CopyPlugin({
            patterns: [
                { from: 'static'}
            ]
        }),
        new VueLoaderPlugin(),
    ], 
    devServer: {
        port: 8079
    }
}