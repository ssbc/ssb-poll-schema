var test = require('tape')
var Validate = require('is-my-json-valid')
var positionSchema = require('../schema/position')

var isNormalisedPosition = Validate(positionSchema)

var {isPoll, parsePosition, versionStrings} = require('../')

test('parsing a v1 position returns an object that is a valid position object', function (t) {
  var fullyFeatured = {
    type: 'poll',
    version: 'v1',
    details: {
      type: 'chooseOne',
      title: 'how many dogs?',
      choices: [1, 2, 3]
    },
    title: 'how many food',
    body: 'this is really important, please let me know',
    mentions: [
      {name: 'mix', link: '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519'},
      {name: 'sweet drawing', link: '&mwILr7kd1Tug/4vX5nW6YORhyununwkO4cF6jbiSyoA=.sha256'},
      {link: '%s8uVi560mwpE8ncjT+eMz5XBQBREdk4exvM3D6dIg9g=.sha256'}
    ],
    recps: [
      '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519',
      {name: 'mix', link: '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519'}
    ],
    closesAt: new Date().toISOString()
  }

  var parsedPosition = parsePosition(fullyFeatured)
  console.log(parsedPosition)
  t.ok(isNormalisedPosition(parsedPosition))
  t.end()
})

test('version gets an object with version strings', function (t) {
  t.ok(versionStrings.V1_SCHEMA_VERSION_STRING)
  t.end()
})

test('can validate a v1 poll', function (t) {
  var fullyFeatured = {
    type: 'poll',
    version: 'v1',
    details: {
      type: 'chooseOne',
      title: 'how many dogs?',
      choices: [1, 2, 3]
    },
    title: 'how many food',
    body: 'this is really important, please let me know',
    mentions: [
      {name: 'mix', link: '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519'},
      {name: 'sweet drawing', link: '&mwILr7kd1Tug/4vX5nW6YORhyununwkO4cF6jbiSyoA=.sha256'},
      {link: '%s8uVi560mwpE8ncjT+eMz5XBQBREdk4exvM3D6dIg9g=.sha256'}
    ],
    recps: [
      '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519',
      {name: 'mix', link: '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519'}
    ],
    closesAt: new Date().toISOString()
  }
  t.ok(isPoll(fullyFeatured))
  t.end()
})
