const test = require('tape')
const { isMeetingTime } = require('../../../poll/sync/isPoll')
const { MEETING_TIME, SCHEMA_VERSION } = require('../../../types')

// this is for testing the attributes that are required for all polls

test('Poll - meetingTime', function (t) {
  const fullyFeatured = {
    type: 'poll',
    version: SCHEMA_VERSION,
    details: {
      type: MEETING_TIME,
      choices: [ new Date().toISOString(), new Date(2019, 3, 4).toISOString() ]
    },
    title: 'crab meet?',
    body: 'would love to meet more of you',
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
  t.true(isMeetingTime(fullyFeatured), 'fully featured')

  const dudTimes = {
    type: 'poll',
    version: SCHEMA_VERSION,
    details: {
      type: MEETING_TIME,
      choices: [ new Date().toISOString(), new Date().toString(), Date.now() ]
    },
    title: 'crab meet?',
    body: 'would love to meet more of you',
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
  t.false(isMeetingTime(dudTimes), 'dud times')

  t.end()
})
