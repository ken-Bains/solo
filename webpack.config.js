const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  //proxy: "http://localhost:3000",
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: false,
  },
  devServer: {
    static: "./",
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    proxy: {
    //   "/api": {
    //     target: "http://localhost:9000",
    //     router: () => "http://localhost:3000",
    //     logLevel: "debug" /*optional*/,
    //   },
        '/api': "http://localhost:3000",
    },
    //historyApiFallback: { index: "index.html" }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      template: "index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    //new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(__dirname, "src"),
        use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
            //MiniCssExtractPlugin.loader,
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
