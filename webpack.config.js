
module.exports = {
  mode:"development", 
  watch: false,
  entry: {
    "dr": './test/TestApp.js',
    "hope": './test/hope.js'
  },
  output: {
    path: __dirname + '/test/build',
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