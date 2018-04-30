var test = require('tape')
var Validate = require('is-my-json-valid')
var pollSchema = require('../schema/poll')
var positionSchema = require('../schema/position')

var isNormalisedPoll = Validate(pollSchema)
var isNormalisedPosition = Validate(positionSchema)
var { CHOOSE_ONE } = require('../v1/types')

var {isPoll, parsePoll, parsePollErrors, parsePosition, isPosition, versionStrings} = require('../')

test('parsing a v1 position returns an object that is a valid normalised position object', function (t) {
  var validPosition = {
    type: 'position',
    version: 'v1',
    root: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    details: {
      type: CHOOSE_ONE,
      choice: 0
    }
  }
  t.ok(isPosition(validPosition))

  var parsedPosition = parsePosition(validPosition)
  t.ok(isNormalisedPosition(parsedPosition))
  t.end()
})

test('parsing a v1 poll returns an object that is a valid normalised position object', function (t) {
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

  var parsedPoll = parsePoll(fullyFeatured)
  t.ok(isNormalisedPoll(parsedPoll))
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

test('can get all the errors returned by the parsers, keyed by schema version', function (t) {
  var invalid = {
    type: 'poll',
    version: 'v1',
    body: 'this is really important, please let me know',
    closesAt: new Date().toISOString()
  }

  var poll = parsePollErrors(invalid)
  console.log(poll.errors.v1)
  t.ok(poll.errors.v1)
  t.end()
})
