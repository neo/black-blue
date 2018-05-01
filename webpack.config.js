module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  },
  devServer: {
    allowedHosts: [".ngrok.io"]
  }
};
