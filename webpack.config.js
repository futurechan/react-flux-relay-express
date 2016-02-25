var path = require('path');

module.exports = {
  entry: "./src/public/js/app.js",
  output: {
      path: path.join(__dirname, 'src/public'),
      filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['./src/babelRelayPlugin']
        }
      }
    ]
  }
};
