import { resolve } from 'path'
import _debug from 'debug'

const debug = _debug('plato:config:base')

const config = {
  env: process.env.NODE_ENV || 'development',

  pkg: require('../package.json'),

  // theme name
  theme: 'default',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: resolve(__dirname, '../'),
  dir_src: 'src',
  dir_dist: 'dist',
  dir_server: 'server',
  dir_test: 'test',

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_html_minify: false,
  compiler_css_modules: false,
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_quiet: false,
  compiler_public_path: '',
  compiler_stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: true,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: false
  },
  compiler_vendor: [
    'lodash.isplainobject',
    'query-string',
    'string-template',
    'vue',
    'vue-router',
    'vuex',
    'vuex-actions',
    'vuex-localstorage',
    'whatwg-fetch'
  ]
}

// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test'
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
config.compiler_vendor = config.compiler_vendor
  .filter(dep => {
    if (config.pkg.dependencies.hasOwnProperty(dep)) {
      return true
    }

    debug(
      'Package "' + dep + '" was not found as an npm dependency in package.json; ' +
      'it won\'t be included in the webpack vendor bundle.\n' +
      'Consider removing it from compiler_vendor in "./config/_base.js"'
    )
  })

// ------------------------------------
// Utilities
// ------------------------------------
config.paths = (() => {
  const base = (...args) =>
    resolve.apply(resolve, [config.path_base, ...args])

  return {
    base,
    src: base.bind(null, config.dir_src),
    dist: base.bind(null, config.dir_dist),
    server: base.bind(null, config.dir_server),
    test: base.bind(null, config.dir_test)
  }
})()

export default config