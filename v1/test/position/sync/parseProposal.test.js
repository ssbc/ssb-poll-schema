const test = require('tape')
const {parseProposalPosition: parseProposal} = require('../../../position/sync/parse')
const Validator = require('is-my-json-valid')
const normalisedPositionSchema = require('../../../../normalised-schema/position')

const isNormalisedPosition = Validator(normalisedPositionSchema)

test('Position parsing - parseProposal', function (t) {
  const validPosition = parseProposal({
    key: '%keyhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    value: {
      content: {
        root: '%rootrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
        branch: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
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

  const invalidPosition = parseProposal(
    {
      key: '%keyhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
      value: {
        content: {
          // root: '%rootrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
          branch: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
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
