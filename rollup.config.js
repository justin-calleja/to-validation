import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'src/index.js',
  format: 'umd',
  dest: 'lib/bundle.js',
  moduleName: 'to-validation',
  plugins: [
    nodeResolve({
      jsnext: false,
      main: false,
      module: true
    }),
    commonjs({
      namedExports: {
        'fpo': [ 'curryMultiple', 'apply' ]
      }
    })
  ]
}
