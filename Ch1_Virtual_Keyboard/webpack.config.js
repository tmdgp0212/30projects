const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {

  entry: "./src/js/main.js", // js진입점
  output: { // build시 bundle파일 관련 속성
    filename: "bundle.js", // 번들 될 파일이름
    path: path.resolve(__dirname, "./dist"), // 번들 될 파일의 생성경로
    clean: true //번들파일이 생성 된 경로에 기존파일이 있다면 다 지우고 새로 생성
  },
  devtool: 'source-map',
  mode: "development",
  devServer: {
    host: "localhost",
    port: 4200,
    open: true,
    watchFiles: 'index.html',
  },
  plugins : [
    new HtmlWebpackPlugin({ //html webpack설정
      title: "VIRTUAL KEYBOARD",
      template: "./index.html", //index.html내에서 lodash문법을 사용할 수 있도록 해줌
      inject: "body",
      favicon: "./favicon.ico"
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  },
};