const ssbSchemaDefintions = require('../v1/lib/ssbSchemaDefintions')

const schema = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['key', 'version', 'type', 'root', 'branch', 'details'],
  properties: {
    key: { $ref: '#/definitions/messageId' },
    version: { type: 'string' },
    type: {
      type: 'string',
      pattern: '^position$'
    },
    root: { $ref: '#/definitions/messageId' },
    branch: { $ref: '#/definitions/messageId' },
    details: { type: 'object' },
    reason: { type: 'string' },
    mentions: { $ref: '#/definitions/mentions/any' },
    recps: { $ref: '#/definitions/recps' }
  },
  definitions: ssbSchemaDefintions
}

module.exports = schema
