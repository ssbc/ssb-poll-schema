const test = require('tape')
const {parseDotPoll: parseDot} = require('../../../poll/sync/parse')
const Validator = require('is-my-json-valid')
const normalisedPollSchema = require('../../../../normalised-schema/poll')

const isNormalisedPoll = Validator(normalisedPollSchema)

test('Poll parsing - parseDot', function (t) {
  var validPoll = parseDot({
    key: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    value: {
      content: {
        type: 'poll',
        version: 'v1',
        title: 'how many food',
        details: {
          type: 'dot',
          choices: [1, 2, 'three'],
          numDots: 6
        },
        closesAt: new Date().toISOString()
      }
    }})
  t.true(isNormalisedPoll(validPoll), 'simple (passes isNormalisedPoll)')

  var invalidPoll = parseDot({
    key: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    value: {
      content: {
        type: 'poll',
        // version: 'v1',
        title: 'how many food',
        details: {
          type: 'dot',
          choices: [1, 2, 'three'],
          numDots: 6
        },
        closesAt: new Date().toISOString()
      }
    }})
  t.equal(invalidPoll, undefined, "doesn't parse invalid poll, returns undefined")
  t.end()
})
