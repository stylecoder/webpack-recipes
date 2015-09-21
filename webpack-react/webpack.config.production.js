var webpack           = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  bemLinter         = require('postcss-bem-linter'),
  atImport          = require('postcss-import'),
  customProperties  = require('postcss-custom-properties'),
  autoprefixer      = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './src/js/main.js',
    vendor: ["lodash","react", "react-router"]
  },
  output: {
    path: __dirname +'/dist',
    filename: '[name].js' // Template based on keys in entry above
    //publicPath: '/dist/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.bundle.js'),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      title: 'App',
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],

  postcss: [
    autoprefixer(),
    customProperties()
  ],

  module: {
    loaders: [
    { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader' },
    { test: /\.(png|jpg)$/, loader: 'file-loader?name=images/[name].[ext]' },
    { test: /\.woff$/, loader: 'file-loader?name=fonts/[name].[ext]' },
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') }
    ]
  }
};
