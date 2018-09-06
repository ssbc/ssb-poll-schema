const test = require('tape')

test('can require index.js', function (t) {
  const methods = require('../')
  t.equal(typeof methods, 'object', 'is object')
  t.true(Object.keys(methods).length > 30, 'has lots of methods!')
  t.end()
})
