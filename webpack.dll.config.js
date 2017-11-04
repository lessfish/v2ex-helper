const webpack = require('webpack');

const vendors = [
  'jquery'
];

module.exports = {
  output: {
    filename: './extension/vendor/[name].js',
    library: '[name]',
  },
  entry: {
    "vendor": vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]',
      context: __dirname,
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
};