const {SCHEMA_VERSION} = require('../../types')

const ssbSchemaDefintions = require('../../lib/ssbSchemaDefintions')

const schema = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['version', 'type', 'closesAt', 'root', 'branch'],
  properties: {
    version: {
      type: 'string',
      pattern: `^${SCHEMA_VERSION}$`
    },
    type: {
      type: 'string',
      pattern: '^poll-update$'
    },
    root: {
      $ref: '#/definitions/messageId'
    },
    branch: {
      oneOf: [
        {$ref: '#/definitions/messageId'},
        {
          type: 'array',
          items: {$ref: '#/definitions/messageId'},
          minLength: 1
        }
      ]
    },
    closesAt: { type: 'string', format: 'date-time' },
    mentions: { $ref: '#/definitions/mentions/any' },
    recps: { $ref: '#/definitions/recps' }
  },
  definitions: ssbSchemaDefintions
}

module.exports.pollUpdate = schema
