import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import webpack from 'webpack';
import path from "path";

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = env => ({
  entry: {
     app: './src/index.js'
  },
  output: {
    // https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url/43212553
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: [path.join(__dirname,'src'), env.LIBSBMLJS_PREFIX, env.DATABASE_PREFIX],
    hot: false
  },
  resolve: {
    modules: [path.resolve(__dirname,'src'),path.resolve(__dirname,'theme'),env.LIBSBMLJS_PREFIX,'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "node_modules/react-virtualized/styles.css")
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 0
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: [
          path.resolve(__dirname, "node_modules/react-virtualized/styles.css")
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: ["file-loader"]
      },
      {
        test: /\.wasm$/,
        use : {
          loader: 'file-loader',
          options: {
            type: 'application/wasm',
            publicPath: '/'
          }
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.IgnorePlugin(/^fs$/),
    htmlPlugin,
  ]
})
