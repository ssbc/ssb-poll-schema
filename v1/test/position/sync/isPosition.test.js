const test = require('tape')
const { isPosition } = require('../../../position/sync/isPosition')
const { CHOOSE_ONE } = require('../../../types')

// this is for testing the attributes that are required for all polls
test('Position - common requirements', function (t) {
  const missingDetails = {
    type: 'position',
    poll: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    details: undefined
  }
  t.false(isPosition(missingDetails), 'needs details')
  t.true(isPosition.errors, 'failing validations have errors')

  const missingPoll = {
    type: 'position',
    details: {
      type: CHOOSE_ONE,
      choice: 0
    }
  }
  t.false(isPosition(missingPoll), 'needs poll')

  const validPosition = {
    type: 'position',
    root: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    branch: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    version: 'v1',
    details: {
      type: CHOOSE_ONE,
      choice: 0
    }
  }

  t.true(isPosition(validPosition), 'valid position is ok')

  t.end()
})

test('Chooseone Position must have at least one choice', function (t) {
  const missingChoice = {
    type: 'position',
    root: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    version: 'v1',
    details: {
      type: CHOOSE_ONE
    }
  }
  t.false(isPosition(missingChoice), 'needs poll')

  t.end()
})
