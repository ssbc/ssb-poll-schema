const test = require('tape')
const parseProposal = require('../../../position/sync/parseProposal')
const Validator = require('is-my-json-valid')
const normalisedPositionSchema = require('../../../../normalised-schema/position')

const isNormalisedPosition = Validator(normalisedPositionSchema)

test('Position parsing - parseProposal', function (t) {
  var validPosition = parseProposal({
    key: '%keyhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    value: {
      content: {
        root: '%rootrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
        type: 'position',
        version: 'v1',
        details: {
          type: 'proposal',
          choice: 1
        },
        reason: 'reasons'
      }
    }})
  t.true(isNormalisedPosition(validPosition), 'simple (passes isNormalisedPosition)')

  var invalidPosition = parseProposal(
    {
      key: '%keyhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
      value: {
        content: {
          // root: '%rootrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
          type: 'position',
          version: 'v1',
          details: {
            type: 'proposal',
            choice: 1
          },
          reason: 'reasons'
        }
      }}
  )
  t.equal(invalidPosition, undefined, "doesn't parse invalid position, returns undefined")
  t.end()
})
