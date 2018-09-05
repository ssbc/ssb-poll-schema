const test = require('tape')
const { isPollResolution } = require('../../../poll-resolution/sync/isPollResolution')
const { POLL_RESOLUTION, SCHEMA_VERSION } = require('../../../types')

// this is for testing the attributes that are required for all polls

test('Poll Resolution', function (t) {
  const fullyFeatured = () => {
    return {
      type: POLL_RESOLUTION,
      version: SCHEMA_VERSION,
      root: '%s8uVi560mwpE8ncjT+eMz5XBQBREdk4exvM3D6dIg9g=.sha256',
      branch: ['%s8uVi560mwpE8ncjT+eMz5XBQBREdk4exvM3D6dIg9g=.sha256'],
      choices: [1],
      body: 'Thanks all',
      mentions: [
        {name: 'mix', link: '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519'},
        {name: 'sweet drawing', link: '&mwILr7kd1Tug/4vX5nW6YORhyununwkO4cF6jbiSyoA=.sha256'},
        {link: '%s8uVi560mwpE8ncjT+eMz5XBQBREdk4exvM3D6dIg9g=.sha256'}
      ],
      recps: [
        '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519',
        {name: 'mix', link: '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519'}
      ]
    }
  }

  t.true(isPollResolution(fullyFeatured()), 'fully featured')

  const missingChoices = fullyFeatured()
  delete missingChoices.choices
  t.false(isPollResolution(missingChoices), 'missing choices')

  const noChoices = fullyFeatured()
  missingChoices.choice = []
  t.true(isPollResolution(noChoices), 'no choices')

  t.end()
})
