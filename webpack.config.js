var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src/font-file.sass'],
  output: {
    filename: 'dist/kubernetes-monitor-view.js'
  },
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|otf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'url-loader'
      },
      { // css / sass / scss loader for webpack
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'src/styles/font.bundle.scss',
      allChunks: true,
    }),
  ],
};
