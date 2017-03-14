import webpack from 'webpack'
const commonConfig = {
  entry: './src/index.js',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
      {
        test: /\.html$/,
        loader: 'html',
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    output: {
      comments: false,
    }
  })
  ]
}
const browser = Object.assign({}, commonConfig, {
  output: {
    filename: 'dist.js',
    path: 'lib',
    libraryTarget: 'var',
    library: 'CSSOptimumSelector'
  },
  target: 'web',
})
const nodeModule = Object.assign({}, commonConfig, {
  output: {
    filename: 'index.js',
    path: 'lib',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
})
const config = [browser, nodeModule]

module.exports = config;
