const path = require('path');

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015']
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS
        ]
      },
      {
        parser: {
          amd: false
        }
      }
    ]
  },
  node: {
    fs: "empty"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};