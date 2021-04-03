const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const common = require("./webpack.common.js")


module.exports = merge(common, {
  mode:      "development",
  plugins:   [
    new HtmlWebpackPlugin({
      favicon: "./src/assets/favicon.ico",
    }),
  ],
  devtool:   "inline-source-map",
  devServer: {
    contentBase: "./dist",
    port:        9000,
  },
})
