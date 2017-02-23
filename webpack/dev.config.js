// TODO: look into https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

module.exports = {
  devtool: 'eval',
  entry: [
    //'webpack-dev-server/client?http://localhost:3000',
    //'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/',
    pathinfo: true, // do not use in production
    devtoolModuleFilenameTemplate: 'file://[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: 'file://[absolute-resource-path]?[hash]'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel'],
        include: [
          path.join(__dirname, '..', 'src'),
          path.join(__dirname, '..', 'node_modules', 'qs')
        ]
      },
      { test: /\.css$/, loader: "style-loader!css-loader?modules&localIdentName=[path][name]-[local]-[hash:base64:5]!postcss-loader" },
      { test: /\.png$/, loader: "url-loader?limit=20000" },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLOUD_SERVER__: '"https://jsonplaceholder.typicode.com"',//enter your development api path here
      __VERSION__: JSON.stringify('development'),
      __NODE_ENV__: JSON.stringify('development'),
      __DEVELOPMENT__: true
    })
  ]
}
