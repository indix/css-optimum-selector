const config = {
  entry: './example/src/index.js',
  output: {
    filename: 'index.js',
    path: './example/build'
  },
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
  }
}

module.exports = config
