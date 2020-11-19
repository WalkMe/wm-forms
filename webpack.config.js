const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ZipPlugin = require('zip-webpack-plugin');
const package = require('./package.json');

module.exports = (env, options) => ({
  mode: "development",
  entry: path.resolve(__dirname, "src", "index.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[hash].[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    contentBase: "./src",
    compress: true,
    port: 9001,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              outputPath: "images/",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "file-loader"],
      },
    ],
  },
  // add a custom index.html as the template
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "src", "index.html") })]
    .concat(options && options.mode === 'production' ? new ZipPlugin({ filename: package.name + '.bundle.zip' }) : []),
});
