const test = require('tape')
const { isMeetingTime } = require('../../../position/sync/isPosition')
const { MEETING_TIME } = require('../../../types')

// this is for testing the attributes that are required for all polls
test('Position - meetingTime', function (t) {
  const oneChoice = {
    type: 'position',
    root: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    branch: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    version: 'v1',
    details: {
      type: MEETING_TIME,
      choices: [0]
    }
  }
  t.true(isMeetingTime(oneChoice), 'one choice is valid')

  const twoChoices = {
    type: 'position',
    root: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    branch: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    version: 'v1',
    details: {
      type: MEETING_TIME,
      choices: [0, 1]
    }
  }
  t.true(isMeetingTime(twoChoices), 'two choices is valid')

  const noChoices = {
    type: 'position',
    root: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    branch: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    version: 'v1',
    details: {
      type: MEETING_TIME,
      choices: []
    }
  }
  t.true(isMeetingTime(noChoices), 'no choices is valid')

  const ISOChoices = {
    type: 'position',
    root: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    branch: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    version: 'v1',
    details: {
      type: MEETING_TIME,
      choices: [new Date().toISOString()]
    }
  }
  t.false(isMeetingTime(ISOChoices), 'specificying choices as ISOStrings is not valid')

  t.end()
})
