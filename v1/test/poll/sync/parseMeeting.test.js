const test = require('tape')
const {parseMeetingTimePoll: parseMeeting} = require('../../../poll/sync/parse')
const Validator = require('is-my-json-valid')
const normalisedPollSchema = require('../../../../normalised-schema/poll')

const isNormalisedPoll = Validator(normalisedPollSchema)

test('Poll parsing - parseMeetingTime', function (t) {
  var validPoll = parseMeeting({
    key: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    value: {
      content: {
        type: 'poll',
        version: 'v1',
        title: 'when suits?',
        details: {
          type: 'meetingTime',
          choices: [new Date().toISOString(), new Date().toISOString()]
        },
        closesAt: new Date().toISOString()
      }
    }})
  t.true(isNormalisedPoll(validPoll), 'simple (passes isNormalisedPoll)')

  var invalidPoll = parseMeeting({
    key: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    value: {
      content: {
        type: 'poll',
        // version: 'v1',
        title: 'how many food',
        details: {
          type: 'meetingTime',
          choices: [new Date().toISOString(), new Date().toISOString()]
        },
        closesAt: new Date().toISOString()
      }
    }})
  t.equal(invalidPoll, undefined, "doesn't parse invalid poll, returns undefined")
  t.end()
})
