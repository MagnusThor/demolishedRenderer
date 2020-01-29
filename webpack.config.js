module.exports = {
  mode:'production',
  entry: './example/example.js',
  output: {
    path: __dirname + '/example',
    filename: 'example-bundle.js',
  }
};

// module.exports = {
//   mode: 'production',
//   entry: './demo/FoL01.js',
//   output: {
//     path: __dirname + '/demo',
//     filename: 'bundle.js',
//   }
// };