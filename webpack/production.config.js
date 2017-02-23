var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var autoprefixer = require('autoprefixer')

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'assets/[hash]/bundle.js',
    publicPath: '/', // may need to add bucket.aws.amazon.com...
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
      { test: /\.jpg$/, loader: "file-loader" },
      {
        test: /\.html$/,
        exclude: /index\.html$/, // need to exclude your base template (unless you do not want this plugin own templating feature)
        loader: "html"
      }
    ]
  },
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dashboard',
      filename: 'index.html',
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      __CLOUD_SERVER__: ({
        master: '"https://jsonplaceholder.typicode.com"',//enter the api url here
        production: '"https://jsonplaceholder.typicode.com"',//enter the api url here
      }[process.env.CI_BRANCH || 'production']),
      __VERSION__:  JSON.stringify(process.env.CI_COMMIT_ID),
      __NODE_ENV__: JSON.stringify(process.env.CI_BRANCH || 'production'),
      __DEVELOPMENT__: false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ]
}
