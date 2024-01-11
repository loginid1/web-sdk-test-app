const baseWebpackConfig = require("./webpack.base");

const rule = {
  test: /\.tsx?$/,
  use: "ts-loader",
  exclude: /node_modules/,
};

baseWebpackConfig.module.rules.push(rule);

module.exports = baseWebpackConfig;
