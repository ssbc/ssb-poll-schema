const chooseOneDetails = require('./details/chooseOne')
const rangeDetails = require('./details/range')
const dotDetails = require('./details/dot')
const {SCHEMA_VERSION} = require('../../types')

const ssbSchemaDefintions = require('../../lib/ssbSchemaDefintions')

const schema = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['version', 'type', 'root', 'details'],
  properties: {
    version: {
      type: 'string',
      pattern: `^${SCHEMA_VERSION}$`
    },
    type: {
      type: 'string',
      pattern: '^position$'
    },
    root: {
      $ref: '#/definitions/messageId'
    },
    reason: { type: 'string' },
    details: {
      oneOf: [
        { $ref: '#/definitions/details/dot' },
        { $ref: '#/definitions/details/range' },
        { $ref: '#/definitions/details/chooseOne' }
        // { $ref: '#/definitions/details/rsvp'},
        // { $ref: '#/definitions/details/meeting'},
      ]
    },
    mentions: { $ref: '#/definitions/mentions/any' },
    recps: { $ref: '#/definitions/recps' }
  },
  definitions: Object.assign({}, ssbSchemaDefintions, {
    details: {
      type: 'object',
      chooseOne: chooseOneDetails,
      dot: dotDetails,
      range: rangeDetails
    }
  })
}

module.exports = schema
