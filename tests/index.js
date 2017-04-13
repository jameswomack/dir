/* eslint-env es6, browser, node */
/* eslint no-undef: 2, no-unused-vars: 2, no-const-assign: 2 */

const tap = require('tape-catch')
const intercept = require('intercept-stdout')

const dir = require('../')

tap.test('dir outputs hidden values', function (t) {
  var capturedText = ''

  const unhook_intercept = intercept(function(txt) {
    capturedText += txt
    return ''
  })

  const thingToLog = { 
    foo : 'foo'
  }
  Object.defineProperty(thingToLog, 'bar', {
    enumerable : false,
    value: 'bar'
  })

  dir(thingToLog)

  unhook_intercept()

  t.equal(capturedText, '{ foo: \x1b[32m\'foo\'\x1b[39m, [bar]: \x1b[32m\'bar\'\x1b[39m }\n')

  t.end()
})

tap.test('dir outputs multiple objects', function (t) {
  var capturedText = ''

  const unhook_intercept = intercept(function(txt) {
    capturedText += txt
    return ''
  })

  const thingToLog = { 
    foo : 'foo'
  }
  Object.defineProperty(thingToLog, 'bar', {
    enumerable : false,
    value: 'bar'
  })

  dir(thingToLog, thingToLog)

  unhook_intercept()

  t.equal(capturedText, '{ foo: \x1b[32m\'foo\'\x1b[39m, [bar]: \x1b[32m\'bar\'\x1b[39m }\n{ foo: \x1b[32m\'foo\'\x1b[39m, [bar]: \x1b[32m\'bar\'\x1b[39m }\n')

  t.end()
})