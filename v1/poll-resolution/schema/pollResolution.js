const { SCHEMA_VERSION, POLL_RESOLUTION } = require('../../types')

const ssbSchemaDefintions = require('../../lib/ssbSchemaDefintions')

const schema = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['version', 'type', 'choices', 'root', 'branch'],
  properties: {
    version: {
      type: 'string',
      pattern: `^${SCHEMA_VERSION}$`
    },
    type: {
      type: 'string',
      pattern: `^${POLL_RESOLUTION}$`
    },
    choices: {
      type: 'array',
      items: {
        type: 'integer',
        minimum: 0
      }
    },
    body: {
      type: 'string'
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
    mentions: { $ref: '#/definitions/mentions/any' },
    recps: { $ref: '#/definitions/recps' }
  },
  definitions: ssbSchemaDefintions
}

module.exports.pollResolution = schema
