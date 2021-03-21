const path = require("path")
const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const common = require("./webpack.common.js")


module.exports = merge(common, {
  mode:    "production",
  plugins: [
    new HtmlWebpackPlugin({
      favicon:            "./src/assets/favicon.ico",
      templateParameters: {
        "pixi": "pixi.min.js",
      },
    }),
  ],
  output:  {
    filename: "app.js",
    path:     path.resolve(__dirname, "dist"),
    clean:    true,
  },
})
