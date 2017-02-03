import webpack from 'webpack'

const config = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: 'lib',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
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

module.exports = config
