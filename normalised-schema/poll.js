// TODO: this shouldn't use v1, should be general.
const ssbSchemaDefintions = require('../v1/lib/ssbSchemaDefintions')

const schema = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['key', 'type', 'title', 'details', 'closesAt'],
  properties: {
    key: { $ref: '#/definitions/messageId' },
    version: { type: 'string' },
    type: {
      type: 'string',
      pattern: '^poll$'
    },
    title: { type: 'string' },
    details: { type: 'object' },
    closesAt: { type: 'string', format: 'date-time' },
    body: { type: 'string' },
    mentions: { $ref: '#/definitions/mentions/any' },
    recps: { $ref: '#/definitions/recps' }
  },
  definitions: ssbSchemaDefintions

}

module.exports = schema
