const path = require('path');
const merge = require('webpack-merge');

const PATHS = {
  src: path.join(__dirname, 'src'),
};

module.exports = merge({
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
      },
      {
        test: /\.tsx?$/,
        include: [PATHS.src],
        loader: 'awesome-typescript-loader',
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
      {
        test: /\.graphql?$/,
        loader: 'raw-loader',
      },
    ],
  },
});
