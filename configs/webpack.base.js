const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../assets/bundle"),
  },
};
