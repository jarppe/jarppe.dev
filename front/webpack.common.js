const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry:     "./src/index.ts",
  module:    {
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
      {
        test:    /\.(woff2?|ttf|otf|eot|svg)$/,
        exclude: /node_modules/,
        type:    "asset/resource",
      },
    ],
  },
  resolve:   {
    extensions: [".ts", ".js"],
  },
  externals: {
    "pixi.js": "PIXI",
  },
  plugins:   [
    new CopyPlugin({
      patterns: [
        { from: "src/static", to: "static" },
      ],
    }),
  ],
}
