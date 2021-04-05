const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry:   "./src/index.ts",
  module:  {
    rules: [
      {
        test:    /\.tsx?$/,
        use:     "ts-loader",
        exclude: /node_modules/,
      },
      {
        test:    /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        type:    "asset/resource",
      },
      {
        test: /\.s[ac]ss$/,
        use:  [
          "style-loader",
          "css-loader",
          "resolve-url-loader",
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "." },
      ],
    }),
  ],
}
