const baseWebpackConfig = require("./webpack.base");

const rule = {
  test: /\.tsx?$/,
  use: [
    {
      loader: "ts-loader",
      options: { allowTsInNodeModules: true },
    },
  ],
};

baseWebpackConfig.module.rules.push(rule);

module.exports = baseWebpackConfig;
