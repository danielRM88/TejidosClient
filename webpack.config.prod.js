const path = require('path')
const webpack = require('webpack')

export default {
  devtool: 'source-map',
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'config': JSON.stringify(require('./config/config.prod.json'))
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.scss?$/, loader: 'style!css!sass', include: path.join(__dirname, 'src', 'styles') },
      {test: /\.png$/, loader: 'file' },
      {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file'}
    ]
  }
}