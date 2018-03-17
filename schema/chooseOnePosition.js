const ssbSchemaDefintions = require('../v1/lib/ssbSchemaDefintions')

const { CHOOSE_ONE } = require('../v1/types')
const typeStringPattern = `^${CHOOSE_ONE}$`

const schema = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'root', 'details', 'version'],
  properties: {
    version: {
      type: 'string'
    },
    type: {
      type: 'string',
      pattern: '^position$'
    },
    root: {
      $ref: '#/definitions/messageId'
    },
    text: { type: 'string' },
    reason: { type: 'string' },
    details: {
      $ref: '#/definitions/details'
      type: 'object'
    },
    mentions: { $ref: '#/definitions/mentions/any' },
    recps: { $ref: '#/definitions/recps' }
  },
  definitions: Object.assign({}, ssbSchemaDefintions, {
    details: {
      type: 'object',
      required: ['type', 'choice'],
      properties: {
        type: {
          type: 'string',
          pattern: typeStringPattern
        },
        choice: {
          type: 'integer',
          minimum: 0
        }
      }
    }
  })
}

module.exports = schema
