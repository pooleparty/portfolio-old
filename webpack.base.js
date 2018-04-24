const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
};

const extractTextPluginConfig = new ExtractTextPlugin('[name].css');

module.exports = merge({
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [PATHS.src],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: extractTextPluginConfig.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        include: [PATHS.src],
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  plugins: [extractTextPluginConfig],
});
