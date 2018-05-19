const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const indexPage = new HtmlWebpackPlugin({
  template: `!!raw-loader!${path.join(
    process.cwd(),
    "src/index.template.ejs"
  )}`,
  filename: path.resolve(__dirname, "views/index.ejs"),
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true
  }
});

const errorPage = new HtmlWebpackPlugin({
  template: `!!raw-loader!${path.join(
    process.cwd(),
    "src/error.template.ejs"
  )}`,
  filename: path.resolve(__dirname, "views/error.ejs"),
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true
  }
});

const config = {
  entry: {
    bundle: "./src/client/client.tsx"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/bundles"),
    publicPath: "/bundles"
  },
  plugins: [indexPage, errorPage]
};

const extractBundles = bundles => ({
  plugins: bundles.map(
    bundle => new webpack.optimize.CommonsChunkPlugin(bundle)
  )
});

module.exports = merge(
  baseConfig,
  config,
  extractBundles([
    {
      name: "vendor",
      minChunks: ({ resource }) =>
        resource &&
        resource.indexOf("node_modules") >= 0 &&
        resource.match(/\.js$/)
    }
  ])
);
