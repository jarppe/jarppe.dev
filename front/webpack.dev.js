const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const common = require("./webpack.common.js")


module.exports = merge(common, {
  mode:      "development",
  plugins:   [
    new HtmlWebpackPlugin({
      templateParameters: {
        "pixi": "pixi.js",
      },
    }),
  ],
  devtool:   "inline-source-map",
  devServer: {
    contentBase: "./dist",
    port:        9000,
  },
})
