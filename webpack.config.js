const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = {
  // devtool: 'inline-source-map',
  entry: {
    // content-scripts
    'content-scripts/zoom/zoom.js': './app/content-scripts/zoom/zoom.js',
    'content-scripts/checkReply/insertCheckBtn.js': './app/content-scripts/checkReply/insertCheckBtn.js',
    'content-scripts/checkReply/jump.js': './app/content-scripts/checkReply/jump.js',
    'content-scripts/uploadImg/uploadImg.js': './app/content-scripts/uploadImg/uploadImg.js',
    'content-scripts/signin/signin.js': './app/content-scripts/signin/signin.js',
    'content-scripts/checkConversation/checkConversation.js': './app/content-scripts/checkConversation/checkConversation.js',

    // background-scripts
    'background-scripts/background.js': './app/background-scripts/background.js',
    
    // popup
    'popup/popup.js': './app/popup/popup.js',

    // option
    'option/option.js': './app/option/option.js',
  },
  output: {
    filename: './extension/[name]'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        // test: require.resolve('jquery'),
        // use: [{
        //   loader: 'expose-loader',
        //   options: 'jQuery'
        // },{
        //   loader: 'expose-loader',
        //   options: '$'
        // }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),
    new UglifyJSPlugin(),
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./manifest.json'),
    }),
  ],
  externals: {
    // jquery 这个库就不用打包了
    // 要用的时候指向 `$`，不要忘记需要引入 cdn，让全局知道有这个变量
    // 局限性，并不是所有依赖都有生产环境的文件
    "jquery": '$',
    // 方式一：申明为外部依赖并指定别名
    // 公共文件，打包的时候不打入包内
    // "jquery": "jquery",
    // "react-dom": "ReactDOM"
    // // 方式二：true 为外部依赖，false 则不是
    // a: false,   // a is not external
    // b: true     // b is external
    // "jquery": "jquery"
  }
};