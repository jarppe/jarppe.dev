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
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve:   {
    extensions: [".ts", ".js"],
  },
  externals: {
    "pixi.js": "PIXI",
  },
}
