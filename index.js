/* eslint-env es6, browser, node */
/* eslint no-undef: 2, no-unused-vars: 2, no-const-assign: 2  */

const assign = require('object.assign')
const keys = require('object-keys')

const defaultConsoleDirOptions = {
  showHidden: true,
  colors: true,
  depth: Infinity
}

const consoleDirOptionKeys = keys(defaultConsoleDirOptions)

module.exports = function consoleDirWithOptionsOnAndMultiArgSupport () {
  const originalArgs = Array.prototype.slice.call(arguments)
  
  var consoleDirOptions
  var lastArg
  var args

  if (originalArgs.length && typeof (lastArg = originalArgs.reverse()[0]) === 'object'
    && consoleDirOptionKeys.some(function (k) { return k in lastArg })) {
      consoleDirOptions = assign({ }, defaultConsoleDirOptions, lastArg)
      args = originalArgs.slice(0, -1)
  } else {
    consoleDirOptions = defaultConsoleDirOptions
    args = originalArgs
  }

  args.forEach(function (arg) { console.dir(arg, consoleDirOptions) })
}