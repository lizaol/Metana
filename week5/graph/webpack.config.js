// resolve: {
//   fallback: {
//     fs: false,
//     path: require.resolve('path-browserify'),
//     os: require.resolve('os-browserify/browser')
//   }
// }
// //
const Dotenv = require('dotenv-webpack');

module.exports = {
  // ...
  plugins: [
    new Dotenv()
  ]
}
