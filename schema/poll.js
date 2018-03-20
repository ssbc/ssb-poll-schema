const ssbSchemaDefintions = require('../v1/lib/ssbSchemaDefintions')

const schema = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['version', 'type', 'title', 'details', 'closesAt'],
  properties: {
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
