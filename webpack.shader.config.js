
module.exports = {
    mode: "production",
    watch: false,
    entry: {
        "rodium": './lib/example/example.js'
    },
    output: {
        path: __dirname + '/build',
        filename: '[name]-bundle.js'

    },
    plugins: [
    ],
    module: {
        rules: [
          {
            test: /\.glsl$/,
            use: {
              loader: 'webpack-glsl-minify',
              options: {
                output: 'object',
                esModule: false,
                stripVersion: false,
                preserveDefines: false,
                preserveUniforms: true,
                preserveVariables: false,
                disableMangle: false,
                nomangle: [ 'fragColor' ],
                includesOnly: false,
              }
            }
          }
        ]
      },
      resolve: {
        extensions: [ '.glsl' ]
      }
}