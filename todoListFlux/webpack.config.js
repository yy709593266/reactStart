let webpack = require('webpack')

let config = {
  mode: 'production',
  performance: {
    hints: false
  },
  entry: __dirname + '/src/App.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react']
        }
      }
    ]
  },
  devServer: {
    inline: true,
    historyApiFallback: true  //加上这个刷新新的路由就不用报错啦
  }
}

module.exports = config