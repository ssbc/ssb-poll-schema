const test = require('tape')
const {parseChooseOnePosition: parseChooseOne} = require('../../../position/sync/parse')
const Validator = require('is-my-json-valid')
const normalisedPositionSchema = require('../../../../normalised-schema/position')

const isNormalisedPosition = Validator(normalisedPositionSchema)

test('Position parsing - parseChooseOne', function (t) {
  const validPosition = parseChooseOne({
    key: '%keyhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    value: {
      content: {
        root: '%rootrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
        type: 'position',
        version: 'v1',
        details: {
          type: 'chooseOne',
          choice: 1
        },
        reason: 'reasons'
      }
    }})
  t.true(isNormalisedPosition(validPosition), 'simple (passes isNormalisedPosition)')

  const invalidPosition = parseChooseOne(
    {
      key: '%keyhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
      value: {
        content: {
          // root: '%rootrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
          type: 'position',
          version: 'v1',
          details: {
            type: 'chooseOne',
            choice: 1
          },
          reason: 'reasons'
        }
      }}
  )
  t.equal(invalidPosition, undefined, "doesn't parse invalid position, returns undefined")
  t.end()
})
