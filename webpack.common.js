const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.ts"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: "demo",
    libraryTarget: "umd", // 以库的形式导出入口文件时，输出的类型,这里是通过umd的方式来暴露library,适用于使用方import的方式导入npm包
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [new CleanWebpackPlugin()],
};
