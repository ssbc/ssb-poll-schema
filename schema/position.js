const ssbSchemaDefintions = require('../v1/lib/ssbSchemaDefintions')

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
      type: 'object'
    },
    mentions: { $ref: '#/definitions/mentions/any' },
    recps: { $ref: '#/definitions/recps' }
  },
  definitions: ssbSchemaDefintions
}

module.exports = schema
