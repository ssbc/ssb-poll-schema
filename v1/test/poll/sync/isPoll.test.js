const test = require('tape')
const ChooseOne = require('../../../poll/sync/parse').parseChooseOnePoll
const {isPoll} = require('../../../poll/sync/isPoll')
const { CHOOSE_ONE, SCHEMA_VERSION } = require('../../../types')

// this is for testing the attributes that are required for all polls

test('Poll - common requirements', function (t) {
  const fullyFeatured = {
    type: 'poll',
    version: SCHEMA_VERSION,
    details: {
      type: CHOOSE_ONE,
      choices: [1, 2, 3]
    },
    title: 'how many food',
    body: 'this is really important, please let me know',
    progenitor: '%s8uVi560mwpE8ncjT+eMz5XBQBREdk4exvM3D6dIg9g=.sha256',
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
  t.true(isPoll(fullyFeatured), 'fully featured')

  const missingTitle = ChooseOne({
    choices: [1, 2, 'three'],
    closesAt: new Date().toISOString()
  })
  t.false(isPoll(missingTitle), 'needs title')

  const missingClosesAt = ChooseOne({
    choices: [1, 2, 'three'],
    title: 'how many food'
  })
  t.false(isPoll(missingClosesAt), 'needs closes at')

  const malformedClosesAt = ChooseOne({
    choices: [1, 2, 'three'],
    title: 'how many food',
    closesAt: 'tomorrow'
  })
  t.false(isPoll(malformedClosesAt), 'needs ISOString closes at')

  const missingDetails = {
    type: 'poll',
    details: undefined,
    title: 'how many food',
    closesAt: new Date().toISOString()
  }
  t.false(isPoll(missingDetails), 'needs details')
  t.true(isPoll.errors, 'failing validations have errors')

  t.end()
})
