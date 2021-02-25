
module.exports = {
  mode:"production", 
  watch: false,
  entry: {
    "fol04": './demo/Fol04.js'
  },
  output: {
    path: __dirname + '/demo/build',
    filename: '[name]-bundle.js'

  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.glsl$/i,
        use: 'raw-loader',
      },
    ],
  },
}